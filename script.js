const dateInput = document.getElementById('dateInput');
const dateNext = document.getElementById('dateNext');
const photoInput = document.getElementById('photoInput');
const summaryCard = document.getElementById('summaryCard');
const summaryDate = document.getElementById('summaryDate');
const summaryFood = document.getElementById('summaryFood');
const summaryPlace = document.getElementById('summaryPlace');
const summaryImage = document.getElementById('imgPreview');
const steps = Array.from(document.querySelectorAll('.step'));
const foodButtons = Array.from(document.querySelectorAll('.step[data-step="2"] .choice-button'));
const placeButtons = Array.from(document.querySelectorAll('.step[data-step="3"] .choice-button'));

let chosenDate = '';
let chosenFood = '';
let chosenPlace = '';

function setMinimumDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  dateInput.min = `${year}-${month}-${day}`;
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

function showSummary() {
  activateStep(0);
  summaryCard.classList.remove('hidden');
  updateSummary();

  if (photoInput.files?.[0]) {
    handleImageUpload({ target: photoInput });
  }
}

function handleImageUpload(event) {
  const file = event.target.files?.[0] || photoInput.files?.[0];
  if (!file) {
    summaryImage.style.display = 'none';
    summaryImage.src = '';
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    summaryImage.src = e.target.result;
    summaryImage.style.display = 'block';
  };
  reader.readAsDataURL(file);
}

window.addEventListener('DOMContentLoaded', () => {
  setMinimumDate();
});

dateInput.addEventListener('input', () => {
  dateNext.disabled = !dateInput.value;
});

dateNext.addEventListener('click', () => {
  if (!dateInput.value) return;
  chosenDate = dateInput.value;
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

photoInput.addEventListener('change', handleImageUpload);
