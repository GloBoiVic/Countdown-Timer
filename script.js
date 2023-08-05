const inputContainer = document.getElementById('inputContainer');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('datePicker');

// Global variables
let countdownTitle = '';
let countdownDate = '';

// Set min date input with today's date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;

  console.log(countdownTitle, countdownDate);
}

countdownForm.addEventListener('submit', updateCountdown);
