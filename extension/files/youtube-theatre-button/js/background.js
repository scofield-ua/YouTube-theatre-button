chrome.tabs.onUpdated.addListener(function() {
    chrome.tabs.executeScript(null, { file: "js/jq2.js" }, function() {
        chrome.tabs.executeScript(null, { file: "js/content.js" });
    });
});

chrome.tabs.onCreated.addListener(function() {
    chrome.tabs.executeScript(null, { file: "js/jq2.js" }, function() {
        chrome.tabs.executeScript(null, { file: "js/content.js" });
    });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch (request.method) {
        case 'closeCurrentTab' :
            chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
                chrome.tabs.remove(tabs[0].id);
            });
        break;
    }    
});