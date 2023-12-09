import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const cons = {
    startButton:document.querySelector('button[data-start]'),
    dataDays:document.querySelector('span[data-days]'),
    dataHours:document.querySelector('span[data-hours]'),
    dataMinutes:document.querySelector('span[data-minutes]'),
    dataSeconds:document.querySelector('span[data-seconds]'),
    form: document.querySelector('.timer')
}
let selectedDatesCounter;
let operationsFlag=false;
let unformattingDate;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
   onClose(selectedDates) {
        if (!operationsFlag){
            const dateNow = new Date();
            selectedDatesCounter=selectedDates[0];
            if ((selectedDates[0]-dateNow)<0){
                window.alert("Please choose a date in the future");
                cons.startButton.setAttribute('disabled', true);
            }
            else {
              cons.startButton.removeAttribute('disabled');
            }
        }
        
    },

  };
  const flatpickrObject = flatpickr("#datetime-picker",options);
  const timerStarter = () => {
    const timerId = setInterval(() => {
        if (selectedDatesCounter-Date.now()>0){
          unformattingDate = selectedDatesCounter-Date.now();
          cons.dataDays.textContent=addLeadingZero(convertMs(unformattingDate).days);
          cons.dataHours.textContent=addLeadingZero(convertMs(unformattingDate).hours);
          cons.dataMinutes.textContent=addLeadingZero(convertMs(unformattingDate).minutes);
          cons.dataSeconds.textContent=addLeadingZero(convertMs(unformattingDate).seconds);
        }
        
    
      }, 1000);
      
  }
  const startButtonHandler = (event) => {
    
      if (!operationsFlag){
        operationsFlag=true;
        timerStarter();
        cons.startButton.setAttribute('disabled', true);
      }
      else {
        clearTimeout(timerId);
        timerStarter();
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
  const addLeadingZero = (value) =>{
      return String(value).padStart(2,'0');
  }
  cons.startButton.setAttribute('disabled', true);
  cons.startButton.addEventListener('click', startButtonHandler);

