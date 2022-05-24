import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ImBin } from 'react-icons/im';
import { removeExpense } from '../actions';
import styles from '../styles/TableExpenses.module.css';

class TableExpenses extends Component {
  handleRemove = (expense) => {
    const { remove } = this.props;
    remove(expense);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table className={ styles.container }>
        <tbody>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          {
            expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ parseFloat(expense.value).toFixed(2) }</td>
                <td>{ (expense.exchangeRates[expense.currency].name).split('/')[0] }</td>
                <td>
                  { parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2) }
                </td>
                <td>
                  {
                    (parseFloat(expense.value)
                    * (expense.exchangeRates[expense.currency].ask)).toFixed(2)
                  }
                </td>
                <td>Real</td>
                <td>
                  <ImBin
                    onClick={ () => this.handleRemove(expense.id) }
                    cursor="pointer"
                    data-testid="delete-btn"
                  />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

TableExpenses.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
  remove: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  remove: (i) => dispatch(removeExpense(i)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableExpenses);
