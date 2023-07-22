// const LAST_MESSAGE_DATE = new Date('July 22, 2021 21:38:21');
const LAST_MESSAGE_DATE = new Date(Date.UTC(2021, 6, 22, 21, 38, 21));

const audio = new Audio('assets/outro-meme.mp3');
let isPlaying = false;

class Timer{
    constructor(dt, n){
        this.dt = dt;
        this.n = n;

        this.years = document.querySelectorAll(".years");
        this.days = document.querySelectorAll(".days");
        this.hours = document.querySelectorAll(".hours");
        this.minutes = document.querySelectorAll(".minutes");
        this.seconds = document.querySelectorAll(".seconds");
    }

    updateDisplay(purge){
        const YEARS = Math.floor(this.dt / (60 * 60 * 24 * 365));
        const DAYS = Math.floor(this.dt / (60 * 60 * 24)) % 365;
        const HOURS = Math.floor(this.dt / (60 * 60)) % 24;
        const MINUTES = Math.floor(this.dt / 60) % 60;
        const SECONDS = Math.floor(this.dt) % 60;


        this.years[this.n].innerText = (purge && YEARS == 0) ? "" : `${YEARS}`;
        this.years[this.n+1].innerText = (purge && YEARS == 0) ? "" : `${YEARS != 1 ? "years" : "year"}`;

        this.days[this.n].innerText = (purge && DAYS == 0) ? "" : `${DAYS}`;
        this.days[this.n+1].innerText = (purge && DAYS == 0) ? "" : `${DAYS != 1 ? "days" : "day" }`;

        this.hours[this.n].innerText = (purge && HOURS == 0 && DAYS == 0) ? "" : `${HOURS < 10 ? "0" + HOURS: HOURS}`;
        this.hours[this.n+1].innerText = (purge && HOURS == 0 && DAYS == 0) ? "" : `${HOURS != 1 ? "hours" : "hour" }`;

        this.minutes[this.n].innerText = `${MINUTES < 10 ? "0" + MINUTES: MINUTES}`;
        this.minutes[this.n+1].innerText = `${MINUTES != 1 ? "minutes": "minute" }`;

        this.seconds[this.n].innerText = `${SECONDS < 10 ? "0" + SECONDS: SECONDS}`;
        this.seconds[this.n+1].innerText = `${SECONDS != 1 ? "seconds" : "second" }`;
    }
}

const interval = setInterval(() => {
    const isBefore = new Date(new Date().toUTCString()).setFullYear(LAST_MESSAGE_DATE.getUTCFullYear()) < LAST_MESSAGE_DATE;
    const factor = isBefore ? 0: 1;
    const yearssince = new Date().getUTCFullYear() - LAST_MESSAGE_DATE.getUTCFullYear() + factor;
    
    const anniversary = new Date(Date.UTC(LAST_MESSAGE_DATE.getFullYear() + yearssince, 6, 22, 21, 38, 21));

    const until = document.getElementById("until");
    until.innerText = `Time until ${yearssince}${yearssince == 1 ? 'st': yearssince == 2 ? 'nd': 'th'} anniversary`;

    if (((anniversary - new Date()) / 1000) <= 10 && !isPlaying){
        audio.play();
        isPlaying = true; // Play the audio once. We assume the user refreshes the site before next anniversary.
    }

    if (((anniversary - new Date()) / 1000) <= 1){
        console.log('confetti')
        const jsConfetti = new JSConfetti();
        jsConfetti.addConfetti();
    }

    const countdown = new Timer((anniversary - new Date(new Date().toUTCString())) / 1000, 2);
    const timer = new Timer((new Date(new Date().toUTCString()) - LAST_MESSAGE_DATE) / 1000, 0);

    countdown.updateDisplay(false);
    timer.updateDisplay(false);

}, 1000);

