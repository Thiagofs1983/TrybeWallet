import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchExpenses } from '../actions';
import styles from '../styles/ExpenseForm.module.css';

class ExpenseForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: 0,
    };
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = () => {
    const { fetchExpense } = this.props;
    fetchExpense(this.state);
    this.setState((prevState) => ({
      value: '',
      description: '',
      id: prevState.id + 1,
    }));
  }

  render() {
    const { currencies } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    return (
      <form className={ styles.container } action="">
        <label htmlFor="value">
          Valor
          <input
            type="number"
            name="value"
            id="value"
            autoComplete="none"
            value={ value }
            onChange={ this.handleChange }
            data-testid="value-input"
          />
        </label>
        <label htmlFor="description">
          Descrição
          <input
            type="text"
            name="description"
            id="description"
            autoComplete="none"
            value={ description }
            onChange={ this.handleChange }
            data-testid="description-input"
          />
        </label>
        <label htmlFor="coin">
          Moeda
          <select
            name="currency"
            id="coin"
            value={ currency }
            onChange={ this.handleChange }
          >
            { currencies.map((coin) => (
              <option value={ coin } key={ coin }>{ coin }</option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento
          <select
            name="method"
            id="method"
            value={ method }
            onChange={ this.handleChange }
            data-testid="method-input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria
          <select
            name="tag"
            id="tag"
            value={ tag }
            onChange={ this.handleChange }
            data-testid="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="button"
          disabled={ description.length < 1 || value.length < 1 }
          onClick={ this.handleSubmit }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchExpense: (state) => dispatch(fetchExpenses(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
