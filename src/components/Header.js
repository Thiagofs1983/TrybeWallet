import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../styles/Header.module.css';

class Header extends Component {
  render() {
    const { emailProps, expenses } = this.props;
    const expense = expenses.map((expens) => (
      parseFloat(expens.value) * parseFloat(expens.exchangeRates[expens.currency].ask)
    ));
    const result = expense.length > 0 ? expense.reduce((acc, curr) => acc + curr) : 0;
    return (
      <header className={ styles.container }>
        <h1>TRYBE WALLET</h1>
        <div>
          <span data-testid="email-field">
            {`E-mail: ${emailProps}`}
          </span>
          <span data-testid="total-field">
            {
              result.toFixed(2)
            }
          </span>
          <p data-testid="header-currency-field">
            BRL
          </p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  emailProps: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};

const mapStateToProps = (state) => ({
  emailProps: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
