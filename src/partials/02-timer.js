import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const dateInput = document.getElementById("#datetime-picker");
const startBtn = document.querySelector("button[data-start]");
const daysSpan = document.querySelector("[data-days]");
const hoursSpan = document.querySelector("[data-hours]");
const minsSpan = document.querySelector("[data-minutes]");
const secSpan = document.querySelector("[data-seconds]");
startBtn.addEventListener("click", evt => {
  timerId += setInterval(updateInterface, 1000);
})
const currDate = new Date().getTime();
let timerId = 0;

startBtn.disabled = true;

const options = flatpickr(dateInput, {              
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        dateChooser();
    },
});

function dateChooser() {
    const selectedDate = new Date(dateInput.value).getTime();

    if (currDate > selectedDate){
        window.alert("Please choose a date in the future");
        startBtn.disabled = true;
    } else {
        startBtn.disabled = false;
    }
}
function updateInterface() {
    const selectedDate = new Date(dateInput.value).getTime();
    const currDate = new Date().getTime();
    const difTime = convertMs(selectedDate - currDate);
    
    daysSpan.textContent = addLeadingZero(difTime.days);
    hoursSpan.textContent = addLeadingZero(difTime.hours);
    minsSpan.textContent = addLeadingZero(difTime.minutes);
    secSpan.textContent = addLeadingZero(difTime.seconds);

    if(daysSpan.textContent === "00" 
        && hoursSpan.textContent === "00" 
        && minsSpan.textContent === "00"
        && secSpan.textContent === "00"){
            clearInterval(timerId);
    }
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}