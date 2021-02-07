//import Timer from './dist/easytimer.min.js';
var timer = new easytimer.Timer();
var clock_selected = 'clock_green';

timer.start({countdown: true, startValues: {seconds: 30}});

timer.addEventListener('secondsUpdated', function (e) {
    let clock = document.getElementById(clock_selected)
    let clock_text = timer.getTimeValues().toString(['minutes', 'seconds'])
    //clock_green.innerHTML(timer.getTimeValues().toString());
    console.log(timer.getTimeValues().toString(['minutes', 'seconds']) );
    clock.innerHTML = clock_text;
});


function rewind() {
    let green_el = document.getElementById('clock_green');
    let yellow_el = document.getElementById('clock_yellow');
    
    if(green_el.style.display === "none") {
        alert('rewind');
    }
}

function play() {
    
}

function next() {
    let green_el = document.getElementById('clock_green');
    let yellow_el = document.getElementById('clock_yellow');
    
    //console.log(green_el)
    //console.log(green_el.style.display === 'none')
    //console.log(yellow_el.style.display === 'none')
    if(green_el.style.display === 'none') {
        green_el.style.display = "flex";
        yellow_el.style.display = "none";
        clock_selected = 'clock_green';

    }
    else{
            yellow_el.style.display = "flex";
            green_el.style.display = "none";
            clock_selected = 'clock_yellow';
    }
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

function hide() {
    
}

//document.getElementById('btn-play').click(function () {
//    console.log(timer.getTimeValues().toString());
//});

let bnt_rewind_el = document.querySelector('#btn-rewind');
if(bnt_rewind_el){
    bnt_rewind_el.addEventListener('click', rewind, false);
}

let bnt_play_el = document.querySelector('#btn-play');
bnt_play_el.addEventListener('click', play);

let bnt_next_el = document.querySelector('#btn-next');
bnt_next_el.addEventListener('click', next);

let bnt_navigation_bar_el = document.querySelector('#navigation_bar');
bnt_navigation_bar_el.addEventListener('click', hide_menu);

