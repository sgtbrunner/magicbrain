import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '../../utils/api.utils';
import { EMAIL_REGEX_KEY } from '../../utils/constants.utils';
import { capitalizeFirstLetter, setUserOnLocalStorage } from '../../utils/functions.utils';

import ErrorDisplay from '../ErrorDisplay';
import FormButton from '../Buttons/FormButton';
import FormInput from '../Inputs/FormInput';

const UserForm = ({ fields, type, loadUser }) => {
  const isSignInForm = type === 'sign in';
  const history = useHistory();
  const [error, setError] = useState(null);
  const fieldsList = Object.values(fields);

  const isValidForm = fieldsList.every((field) => field.isValid);

  const isFieldValid = (fieldName, value) => {
    const validators = {
      name: value.length > 0,
      email: EMAIL_REGEX_KEY.test(String(value).toLowerCase()),
      password: value.length >= 6,
    };

    return validators[fieldName];
  };

  const onFieldChange = (fieldName, event) => {
    const input = fields[fieldName];
    const isValid = isFieldValid(fieldName, event.target.value);
    fields[fieldName].setField({
      ...input,
      value: event.target.value,
      isValid,
      showError: input.showError && !isValid,
    });
  };

  const validateInput = (fieldName) => {
    const input = fields[fieldName];
    fields[fieldName].setField({ ...input, showError: !input.isValid });
  };

  const getInputErrorClass = (showError) => (showError ? 'b--red' : '');

  const onSubmit = (event) => {
    event.preventDefault();

    const fieldValues = fieldsList.reduce(
      (acc, field) => ({ ...acc, [field.name]: field.value }),
      {}
    );
    const submitAction = isSignInForm ? api.signInUser : api.registerUser;
    submitAction(fieldValues)
      .then((response) => {
        if (response?.id) {
          loadUser(response);
          setUserOnLocalStorage(response);
        } else {
          setError(response.error);
        }
      })
      .catch(() => setError('Something went wrong. Please try again later.'));
  };

  return (
    <form className="br3 ba b--black-10 mv4 mw6 shadow-5 center smaller" onSubmit={onSubmit}>
      <main className="pv3 ph4 black-80">
        <fieldset id="sign-in" className="ba b--transparent ph0 mh0">
          <h2 className="f2 ph0 ma0 noselect">{capitalizeFirstLetter(type)}</h2>
          {error && <ErrorDisplay error={error} />}
          {fieldsList.map((field) => (
            <FormInput
              name={field.name}
              type={field.type}
              key={field.id}
              errorData={{ showError: field.showError, errorText: field.errorText }}
              errorClass={getInputErrorClass(field.showError)}
              onChange={onFieldChange}
              onBlur={validateInput}
              isTopInput={field.id === 1}
            />
          ))}
        </fieldset>
        <div className="flex flex-column items-center">
          <FormButton isValidForm={isValidForm} disabled={!isValidForm}>
            {capitalizeFirstLetter(type)}
          </FormButton>
          {isSignInForm && (
            <button
              className="f5 dim black lh-copy mt3 link b--none bg-transparent"
              type="button"
              onClick={() => history.push('/register')}
            >
              Register now, it's free!
            </button>
          )}
        </div>
      </main>
    </form>
  );
};

UserForm.propTypes = {
  fields: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      errorText: PropTypes.string,
      value: PropTypes.string,
      isValid: PropTypes.bool,
      showError: PropTypes.bool,
      type: PropTypes.string,
      setField: PropTypes.func,
    })
  ).isRequired,
  type: PropTypes.string.isRequired,
  loadUser: PropTypes.func.isRequired,
};

export default UserForm;
