//import Timer from './dist/easytimer.min.js';

//import Timer from './dist/easytimer.min.js';
let timer_green = new easytimer.Timer();
let timer_yellow = new easytimer.Timer();
let green_init = {minutes: 25, seconds: 0}
let yellow_init = {minutes: 0, seconds: 10}
var clock_selected = 'clock_green';
init();

function init() {
    // Inicia o relogio verde com o valor de green_init
    let green_el = document.getElementById('clock_green');
    timer_green.start({countdown: true, startValues: {minutes: green_init.minutes, seconds: green_init.seconds}});
    green_el.innerHTML = timer_green.getTimeValues().toString(['minutes', 'seconds']);
    timer_green.stop();
}

timer_green.addEventListener('secondTenthsUpdated', function (e) {
    let clock = document.getElementById(clock_selected);
    let clock_text = timer_green.getTimeValues().toString(['minutes', 'seconds']);
    //clock_green.innerHTML(timer_green.getTimeValues().toString());
    console.log(timer_green.getTimeValues().toString(['minutes', 'seconds']) );
    clock.innerHTML = clock_text;
});

timer_yellow.addEventListener('secondTenthsUpdated', function (e) {
    let clock = document.getElementById(clock_selected)
    let clock_text = timer_yellow.getTimeValues().toString(['minutes', 'seconds'])
    //clock_green.innerHTML(timer_green.getTimeValues().toString());
    console.log(timer_yellow.getTimeValues().toString(['minutes', 'seconds']) );
    clock.innerHTML = clock_text;
});
 

function rewind() {
    let green_el = document.getElementById('clock_green');
    let yellow_el = document.getElementById('clock_yellow');
    
    if( clock_selected === "clock_green") {
        //Inicia relogio
        timer_green.stop();
        timer_green.start({countdown: true, startValues: {minutes: green_init.minutes, seconds: green_init.seconds}});

        green_el.innerHTML = timer_green.getTimeValues().toString(['minutes', 'seconds']);
        timer_green.stop();
    }

    if( clock_selected === "clock_yellow") {
        //Inicia relogio
        timer_yellow.stop();
        timer_yellow.start({countdown: true, startValues: {minutes: yellow_init.minutes, seconds: yellow_init.seconds}});

        yellow_el.innerHTML = timer_yellow.getTimeValues().toString(['minutes', 'seconds']);
        timer_yellow.stop();
    }
}

function audio() {
    var sound = document.getElementById("audio");
    if (sound.muted == true){
        sound.muted = false;
    }
    sound.play();
}

function play() {
    console.log(clock_selected === 'clock_yellow');
    if( clock_selected === 'clock_green'){
        timer_green.start({countdown: true, startValues: {minutes: green_init.minutes, seconds: green_init.seconds}});
    }
    if( clock_selected === 'clock_yellow'){
        timer_yellow.start({countdown: true, startValues: {minutes: yellow_init.minutes, seconds: yellow_init.seconds}});
    }
    
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

function setTime() {
    let value_green = document.getElementById('input_clock_green');
    let value_yellow = document.getElementById('input_clock_yellow');
    
    console.log("Green " + value_green.value);
    console.log("Yellow " + value_yellow.value);
    console.log('set Time');
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

let bnt_next_el = document.querySelector('#btn-next');
bnt_next_el.addEventListener('click', next);

let i;
let bnt_set_clock_time_el = document.getElementsByClassName('btn-barra');
for (i = 0; i < bnt_set_clock_time_el.length; i++) {
    bnt_set_clock_time_el[i].addEventListener('click', setTime);
}

let bnt_navigation_bar_el = document.getElementById('navigation_bar');
bnt_navigation_bar_el.addEventListener('click', hide_menu);


