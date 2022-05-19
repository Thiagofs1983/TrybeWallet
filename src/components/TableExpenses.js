import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class TableExpenses extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
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
                  <button type="button">Editar</button>
                  <button type="button">Excluir</button>
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
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(TableExpenses);
