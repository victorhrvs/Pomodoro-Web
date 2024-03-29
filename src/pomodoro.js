//import Timer from './dist/easytimer.min.js';

//import Timer from './dist/easytimer.min.js';
let timer_green = new easytimer.Timer();
let timer_yellow = new easytimer.Timer();
let green_init = {minutes: 25, seconds: 0}
let yellow_init = {minutes: 5, seconds: 0}
var clock_selected = 'clock_green';
init();

function init() {
    // Inicia o relogio verde com o valor de green_init
    let green_el = document.getElementById('clock_green');
    timer_green.start({countdown: true, startValues: {minutes: green_init.minutes, seconds: green_init.seconds}, target : {seconds: 0}} );
    green_el.innerHTML = timer_green.getTimeValues().toString(['minutes', 'seconds']);
    timer_green.pause();
}

timer_green.addEventListener('secondTenthsUpdated', function (e) {
    let clock = document.getElementById(clock_selected);
    let clock_text = timer_green.getTimeValues().toString(['minutes', 'seconds']);
    //clock_green.innerHTML(timer_green.getTimeValues().toString());
    //console.log(timer_green.getTimeValues().toString(['minutes', 'seconds']) );
    clock.innerHTML = clock_text;
});

timer_yellow.addEventListener('secondTenthsUpdated', function (e) {
    let clock = document.getElementById(clock_selected);
    let clock_text = timer_yellow.getTimeValues().toString(['minutes', 'seconds']);
    //clock_green.innerHTML(timer_green.getTimeValues().toString());
    //console.log(timer_yellow.getTimeValues().toString(['minutes', 'seconds']) );
    clock.innerHTML = clock_text;
});


timer_green.addEventListener('targetAchieved', function (e) {
    let clock = document.getElementById("clock_green");
    audio();
    blink(clock);
});

timer_yellow.addEventListener('targetAchieved', function (e) {
    let clock = document.getElementById("clock_yellow");
    audio();
    blink(clock);
});

async function blink( clock ) {
    let btn_play = document.getElementById('btn-pause');
    while( clock_selected === clock.id && clock.textContent === "00:00" && btn_play.style.display === "flex") {
        clock.style.visibility = 'hidden';
        await sleep(128);
        clock.style.visibility = '';
        await sleep(128);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function rewind() {
    let green_el = document.getElementById('clock_green');
    let yellow_el = document.getElementById('clock_yellow');
    
    if( clock_selected === "clock_green") {
        //Inicia relogio
        timer_green.stop();
        timer_green.start({countdown: true, startValues: {minutes: green_init.minutes, seconds: green_init.seconds}, target : {seconds: 0}} );

        green_el.innerHTML = timer_green.getTimeValues().toString(['minutes', 'seconds']);
        timer_green.pause();
    }

    if( clock_selected === "clock_yellow") {
        //Inicia relogio
        timer_yellow.stop();
        timer_yellow.start({countdown: true, startValues: {minutes: yellow_init.minutes, seconds: yellow_init.seconds}, target : {seconds: 0}} );

        yellow_el.innerHTML = timer_yellow.getTimeValues().toString(['minutes', 'seconds']);
        timer_yellow.pause();
    }
    audio_stop();
    play_active();
    pause_hide();
}

function audio() {
    var sound = document.getElementById("audio");
    if (sound.muted == true){
        sound.muted = false;
    }
    sound.play();
}

function audio_stop() {
    var sound = document.getElementById("audio");
    sound.muted = true;
    sound.pause();

}

function play() {
    if( clock_selected === 'clock_green'){
        timer_green.start();
    }
    if( clock_selected === 'clock_yellow'){
        timer_yellow.start();
    }
    audio_stop();
    play_hide();
    pause_active();
}


function play_active() {
    let btn_play = document.getElementById('btn-play');
    btn_play.style.display = "flex";
}
function play_hide() {
    let btn_play = document.getElementById('btn-play');
    btn_play.style.display = "none";
}

function pause() {
    if( clock_selected === 'clock_green'){
        timer_green.pause();
    }
    if( clock_selected === 'clock_yellow'){
        timer_yellow.pause();
    }
    audio_stop();
    play_active();
    pause_hide();
}
function pause_active() {
    let btn_play = document.getElementById('btn-pause');
    btn_play.style.display = "flex";
}
function pause_hide() {
    let btn_play = document.getElementById('btn-pause');
    btn_play.style.display = "none";
}


function next() {
    let green_el = document.getElementById('clock_green');
    let yellow_el = document.getElementById('clock_yellow');
    
    //Green Clock Select
    if(green_el.style.display === 'none') {
        green_el.style.display = "flex";
        yellow_el.style.display = "none";
        clock_selected = 'clock_green';
        timer_yellow.stop();    
    }
    //Yellow Clock Select
    else{
            yellow_el.style.display = "flex";
            green_el.style.display = "none";
            clock_selected = 'clock_yellow';
            timer_green.stop();
        
    }
    rewind();
}

function set_time() {
    let input_clock_green = document.getElementById('input_clock_green');
    let input_clock_yellow = document.getElementById('input_clock_yellow');

    const regex = /([0-5]?[0-9]?):([0-5]?[0-9])/;
    let result;
    //Green
    if ((result = regex.exec(input_clock_green.value)) !== null) {
        if( result.length === 3){
            green_init = {minutes: Number(result[1]), seconds: Number(result[2])};
        }
    }
    //Yellow
    if ((result = regex.exec(input_clock_yellow.value)) !== null) {
        if( result.length === 3){
            yellow_init = {minutes: Number(result[1]), seconds: Number(result[2])};
        }
    }

    rewind();
}


function hide_menu() {
    let i;
    let barra_el = document.querySelectorAll('.barra');
    //barra_el.forEach().style.visibility = hidden;

    if(barra_el[0].style.visibility == ''){
        for (i = 0; i < barra_el.length; i++) {
            barra_el[i].style.visibility = 'hidden';
        }
    } else {
        for (i = 0; i < barra_el.length; i++) {
            barra_el[i].style.visibility = '';
        }
        
    }

}


//document.getElementById('btn-play').click(function () {
//    console.log(timer_green.getTimeValues().toString());
//});

let bnt_rewind_el = document.querySelector('#btn-rewind');
if(bnt_rewind_el){
    bnt_rewind_el.addEventListener('click', rewind, false);
}

let bnt_play_el = document.querySelector('#btn-play');
bnt_play_el.addEventListener('click', play);

let bnt_pause_el = document.querySelector('#btn-pause');
bnt_pause_el.addEventListener('click', pause);

let bnt_next_el = document.querySelector('#btn-next');
bnt_next_el.addEventListener('click', next);

let bnt_navigation_bar_el = document.getElementById('navigation_bar');
bnt_navigation_bar_el.addEventListener('click', hide_menu);


