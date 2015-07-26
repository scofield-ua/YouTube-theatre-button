var videoId = window.location.search.split('v=')[1];
var ampersandPosition = videoId.indexOf('&');
if(ampersandPosition != -1) videoId = videoId.substring(0, ampersandPosition);

var theatreButton =
    '<div class="ytp-menuitem" aria-haspopup="true" tabindex="36" role="menuitem" id="yt-theatre-button" data-active="0">'+
    '<div class="ytp-menuitem-label">Theatre mode</div>'+
    '<div class="ytp-menuitem-content" style="background-image:none"><div></div></div>'
    '</div>';

$('#movie_player #ytp-main-menu-id').prepend(theatreButton);

$('#yt-theatre-button').click(function() {
    var isPaused = $('#player-api .html5-video-player').hasClass('paused-mode') ? true : false;
    if (!isPaused) {
        $('#movie_player .ytp-play-button.ytp-button').click();
    }    
    
    var start;
    start = $('#movie_player:eq(0) .ytp-volume-hover-area .ytp-time-current').text().split(':');
    start = start[0] * 1 > 0 ? (start[0] * 1) * (start[0] * 1) : start[1] * 1;
    
    window.open("http://www.youtube.com/embed/"+videoId+"?html5=1&autoplay=1&start="+start);
});