import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import api from '../../utils/api.utils';

const Register = ({ loadUser, clearFields }) => {
  const [name, setName] = useState({
    value: '',
    isValid: false,
    showError: false,
  });

  const [email, setEmail] = useState({
    value: '',
    isValid: false,
    showError: false,
  });

  const [password, setPassword] = useState({
    value: '',
    isValid: false,
    showError: false,
  });

  const getInput = {
    name,
    email,
    password,
  };

  const getSetInput = {
    name: setName,
    email: setEmail,
    password: setPassword,
  };

  const emailInputField = useRef();
  const passwordInputField = useRef();
  const isValidForm = email.isValid && password.isValid;

  const isFieldValid = (fieldName, value) => {
    const validators = {
      name: value.length >= 3,
      email: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(String(value).toLowerCase()),
      password: value.length >= 6,
    };

    return validators[fieldName];
  };

  const getErrorMessage = (fieldName) => {
    const messages = {
      name: 'Name cannot be empty',
      email: 'Please enter a valid email address.',
      password: 'Your password must be at least 6 characters long.',
    };

    return messages[fieldName];
  };

  const onFieldChange = (fieldName, event) => {
    const isValid = isFieldValid(fieldName, event.target.value);
    const error = !isValid && getErrorMessage(fieldName);
    getSetInput[fieldName]({ value: event.target.value, isValid, error });
  };

  const validateInput = (field) => {
    const input = getInput[field];
    getSetInput[field]((prevState) => ({ ...prevState, showError: !input.isValid }));
  };

  const errorClass = (showError) => (showError ? 'b--red bw2' : '');

  const onRegisterSubmit = () => {
    if (name && email && password) {
      api.registerUser({ name, email, password }).then((user) => {
        if (user?.id) {
          loadUser(user);
          localStorage.setItem('user', JSON.stringify(user));
          window.alert(`User ${user.name} succesfully registered!`);
        } else {
          window.alert(user);
          clearFields();
        }
      });
    } else {
      window.alert('Name, Email and Password fields should be filled in!');
    }
  };

  // const handleKeyPress = (event) => {
  //   return event.key === 'Enter' ? onRegisterSubmit() : null;
  // };
  console.log({ name, email, password });
  console.log(passwordInputField);

  return (
    <form
      className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center form smaller"
      onSubmit={onRegisterSubmit}
    >
      <main className="pa4 black-80">
        <fieldset id="sign-in" className="ba b--transparent ph0 mh0">
          <h2 className="f2 fw6 ph0 ma0 noselect">Register</h2>
          <label className="db fw6 lh-copy f6 mv3" htmlFor="name">
            Name
            <input
              className="pa2 input-reset ba bg-white w-100"
              type="text"
              name="name"
              id="name"
              onChange={(event) => onFieldChange('name', event)}
            />
          </label>
          <label className="db fw6 lh-copy f6 mv3" htmlFor="email">
            Email
            <input
              className={`pa2 input-reset ba bg-white w-100 ${errorClass(email.showError)}`}
              type="email"
              name="email"
              id="email"
              ref={emailInputField}
              onChange={(event) => onFieldChange('email', event)}
              onBlur={() => validateInput('email')}
            />
          </label>
          <label className="db fw6 lh-copy f6 mv3" htmlFor="password">
            Password
            <input
              className="pa2 input-reset ba bg-white w-100"
              type="password"
              name="password"
              id="password"
              ref={passwordInputField}
              onChange={(event) => onFieldChange('password', event)}
              required
            />
          </label>
        </fieldset>
        <button
          className="b ph3 pv2 input-reset ba b--black bg-lightest-blue grow f6 dib"
          type="submit"
          disabled={!isValidForm}
        >
          Register
        </button>
      </main>
    </form>
  );
};

Register.propTypes = {
  loadUser: PropTypes.func.isRequired,
  clearFields: PropTypes.func.isRequired,
};

export default Register;
