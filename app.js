const converterForm = document.querySelector('#converterForm');
const fromCurrency = document.querySelector('#fromCurrency');
const toCurrency = document.querySelector('#toCurrency');
const amountInput = document.querySelector('#amount');
const resultContainer = document.querySelector('#result');

const BASE_URL = `https://open.er-api.com/v6/latest`;

window.addEventListener('load', fetchCurrencies);

converterForm.addEventListener('submit', convertCurrency);

async function fetchCurrencies() {
  try {
    const response = await fetch(`${BASE_URL}/USD`);
    const data = await response.json();
    const currencyOptions = Object.keys(data.rates);

    currencyOptions.forEach((currency) => {
      const option1 = document.createElement('option');
      option1.value = currency;
      option1.textContent = currency;
      fromCurrency.appendChild(option1);
      const option2 = document.createElement('option');
      option2.value = currency;
      option2.textContent = currency;
      toCurrency.appendChild(option2);
    });
  } catch (error) {
    console.log(error);
  }
}

async function convertCurrency(event) {
  event.preventDefault();
  try {
    const amount = parseFloat(amountInput.value);
    const fromCurrencyValue = fromCurrency.value;
    const toCurrencyValue = toCurrency.value;
    if (amount < 0) {
      alert('Please enter a valid amount!');
      return;
    }
    const response = await fetch(`${BASE_URL}/${fromCurrencyValue}`);
    const data = await response.json();
    const rate = data.rates[toCurrencyValue];
    const convertedAmount = (amount * rate).toFixed(2);

    const dateString = data.time_last_update_utc;
    const tuday = new Date(dateString);
    const weekday = tuday.toLocaleDateString('en-US', { weekday: 'long' });
    const day = tuday.getDate();
    const month = tuday.toLocaleDateString('en-US', { month: 'long' });
    const year = tuday.getFullYear();

    resultContainer.innerHTML = `
      <p>Currency on ${weekday}, ${day} ${month} ${year}</p>
      ${amount} ${fromCurrencyValue} = ${convertedAmount} ${toCurrencyValue}
    `;
  } catch (error) {
    console.log(error);
  }
}
