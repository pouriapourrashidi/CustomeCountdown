const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date();
let Interval;
let savedCountdown;

const second = 1000;
const minute = second*60;
const hour = minute * 60;
const day = hour * 24;

const today = new Date().toISOString().split('T')[0];

dateEl.setAttribute('min',today);

function updateDom(){
    inputContainer.hidden = true;
    countdownEl.hidden = false;
    Interval = setInterval(() => {
        const currentTime = new Date().getTime();
        const difference = countdownValue - currentTime;
        console.log(difference);
        if (difference < 0){
            countdownEl.hidden=true;
            clearInterval(Interval);
            completeElInfo.textContent=`${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false;
        }else{
            const days = Math.floor(difference / day);
            const hours = Math.floor((difference % day) / hour);
            const minutes = Math.floor((difference % hour) / minute);
            const seconds = Math.floor((difference % minute) / second);
            console.log(days,hours,minutes,seconds);

            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;}

    }, 1000)
}

function countdownFunc(e){
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown={
        'title':countdownTitle,
        'date':countdownDate,
    }
    console.log(countdownDate);
    localStorage.setItem('countdown',JSON.stringify(savedCountdown));
    countdownValue = new Date(countdownDate).getTime();
    updateDom();
}

function reset(){
    inputContainer.hidden=false;
    completeEl.hidden=true;
    countdownEl.hidden=true;
    clearInterval(Interval);
    countdownTitle='';
    countdownDate='';
    localStorage.removeItem('countdown');
}

function restoreLocalStorage(){
    if (localStorage.getItem('countdown')){
        inputContainer.hidden=true;
        savedCountdown=JSON.parse(localStorage.getItem('countdown'));
        countdownDate = savedCountdown.date;
        countdownTitle = savedCountdown.title;
        countdownValue = new Date(countdownDate).getTime();
        updateDom();
    }
}

countdownForm.addEventListener('submit',countdownFunc);
countdownBtn.addEventListener('click', reset)
completeBtn.addEventListener('click',reset);

restoreLocalStorage();