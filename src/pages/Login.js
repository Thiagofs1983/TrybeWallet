import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEmailAction } from '../actions';
import styles from '../styles/Login.module.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = () => {
    const { email } = this.state;
    const { emailProps, history } = this.props;
    emailProps(email);
    history.push('/carteira');
  };

  render() {
    const validateEmail = /\S+@\S+\.\S+/;
    const MIN_LENGTH_PASSWORD = 6;
    const {
      email,
      password,
    } = this.state;
    return (
      <main className={ styles.container }>
        <form action="">
          <h1>TRYBE WALLET</h1>
          <input
            type="email"
            name="email"
            value={ email }
            placeholder="E-mail"
            autoComplete="none"
            onChange={ this.handleChange }
            data-testid="email-input"
          />
          <input
            type="password"
            name="password"
            value={ password }
            placeholder="Senha"
            onChange={ this.handleChange }
            data-testid="password-input"
          />
          <button
            type="button"
            disabled={
              password.length < MIN_LENGTH_PASSWORD || !validateEmail.test(email)
            }
            onClick={ this.handleSubmit }
          >
            Entrar
          </button>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  emailProps: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  emailProps: (state) => dispatch(addEmailAction(state)),
});

export default connect(null, mapDispatchToProps)(Login);
