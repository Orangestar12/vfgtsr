'use strict';

let connection_monitor_element = null;

// list of song metadata
const SONG_DATABASE = [
    {
        // GosT - Commencement
        id: 'MIbHzHyclHo',
        freeze_time: 17.7,
        drop_time: 18.75,
        other_drop_times: [
            33.2,
            47.8,
            76.5,
            119.9,
            163.2,
            163.9,
            166.9,
            167.5
        ],
        chill_out_time: 221,
        final_drop_time: 230,
        blackout_time: 302.2
    },
    {
        // Master Boot Record - Ftp
        id: 'eGPCBPSXKSQ',
        freeze_time: 4.1,
        drop_time: 4.6,
        other_drop_times: [
            18.2,
            33.9,
            56.7,
            72.1, 72.1, 72.1, 72.1, 72.1,
            81.8, 82.9,
            117.7,
            180.1, 180.1, 180.1,
            192.8, 193.6, 194.4, 195.2, 195.9, 196.8, 197.5, 198.4,
            218.3, 218.3, 218.3,
            262.8, 263.5, 264.3, 265.1,
            290.0, 290.2, 290.4, 290.6, 290.8,
            291.2, 291.6, 291.9, 292.2, 292.6, 293.0, 293.3, 293.6,
            385.4, 385.6, 385.8, 386.0, 386.2, 386.4, 386.6, 386.8, 387.0, 387.2, 387.4
        ],
        chill_out_time: 348,
        final_drop_time: 385.2,
        blackout_time: 421.4
    },
    {
        // MAXIMUM Action OST - "Mean Streets"
        id: 'ct9IYEcA0o4',
        freeze_time: 11.8,
        drop_time: 13.5,
        other_drop_times: [
            27,40.5,54,61,74.3,76,77.7,79.4,81.1,82.8,84.5,86.2,87.8,89.5,91.3,92.9,93.3,93.8,94.2,108.1,111.5,114.9,115.7,116.6,117.4,118.3,118.7,119.1,119.5,120,120.2,120.4,120.6,120.8,121,121.2,121.4,125,128.4,131.8,135.2,138.6,142,145.3,147,147.4,147.8,148.3
        ],
        chill_out_time: 101.4,
        final_drop_time: 121.6,
        blackout_time: 162.2
    }
]

// in: ([0-9]{3}\.[0-9])[0-9]*\n *player\.getCurrentTime\(\)\n *
// out: $1,

// which song in the database?
let db_index = randInt(0, SONG_DATABASE.length);
let drops = [];

let dropped = false;
let chilling_out = false;
let going_all_out = false;

function checkDropTime() {
    let time = player.getCurrentTime()
    if (connection_monitor_element && time > SONG_DATABASE[db_index].freeze_time) {
        connection_monitor_element.remove(); // thanks caniuse
    }
    if (time > SONG_DATABASE[db_index].drop_time) {
        if (!dropped){
            start_typing();
            dropped = true;
        }
        
        for (const drop in drops) {
            if (time > drops[drop]) {
                drops.splice(drops.indexOf(drops[drop]), 1);
                get_more_intense();
                break;
            }
        }
        if (!chilling_out && time > SONG_DATABASE[db_index].chill_out_time) {
            chill_out();
            chilling_out = true;
        }
        if (!going_all_out && time > SONG_DATABASE[db_index].final_drop_time) {
            go_all_out();
            going_all_out = true;
        }
    }
    
    if (time > SONG_DATABASE[db_index].blackout_time) {
        blackout();
    }
    else {
        setTimeout(checkDropTime, 100);
    }
}

function play() {
    // go fullscreen
    // stupid fucking mobile webkit bug
    (
        (document.body.webkitRequestFullScreen && document.body.webkitRequestFullScreen()) ||
        (document.body.requestFullscreen && document.body.requestFullscreen())
    )

    connection_monitor_element = document.body.appendChild(document.createElement('div'));
    connection_monitor_element.id = 'connection';
    connection_monitor_element.className = "SeveralPeopleAreTyping";
    connection_monitor_element.textContent = 'Establishing connection';

    document.querySelector('#bootloader').remove();
    document.body.removeEventListener('click', play);

    player.playVideo();
    drops = SONG_DATABASE[db_index].other_drop_times;
    setTimeout(checkDropTime, 100);
    // Decrease this number to increase accuracy
    // warning: performance hit
}

// show play button when loaded
function onPlayerReady(event) {
    event.target.loadVideoById(SONG_DATABASE[db_index].id);
    event.target.stopVideo();

    let bootloader = document.body.querySelector("#bootloader");
    bootloader.textContent = "Click or tap to establish connection.";
    bootloader.className = '';

    let disclaimer = bootloader.appendChild(document.createElement('p'));
    disclaimer.textContent = "(EPILEPSY WARNING: FLASHING LIGHTS)\n(WARNING: AUDIO WILL PLAY)";
    disclaimer.id = "disclaimer";

    document.body.addEventListener('click', play);
}
