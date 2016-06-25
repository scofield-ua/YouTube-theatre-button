chrome.tabs.onUpdated.addListener(function() {
    chrome.tabs.executeScript(null, { file: "js/content.js" });
});

chrome.tabs.onCreated.addListener(function() {
    chrome.tabs.executeScript(null, { file: "js/content.js" });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch (request.method) {
        case 'changeCurrentTabUrl' :
            chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
                chrome.tabs.update(tabs[0].id, {'url' : request.url});
            });
        break;
        case 'openNewTab' :
            chrome.tabs.create({'url' : request.url});
        break;
    }
});
