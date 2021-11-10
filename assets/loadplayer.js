'use strict';

// load youtube iframe player api
const TAG = document.createElement('script');
TAG.src = "https://www.youtube.com/iframe_api";

const firstScript = document.getElementsByTagName('script')[0];
firstScript.parentElement.insertBefore(TAG, firstScript);

// init player on api load
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '200',
        width: '200',
        // videoId: 'MIbHzHyclHo',
        controls: '0',
        disablekb: '1',
        fs: '0',
        playsinline: '1',
        events: {
            'onReady': onPlayerReady,
            // 'onStateChange': onPlayerStateChange
        }});
}

// play audio when loaded
// function onPlayerReady(event) {
//     event.target.playVideo();
// }

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
// var done = false;
// function onPlayerStateChange(event) {
//     if (event.data == YT.PlayerState.PLAYING && !done) {
//         setTimeout(stopVideo, 6000);
//         done = true;
//     }
// }
// function stopVideo() {
//     player.stopVideo();
// }
