const inputContainer = document.getElementById('inputContainer');
const errorMsg = document.getElementById('errorMsg');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('datePicker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdownTitle');
const countdownBtn = document.getElementById('countdownButton');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('completeInfo');
const completeBtn = document.getElementById('completeButton');

// Global variables
let countdownTitle = '';
let countdownDate = '';
let countdownValue = new Date();
let countdownActive;
let savedCountdown;

// Convert time to milliseconds
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set min date input with today's date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

function updateDom() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // Hide Input
    inputContainer.hidden = true;

    // Check if countdown is complete
    if (distance < 0) {
      // Show Countdown
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
      completeEl.hidden = false;
    } else {
      // Populate Countdown
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      // Show Countdown
      completeEl.hidden = true;
      countdownEl.hidden = false;
    }
  }, second);
}

function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };
  localStorage.setItem('countdown', JSON.stringify(savedCountdown));

  if (!countdownTitle) {
    errorMsg.textContent = 'Please enter a countdown event';
    return;
  }
  if (!countdownDate) {
    errorMsg.textContent = 'Please enter a future date';
    return;
  }

  countdownValue = new Date(countdownDate).getTime();
  updateDom();
}

function resetCountdown() {
  countdownEl.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false;
  clearInterval(countdownActive);
  countdownTitle = '';
  countdownDate = '';
  errorMsg.textContent = '';
  countdownForm.reset();
  localStorage.removeItem('countdown');
}

function restorePreviousCountdown() {
  if (localStorage.getItem('countdown')) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem('countdown'));
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDom();
  }
}

countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', resetCountdown);
completeBtn.addEventListener('click', resetCountdown);
document.addEventListener('DOMContentLoaded', restorePreviousCountdown);
