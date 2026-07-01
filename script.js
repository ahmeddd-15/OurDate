const dateGrid = document.getElementById('dateGrid');
const dateNext = document.getElementById('dateNext');
const summaryCard = document.getElementById('summaryCard');
const summaryDate = document.getElementById('summaryDate');
const summaryFood = document.getElementById('summaryFood');
const summaryPlace = document.getElementById('summaryPlace');
const steps = Array.from(document.querySelectorAll('.step'));
const foodButtons = Array.from(document.querySelectorAll('.step[data-step="2"] .choice-button'));
const placeButtons = Array.from(document.querySelectorAll('.step[data-step="3"] .choice-button'));

let chosenDate = '';
let chosenFood = '';
let chosenPlace = '';

function getDayLabel(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

function buildDateOptions() {
  const today = new Date();
  for (let offset = 1; offset <= 10; offset += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() + offset);
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'date-card';
    card.dataset.value = date.toISOString().split('T')[0];
    card.innerHTML = `<span>${date.toLocaleDateString('en-US', { weekday: 'short', month: 'short' })}</span><strong>${date.getDate()}</strong>`;
    card.addEventListener('click', () => selectDateOption(card, date));
    dateGrid.appendChild(card);
  }
}

function activateStep(stepIndex) {
  steps.forEach((step) => {
    step.classList.toggle('step-active', Number(step.dataset.step) === stepIndex);
  });
}

function updateSummary() {
  summaryDate.textContent = formatDate(chosenDate);
  summaryFood.textContent = chosenFood;
  summaryPlace.textContent = chosenPlace;
}

function formatDate(value) {
  if (!value) return '-';
  return new Date(value).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function selectChoice(buttons, selectedButton) {
  buttons.forEach((button) => {
    button.classList.toggle('selected', button === selectedButton);
  });
}

function selectDateOption(card, date) {
  chosenDate = date.toISOString().split('T')[0];
  dateGrid.querySelectorAll('.date-card').forEach((item) => {
    item.classList.toggle('selected', item === card);
  });
  dateNext.disabled = false;
}

function showSummary() {
  activateStep(0);
  summaryCard.classList.remove('hidden');
  updateSummary();
}

window.addEventListener('DOMContentLoaded', () => {
  buildDateOptions();
});

dateNext.addEventListener('click', () => {
  if (!chosenDate) return;
  activateStep(2);
});

foodButtons.forEach((button) => {
  button.addEventListener('click', () => {
    chosenFood = button.dataset.value;
    selectChoice(foodButtons, button);
    setTimeout(() => activateStep(3), 250);
  });
});

placeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    chosenPlace = button.dataset.value;
    selectChoice(placeButtons, button);
    setTimeout(showSummary, 250);
  });
});

