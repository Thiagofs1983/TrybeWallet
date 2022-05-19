// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const ADD_EXCHANGE_RATES = 'ADD_EXCHANGE_RATES';

export const addEmailAction = (payload) => ({
  type: ADD_EMAIL,
  payload,
});

export const addCurrencies = (arrCurrencies) => ({
  type: ADD_CURRENCIES,
  payload: arrCurrencies,
});

export const addExpenses = (payload, rates) => ({
  type: ADD_EXPENSES,
  payload,
  rates,
});

/* export const addExchangeRates = (rates) => ({
  type: ADD_EXCHANGE_RATES,
  rates,
});
 */
export const fetchCurrencies = () => (
  async (dispatch) => {
    try {
      const URL = 'https://economia.awesomeapi.com.br/json/all';
      const response = await fetch(URL);
      const result = await response.json();
      const arrCurrencies = Object.keys(result).filter((coin) => coin !== 'USDT');
      dispatch(addCurrencies(arrCurrencies));
    } catch (error) {
      console.log(error);
    }
  });

export const fetchExpenses = (state) => (
  async (dispatch) => {
    try {
      const URL = 'https://economia.awesomeapi.com.br/json/all';
      const response = await fetch(URL);
      const result = await response.json();
      dispatch(addExpenses(state, result));
    } catch (error) {
      console.log(error);
    }
  }
);
