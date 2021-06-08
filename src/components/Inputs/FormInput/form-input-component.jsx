import React from 'react';
import PropTypes from 'prop-types';

const capitalizeFirstLetter = (string) => string[0].toUpperCase() + string.slice(1);

const FormInput = ({ name, type, errorData, onChange, onBlur, errorClass, isTopInput }) => (
  <div className={!isTopInput ? 'mt4' : ''}>
    <label className="db fw6 lh-copy mv2" htmlFor={name}>
      {capitalizeFirstLetter(name)}
      <input
        className={`pa2 mb0 ba bg-white w-100 ${errorClass}`}
        type={type}
        name={name}
        id={name}
        onChange={(event) => onChange(name, event)}
        onBlur={() => onBlur(name)}
      />
      {errorData.showError && (
        <p className="red f6 absolute mv0 right-0 left-0">{errorData.errorText}</p>
      )}
    </label>
  </div>
);

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  errorData: PropTypes.shape({
    showError: PropTypes.bool,
    errorText: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  errorClass: PropTypes.string,
  isTopInput: PropTypes.bool,
};

FormInput.defaultProps = {
  type: 'text',
  onChange: () => {},
  onBlur: () => {},
  errorClass: '',
  isTopInput: false,
};

export default FormInput;
