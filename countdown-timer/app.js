const refs = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    mins: document.getElementById('mins'),
    secs: document.getElementById('secs'),
}

const DATE = '1 Jan 2023'

function calculateTime() {
    if (!DATE) { 
        return;
    }
    const fixedDate = new Date(DATE);
    const todayDate = new Date();
    let sub = fixedDate - todayDate;
    let convertedTime = convertMs(sub);

    refs.days.innerHTML = formatTime(convertedTime.days);
    refs.hours.innerHTML = formatTime(convertedTime.hours);
    refs.mins.innerHTML = formatTime(convertedTime.minutes);
    refs.secs.innerHTML = formatTime(convertedTime.seconds);    
}



function pad(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = pad(Math.floor(ms / day));
    // Remaining hours
    const hours = pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
    // console.log(days, hours, minutes, seconds);
    return { days, hours, minutes, seconds };

}

function formatTime(number) {
    if (number < 10) {
        return `${number}`;
    } else {
        return number;
    }
}

setInterval(calculateTime, 1000);
