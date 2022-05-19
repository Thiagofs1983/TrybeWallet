import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchCurrencies } from '../actions';
import ExpenseForm from '../components/ExpenseForm';
import TableExpenses from '../components/TableExpenses';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCurrencie } = this.props;
    fetchCurrencie();
  }

  render() {
    return (
      <main>
        <Header />
        <ExpenseForm />
        <TableExpenses />
      </main>
    );
  }
}

Wallet.propTypes = {
  fetchCurrencie: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencie: () => dispatch(fetchCurrencies()),
});

export default connect(null, mapDispatchToProps)(Wallet);
