// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';

export const addEmailAction = (payload) => ({
  type: ADD_EMAIL,
  payload,
});

export const addCurrencies = (arrCurrencies) => ({
  type: ADD_CURRENCIES,
  payload: arrCurrencies,
});

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
