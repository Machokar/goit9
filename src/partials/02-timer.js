/* Задание 2 - таймер обратного отсчета
    Выполняй это задание в файлах 02-timer.html и 02-timer.js. Напиши скрипт таймера, 
    который ведёт обратный отсчет до определенной даты. Такой таймер может использоваться в блогах и 
    интернет-магазинах, страницах регистрации событий, во время технического обслуживания и т. д. 

    Элементы интефрейса
    В HTML есть готовая разметка таймера, поля выбора конечной даты и кнопки, при клике по которой 
    таймер должен запускаться. Добавь минимальное оформление элементов интерфейса.

<input type="text" id="datetime-picker" />
<button type="button" data-start>Start</button>

<div class="timer">
  <div class="field">
    <span class="value" data-days>00</span>
    <span class="label">Days</span>
  </div>
  <div class="field">
    <span class="value" data-hours>00</span>
    <span class="label">Hours</span>
  </div>
  <div class="field">
    <span class="value" data-minutes>00</span>
    <span class="label">Minutes</span>
  </div>
  <div class="field">
    <span class="value" data-seconds>00</span>
    <span class="label">Seconds</span>
  </div>
</div>

Библиотека flatpickr
    Используй библиотеку flatpickr для того чтобы позволить пользователю кроссбраузерно выбрать 
    конечную дату и время в одном элементе интерфейса. Для того чтобы подключить CSS код библиотеки в проект, 
    необходимо добавить еще один импорт, кроме того который описан в документации.

// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
Библиотека ожидает что её инициализируют на элементе input[type="text"], 
поэтому мы добавили в HTML документ поле input#datetime-picker.

<input type="text" id="datetime-picker" />
Вторым аргументом функции flatpickr(selector, options) можно передать необязательный объект параметров.
 Мы подготовили для тебя объект который нужен для выполнения задания. Разберись за что отвечает 
 каждое свойство в документации «Options» и используй его в своем коде.

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
Выбор даты
    Метод onClose() из обьекта параметров вызывается каждый раз при закрытии элемента интерфейса 
который создает flatpickr. Именно в нём стоит обрабатывать дату выбранную пользователем. 
Параметр selectedDates это массив выбранных дат, поэтому мы берем первый элемент.

    Если пользователь выбрал дату в прошлом, покажи window.alert() с текстом 
    "Please choose a date in the future".
    Если пользователь выбрал валидную дату (в будущем), кнопка «Start» становится активной.
    Кнопка «Start» должа быть не активна до тех пор, пока пользователь не выбрал дату в будущем.
    При нажатии на кнопку «Start» начинается отсчет времени до выбранной даты с момента нажатия.

Отсчет времени
При нажатии на кнопку «Start» скрипт должен вычислять раз в секунду сколько времени осталось до указанной даты и обновлять интерфейс таймера, показывая четыре цифры: дни, часы, минуты и секунды в формате xx:xx:xx:xx.

Количество дней может состоять из более чем двух цифр.
    Таймер должен останавливаться когда дошел до конечной даты, то есть 00:00:00:00.
bulb Не будем усложнять. Если таймер запущен, для того чтобы выбрать новую дату и перезапустить его - 
необходимо перезагрузить страницу.

Для подсчета значений используй готовую функцию convertMs, где ms - разница между конечной и текущей датой 
в миллисекундах.

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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
Форматирование времени
Функция convertMs() возвращает объект с рассчитанным оставшимся временем до конечной даты. 
Обрати внимание, что она не форматирует результат. То есть, если осталось 4 минуты 
или любой другой составляющей времени, то функция вернет 4, а не 04. В интерфейсе таймера необходимо 
добавлять 0 если в числе меньше двух символов. Напиши функцию addLeadingZero(value), 
которая использует метод метод padStart() и перед отрисовкой интефрейса форматируй значение.

Библиотека уведомлений
warning Следующий функционал не обязателен при сдаче задания, но будет хорошей дополнительной практикой.

Для отображения уведомлений пользователю вместо window.alert() используй библиотеку notiflix. */

// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
//////////////////      Инициализация         ///////////////////////
const refs = {
    startButton:document.querySelector('button[data-start]'),
    dataDays:document.querySelector('[data-days]'),
    dataHours:document.querySelector('[data-hours]'),
    dataMinutes:document.querySelector('[data-minutes]'),
    dataSeconds:document.querySelector('[data-seconds]'),
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
            console.log(selectedDates[0]-dateNow);
            selectedDatesCounter=selectedDates[0];
            if ((selectedDates[0]-dateNow)<0){
                window.alert("Please choose a date in the future");
                refs.startButton.setAttribute('disabled', true);
            }
            else {
                refs.startButton.removeAttribute('disabled');
            }
        }
        
    },

  };
  const flatpickrObject = flatpickr("#datetime-picker",options);
//////////////////////      Методы      /////////////////////////////


  const timerStarter = () => {
    const timerId = setInterval(() => {
        if (selectedDatesCounter-Date.now()>0){
          unformattingDate = selectedDatesCounter-Date.now();
          refs.dataDays.textContent=addLeadingZero(convertMs(unformattingDate).days);
          refs.dataHours.textContent=addLeadingZero(convertMs(unformattingDate).hours);
          refs.dataMinutes.textContent=addLeadingZero(convertMs(unformattingDate).minutes);
          refs.dataSeconds.textContent=addLeadingZero(convertMs(unformattingDate).seconds);
        }
        
    
      }, 1000);
      
  }

  const startButtonHandler = (event) => {
    
      if (!operationsFlag){
        operationsFlag=true;
        timerStarter();
        refs.startButton.setAttribute('disabled', true);
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

/*   const formHandler = (event) =>{
      if(unformattingDate==0) {
        clearInterval(timerId);
        console.log("STOP");
      }
  } */

/////////////////       Actions     ////////////////////////
refs.startButton.setAttribute('disabled', true);
refs.startButton.addEventListener('click', startButtonHandler);
//refs.form.addEventListener('change', formHandler);