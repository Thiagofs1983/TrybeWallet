import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { emailProps } = this.props;
    return (
      <header>
        <span data-testid="email-field">
          { `Email: ${emailProps}` }
        </span>
        <span data-testid="total-field">
          0
        </span>
        <span data-testid="header-currency-field">
          BRL
        </span>
      </header>
    );
  }
}

Header.propTypes = {
  emailProps: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  emailProps: state.user.email,
});

export default connect(mapStateToProps)(Header);
