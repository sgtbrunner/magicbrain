import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '../../utils/api.utils';
import {
  EMAIL,
  PASSWORD,
  INPUT_INITIAL_STATE,
  EMAIL_ERROR_MESSAGE,
  PASSWORD_ERROR_MESSAGE,
  EMAIL_REGEX_KEY,
} from '../../utils/constants.utils';

import FormButton from '../../components/Buttons/FormButton';
import FormInput from '../../components/Inputs/FormInput';

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
  const [error, setError] = useState(null);

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

  const getInputErrorClass = (showError) => (showError ? 'b--red' : '');

  const onSignInSubmit = (event) => {
    event.preventDefault();
    api
      .signInUser({ email: email.value, password: password.value })
      .then((response) => {
        if (response?.id) {
          loadUser(response);
          localStorage.setItem('user', JSON.stringify(response));
        } else {
          setError(response.error);
        }
      })
      .catch(() => setError('Something went wrong. Please try again later.'));
  };

  return (
    <form
      className="br3 ba b--black-10 mv4 w-100 w-50-m mw6 shadow-5 center smaller"
      onSubmit={onSignInSubmit}
    >
      <main className="pv3 ph4 black-80">
        <div className="measure">
          <fieldset id="sign_in" className="ba b--transparent ph0 mh0">
            <h2 className="f2 ph0 ma0 noselect">Sign In</h2>
            {error && (
              <p className="red f6 mv3 pv3 right-0 left-0 b bg-light-pink ba b--red br2">{error}</p>
            )}
            <FormInput
              name={EMAIL}
              type={EMAIL}
              errorData={{ showError: email.showError, errorText: email.errorText }}
              errorClass={getInputErrorClass(email.showError)}
              onChange={onFieldChange}
              onBlur={validateInput}
              isTopInput
            />
            <FormInput
              name={PASSWORD}
              type={PASSWORD}
              errorData={{ showError: password.showError, errorText: password.errorText }}
              errorClass={getInputErrorClass(password.showError)}
              onChange={onFieldChange}
              onBlur={validateInput}
            />
          </fieldset>
          <div className="flex flex-column items-center">
            <FormButton isValidForm={isValidForm} disabled={!isValidForm}>
              Sign In
            </FormButton>
            <button
              className="f5 dim black lh-copy mt3 link b--none bg-transparent"
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
