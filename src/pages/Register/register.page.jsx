import React, { useState } from 'react';
import PropTypes from 'prop-types';

import api from '../../utils/api.utils';
import {
  EMAIL,
  PASSWORD,
  INPUT_INITIAL_STATE,
  NAME_ERROR_MESSAGE,
  EMAIL_ERROR_MESSAGE,
  PASSWORD_ERROR_MESSAGE,
  EMAIL_REGEX_KEY,
} from '../../utils/constants.utils';

import FormButton from '../../components/Buttons/FormButton';
import FormInput from '../../components/Inputs/FormInput';

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
  const [error, setError] = useState(null);

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

  const getInputErrorClass = (showError) => (showError ? 'b--red' : '');

  const onRegisterSubmit = (event) => {
    event.preventDefault();
    api
      .registerUser({ name: name.value, email: email.value, password: password.value })
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
      onSubmit={onRegisterSubmit}
    >
      <main className="pv3 ph4 black-80">
        <fieldset id="sign-in" className="ba b--transparent ph0 mh0">
          <h2 className="f2 ph0 ma0 noselect">Register</h2>
          {error && (
            <p className="red f6 mv3 pv3 right-0 left-0 b bg-light-pink ba b--red br2">{error}</p>
          )}
          <FormInput
            name="name"
            errorData={{ showError: name.showError, errorText: name.errorText }}
            errorClass={getInputErrorClass(name.showError)}
            onChange={onFieldChange}
            onBlur={validateInput}
            isTopInput
          />
          <FormInput
            name={EMAIL}
            type={EMAIL}
            errorData={{ showError: email.showError, errorText: email.errorText }}
            errorClass={getInputErrorClass(email.showError)}
            onChange={onFieldChange}
            onBlur={validateInput}
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
        <FormButton isValidForm={isValidForm} disabled={!isValidForm}>
          Register
        </FormButton>
      </main>
    </form>
  );
};

Register.propTypes = {
  loadUser: PropTypes.func.isRequired,
};

export default Register;
