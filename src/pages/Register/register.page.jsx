import React, { useState } from 'react';
import PropTypes from 'prop-types';

import api from '../../utils/api.utils';
import {
  INPUT_INITIAL_STATE,
  NAME_ERROR_MESSAGE,
  EMAIL_ERROR_MESSAGE,
  PASSWORD_ERROR_MESSAGE,
  EMAIL_REGEX_KEY,
} from '../../utils/constants.utils';

const Register = ({ loadUser }) => {
  const [name, setName] = useState({ ...INPUT_INITIAL_STATE, errorText: NAME_ERROR_MESSAGE });
  const [email, setEmail] = useState({
    ...INPUT_INITIAL_STATE,
    errorText: EMAIL_ERROR_MESSAGE,
  });
  const [password, setPassword] = useState({
    ...INPUT_INITIAL_STATE,
    errorText: PASSWORD_ERROR_MESSAGE,
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

  const isValidForm = name.isValid && email.isValid && password.isValid;

  const isFieldValid = (fieldName, value) => {
    const validators = {
      name: value.length > 0,
      email: EMAIL_REGEX_KEY.test(String(value).toLowerCase()),
      password: value.length >= 6,
    };

    return validators[fieldName];
  };

  const onFieldChange = (fieldName, event) => {
    const input = getInput[fieldName];
    const isValid = isFieldValid(fieldName, event.target.value);
    getSetInput[fieldName]({
      ...input,
      value: event.target.value,
      isValid,
      showError: input.showError && !isValid,
    });
  };

  const validateInput = (fieldName) => {
    const input = getInput[fieldName];
    getSetInput[fieldName]({ ...input, showError: !input.isValid });
  };

  const inputErrorClass = (showError) => (showError ? 'b--red' : '');
  const disabledButtonClass = (isValidForm) => (isValidForm ? 'b bg-lightest-blue grow' : '');

  const onRegisterSubmit = () => {
    if (name && email && password) {
      api.registerUser({ name, email, password }).then((user) => {
        if (user?.id) {
          loadUser(user);
          localStorage.setItem('user', JSON.stringify(user));
          window.alert(`User ${user.name} succesfully registered!`);
        } else {
          window.alert(user);
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
  console.log({ isValidForm });

  return (
    <form
      className="br3 ba b--black-10 mv4 w-100 w-50-m mw6 shadow-5 center form smaller"
      onSubmit={onRegisterSubmit}
    >
      <main className="pa4 black-80">
        <fieldset id="sign-in" className="ba b--transparent ph0 mh0">
          <h2 className="f2 ph0 ma0 noselect">Register</h2>
          <div>
            <label className="db fw6 lh-copy mv2" htmlFor="name">
              Name
              <input
                className={`pa2 mb0 ba bg-white w-100 ${inputErrorClass(name.showError)}`}
                type="text"
                name="name"
                id="name"
                onChange={(event) => onFieldChange('name', event)}
                onBlur={() => validateInput('name')}
              />
              {name.showError && (
                <p className="red f6 absolute mv0 right-0 left-0">{name.errorText}</p>
              )}
            </label>
          </div>
          <div className="mt4">
            <label className="db fw6 lh-copy mv2" htmlFor="email">
              Email
              <input
                className={`pa2 mb0 ba bg-white w-100 ${inputErrorClass(email.showError)}`}
                type="email"
                name="email"
                id="email"
                onChange={(event) => onFieldChange('email', event)}
                onBlur={() => validateInput('email')}
              />
              {email.showError && (
                <p className="red f6 absolute mv0 right-0 left-0">{email.errorText}</p>
              )}
            </label>
          </div>
          <div className="mt4">
            <label className="db fw6 lh-copy" htmlFor="password">
              Password
              <input
                className={`pa2 mb0 ba bg-white w-100 ${inputErrorClass(password.showError)}`}
                type="password"
                name="password"
                id="password"
                onChange={(event) => onFieldChange('password', event)}
                onBlur={() => validateInput('password')}
              />
              {password.showError && (
                <p className="red f6 absolute mv0 right-0 left-0">{password.errorText}</p>
              )}
            </label>
          </div>
        </fieldset>
        <button
          className={`ph3 pv2 mt4 ba b--black f6 dib ${disabledButtonClass(isValidForm)}`}
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
};

export default Register;
