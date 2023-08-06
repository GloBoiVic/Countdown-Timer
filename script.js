const inputContainer = document.getElementById('inputContainer');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('datePicker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdownTitle');
const countdownBtn = document.getElementById('countdownButton');
const timeElements = document.querySelectorAll('span');

// Global variables
let countdownTitle = '';
let countdownDate = '';
let countdownValue = new Date();
let countdownActive;

// Convert time to milliseconds
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set min date input with today's date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

//Populate Coundown / Complete UI
function updateDom() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // Populate Countdown
    countdownElTitle.textContent = `${countdownTitle}`;
    timeElements[0].textContent = `${days}`;
    timeElements[1].textContent = `${hours}`;
    timeElements[2].textContent = `${minutes}`;
    timeElements[3].textContent = `${seconds}`;

    // Hide Input
    inputContainer.hidden = true;
    // Show Countdown
    countdownEl.hidden = false;
  }, second);
}

// Take Values from Form Input
function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;

  // TODO: Add error handling for empty fields
  if (!countdownDate) return;
  console.log(countdownTitle, countdownDate);

  countdownValue = new Date(countdownDate).getTime();
  console.log(`Countdown Value: ${countdownValue}`);
  updateDom();
}

function resetCountdown() {
  countdownEl.hidden = true;
  inputContainer.hidden = false;
  clearInterval(countdownActive);
  countdownForm.reset();
}

countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', resetCountdown);
