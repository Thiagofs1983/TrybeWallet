// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_CURRENCIES, ADD_EXPENSES, REMOVE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses,
        { ...action.payload, exchangeRates: action.rates },
      ],
    };
  case REMOVE:
    return {
      ...state,
      expenses: [...state.expenses.filter((expense) => expense.id !== action.expense)],
    };
  default:
    return state;
  }
};

export default walletReducer;
