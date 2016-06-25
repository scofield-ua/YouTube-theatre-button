var mainInt;
var execute = true;
var theatreButton;

try {
    var videoId = window.location.search.split('v=')[1];
    var ampersandPosition = videoId.indexOf('&');
    if(ampersandPosition != -1) videoId = videoId.substring(0, ampersandPosition);
} catch(err) {
    execute = false;
}

if(execute) {
    var buttonContainer = document.querySelector('#movie_player .ytp-settings-menu .ytp-panel .ytp-panel-menu');

    theatreButton = document.createElement('div');
    theatreButton.setAttribute('class', 'ytp-menuitem');
    theatreButton.setAttribute('id', 'yt-theatre-button');
    theatreButton.setAttribute('role', 'menuitem');
    theatreButton.innerHTML = '<div class="ytp-menuitem-label">Theatre Mode</div>' + '<div class="ytp-menuitem-content" style="background-image:none"><div></div></div>';

    // attach click event
    theatreButton.addEventListener('click', goFullWindow);

    if(buttonContainer !== null) {
        if(buttonContainer.querySelector('#yt-theatre-button') === null) {
            buttonContainer.appendChild(theatreButton);
        }
    }
}

function goFullWindow(event) {
    event.stopPropagation();

    var closeCurrentTab = false;
    chrome.storage.sync.get(['closeCurrentTab'], function(items) {
        closeCurrentTab = items.closeCurrentTab;
        var isPaused = document.querySelector('#player-api .html5-video-player').classList.contains('paused-mode') ? true : false;
        if (!isPaused) {
            // pause current video (by clicking on Play button)
            document.querySelector('#player-api .ytp-play-button').click();
        }

        var start;
        start = document.querySelector('#player-api .ytp-time-display .ytp-time-current').textContent.split(':');
        start = start[0] * 1 > 0 ? ((start[0] * 1) * 60) + (start[1] * 1) : start[1] * 1;

        var url = "http://www.youtube.com/embed/"+videoId+"?html5=1&autoplay=1&start="+start;

        if (closeCurrentTab) {
            chrome.runtime.sendMessage({method: "changeCurrentTabUrl", url : url});
        } else {
            chrome.runtime.sendMessage({method: "openNewTab", url : url});
        }
    });

    return false;
}
