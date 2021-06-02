import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '../../utils/api.utils';
import {
  INPUT_INITIAL_STATE,
  EMAIL_ERROR_MESSAGE,
  PASSWORD_ERROR_MESSAGE,
  EMAIL_REGEX_KEY,
} from '../../utils/constants.utils';

const SignIn = ({ loadUser }) => {
  const history = useHistory();

  const [email, setEmail] = useState({
    ...INPUT_INITIAL_STATE,
    errorText: EMAIL_ERROR_MESSAGE,
  });
  const [password, setPassword] = useState({
    ...INPUT_INITIAL_STATE,
    errorText: PASSWORD_ERROR_MESSAGE,
  });

  const getInput = {
    email,
    password,
  };

  const getSetInput = {
    email: setEmail,
    password: setPassword,
  };

  const isValidForm = email.isValid && password.isValid;

  const isFieldValid = (fieldName, value) => {
    const validators = {
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

  const onSignInSubmit = () => {
    if (email && password) {
      api.signInUser({ email, password }).then((user) => {
        if (user?.id) {
          loadUser(user);
          localStorage.setItem('user', JSON.stringify(user));
        } else {
          window.alert('Invalid user and/or password');
        }
      });
    } else {
      window.alert('Email and Password fields should be filled in');
    }
  };

  // const handleKeyPress = (event) => {
  //   return event.key === 'Enter' ? onSignInSubmit() : null;
  // };

  return (
    <form
      className="br3 ba b--black-10 mv4 w-100 w-50-m mw6 shadow-5 center form smaller"
      onSubmit={onSignInSubmit}
    >
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_in" className="ba b--transparent ph0 mh0">
            <h2 className="f2 ph0 ma0 noselect">Sign In</h2>
            <div>
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
          <div className="flex flex-column items-center">
            <button
              className={`ph3 pv2 mt4 ba b--black f6 dib ${disabledButtonClass(isValidForm)}`}
              type="submit"
              disabled={!isValidForm}
            >
              Sign In
            </button>
            <button
              className="f5 dim black lh-copy mt3 b--none bg-transparent"
              type="button"
              onClick={() => history.push('/register')}
            >
              Register now, it's free!
            </button>
          </div>
        </div>
      </main>
    </form>
  );
};

SignIn.propTypes = {
  loadUser: PropTypes.func.isRequired,
};

export default SignIn;
