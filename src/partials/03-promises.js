import Notiflix from 'notiflix';
const form = document.querySelector('form.form');
const delay = document.querySelector('input[name=delay]');
const step = document.querySelector('input[name=step]');
const amount = document.querySelector('input[name=amount]');

form.addEventListener('click', onCreatePromiseClick);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
function onCreatePromiseClick(event) {
  event.preventDefault();
  let Delay = Number(event.currentTarget.delay.value)
  let Amount = Number(event.currentTarget.amount.value)
  let Step = Number(event.currentTarget.step.value)
  for (let i = 1; i <= Amount; i += 1) {
    createPromise(i, Delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    Delay += Step;
  }
}