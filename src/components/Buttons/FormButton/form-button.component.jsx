import React from 'react';
import PropTypes from 'prop-types';

const FormButton = ({ children, isValidForm, disabled }) => {
  const getIsValidFormClass = (isValidForm) => (isValidForm ? 'b bg-lightest-blue grow' : '');

  const isValidClass = getIsValidFormClass(isValidForm);

  return (
    <button
      className={`ph3 pv2 mt3 ba b--black f6 dib ${isValidClass}`}
      type="submit"
      disabled={disabled}
    >
      {children}
    </button>
  );
};

FormButton.propTypes = {
  isValidForm: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  disabled: PropTypes.bool,
};

FormButton.defaultProps = {
  isValidForm: false,
  disabled: false,
};

export default FormButton;
