const countButton = document.getElementById('count-btn');
const addInputButton = document.getElementById('add-input');
const resultsContainer = document.getElementById('results');
const inputContainer = document.getElementById('input-container');
const deleteButtons = document.querySelectorAll('.delete-btn');

function calculateResults() {
  const inputs = document.querySelectorAll('.input-field');
  const values = [];

  inputs.forEach(input => {
    const value = parseFloat(input.value);
    if (!isNaN(value)) {
      values.push(value);
    }
  });

  if (values.length > 0) {
    const sum = values.reduce((a, b) => a + b, 0);
    const avg = sum / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);

    resultsContainer.innerHTML = `
      <p>Suma: ${sum}</p>
      <p>Średnia: ${avg}</p>
      <p>Min: ${min}</p>
      <p>Max: ${max}</p>
    `;
  } else {
    resultsContainer.innerHTML = '<p>Wpisz wartości numeryczne w polach tekstowych.</p>';
  }
}

countButton.addEventListener('click', calculateResults);

document.getElementById('input-container').addEventListener('input', calculateResults);

addInputButton.addEventListener('click', () => {
  const inputWrapper = document.createElement('div');
  inputWrapper.classList.add('input-wrapper');

  const newInput = document.createElement('input');
  newInput.type = 'number';
  newInput.classList.add('input-field');

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Usuń';
  deleteButton.classList.add('delete-btn');

  inputWrapper.appendChild(newInput);
  inputWrapper.appendChild(deleteButton);

  inputContainer.appendChild(inputWrapper);

  deleteButton.addEventListener('click', () => {
    inputWrapper.remove();
    calculateResults();
  });
});

function removeEmptyFields() {
  const inputs = document.querySelectorAll('.input-field');
  inputs.forEach(input => {
    if (input.value === '') {
      input.remove();
    }
  });
}