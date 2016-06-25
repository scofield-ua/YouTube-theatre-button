var mainInt;
var execute = true;
try {
    var videoId = window.location.search.split('v=')[1];
    var ampersandPosition = videoId.indexOf('&');
    if(ampersandPosition != -1) videoId = videoId.substring(0, ampersandPosition);
} catch(err) {
    execute = false;
}

if (!window.jQuery) execute = false;

if (execute) {
    var buttonContainer = document.querySelector('#movie_player .ytp-settings-menu');

    var theatreButton = document.createElement('div');
    theatreButton.setAttribute('class', 'ytp-menuitem');
    theatreButton.setAttribute('id', 'yt-theatre-button');
    theatreButton.setAttribute('role', 'menuitem');
    theatreButton.innerHtml =
        '<div class="ytp-menuitem-label">Theatre Mode</div>'+
        '<div class="ytp-menuitem-content" style="background-image:none"><div></div></div>';

    theatreButton.onclick = goFullWindow;

    /*var theatreButton =
        '<div class="ytp-menuitem" role="menuitem" id="yt-theatre-button" data-active="0">'+
            '<div class="ytp-menuitem-label">Theatre Mode</div>'+
            '<div class="ytp-menuitem-content" style="background-image:none"><div></div></div>'
        '</div>';*/

    if(buttonContainer.length) {
        if(buttonContainer.querySelector('#yt-theatre-button').length == 0) {
            buttonContainer.appendChild(theatreButton);
        }

        /*if($('#movie_player #ytp-main-menu-id #yt-theatre-button').length == 0) {
            $('#movie_player #ytp-main-menu-id').append(theatreButton);
            $('#yt-theatre-button').click(goFullWindow);
        }*/
    }
}

function goFullWindow() {
    var closeCurrentTab = false;
    chrome.storage.sync.get(['closeCurrentTab'], function(items) {
        closeCurrentTab = items.closeCurrentTab;

        var isPaused = $('#player-api .html5-video-player').hasClass('paused-mode') ? true : false;
        if (!isPaused) {
            $('#movie_player .ytp-play-button.ytp-button').click();
        }

        var start;
        start = $('#player-api .ytp-time-display .ytp-time-current').text().split(':');
        start = start[0] * 1 > 0 ? ((start[0] * 1) * 60) + (start[1] * 1) : start[1] * 1;

        var url = "http://www.youtube.com/embed/"+videoId+"?html5=1&autoplay=1&start="+start;

        if (closeCurrentTab) {
            chrome.runtime.sendMessage({method: "changeCurrentTabUrl", url : url});
        } else {
            chrome.runtime.sendMessage({method: "openNewTab", url : url});
            //chrome.runtime.sendMessage({method: "changeUrl"});
        }
        //window.open();
    });
}
