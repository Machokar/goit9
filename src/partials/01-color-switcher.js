const startb = document.querySelector('button[data-start]')
const stopb = document.querySelector('button[data-stop]')
let timerId = null;
startb.addEventListener("click", () => {
    timerId = setInterval(() => {
        return document.body.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
    }, 1000);
    startb.disabled = true;
    stopb.disabled = false;
  });
  stopb.addEventListener("click", () => {
    clearInterval(timerId);
    startb.disabled = false;
  });