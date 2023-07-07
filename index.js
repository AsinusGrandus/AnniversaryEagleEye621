const LAST_MESSAGE_DATE = new Date('July 22, 2021 21:38:00');
const audio = new Audio('assets/outro-meme.mp3');
let isPlaying = false;

class Timer{
    constructor(dt, number){
        this.dt = dt;
        this.years = document.querySelectorAll(".years")[number];
        this.days = document.querySelectorAll(".days")[number];
        this.hours = document.querySelectorAll(".hours")[number];
        this.minutes = document.querySelectorAll(".minutes")[number];
        this.seconds = document.querySelectorAll(".seconds")[number];
    }

    updateDisplay(purge){
        const YEARS = Math.floor(this.dt / (60 * 60 * 24 * 365));
        const DAYS = Math.floor(this.dt / (60 * 60 * 24)) % 365;
        const HOURS = Math.floor(this.dt / (60 * 60)) % 24;
        const MINUTES = Math.floor(this.dt / 60) % 60;
        const SECONDS = Math.floor(this.dt) % 60;

        this.years.innerText = (purge && YEARS == 0) ? "" : `${YEARS} ${YEARS != 1 ? "years" : "year"}`;
        this.days.innerText = (purge && DAYS == 0) ? "" : `${DAYS < 10 ? "0" + DAYS: DAYS} ${DAYS != 1 ? "days" : "day" }`;
        this.hours.innerText = (purge && HOURS == 0 && DAYS == 0) ? "" : `${HOURS < 10 ? "0" + HOURS: HOURS} ${HOURS != 1 ? "hours" : "hour" }`;
        this.minutes.innerText = `${MINUTES < 10 ? "0" + MINUTES: MINUTES} ${MINUTES != 1 ? "minutes": "minute" }`;
        this.seconds.innerText = `${SECONDS < 10 ? "0" + SECONDS: SECONDS} ${SECONDS != 1 ? "seconds" : "second" }`;
    }

}

const interval = setInterval(() => {
    const isBefore = new Date().setFullYear(LAST_MESSAGE_DATE.getFullYear()) < LAST_MESSAGE_DATE;
    const factor = isBefore ? 0: 1;
    const yearssince = new Date().getFullYear() - LAST_MESSAGE_DATE.getFullYear() + factor;
    const anniversary = new Date(`July 22, ${LAST_MESSAGE_DATE.getFullYear() + yearssince} 21:38:00`);

    const until = document.getElementById("until");
    until.innerText = `Time until ${yearssince} ${yearssince == 1 ? 'st': yearssince == 2 ? 'nd': 'th'} anniversary`;

    
    if (((anniversary - new Date()) / 1000) <= 10 && !isPlaying){
        audio.play();
        isPlaying = true; // Play the audio once. We assume the user refreshes the site before next anniversary.
    } 
    if (((anniversary - new Date()) / 1000) <= 1){
        console.log('confetti')
        const jsConfetti = new JSConfetti()
        jsConfetti.addConfetti()
    }

    const countdown = new Timer((anniversary - new Date()) / 1000, 1);
    const timer = new Timer((new Date() - LAST_MESSAGE_DATE) / 1000, 0);

    countdown.updateDisplay(false);
    timer.updateDisplay(false);

}, 1000);

