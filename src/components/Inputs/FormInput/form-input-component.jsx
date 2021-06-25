import React from 'react';
import PropTypes from 'prop-types';

import { capitalizeFirstLetter } from '../../../utils/functions.utils';

const FormInput = ({ name, type, errorData, isTopInput, onChange, onBlur }) => {
  const { errorText, showError } = errorData;
  const errorClass = () => (showError ? 'b--red' : '');

  return (
    <div className={!isTopInput ? 'mt4' : ''} data-testid="form-input">
      <label className="db fw6 lh-copy mv2" htmlFor={name}>
        {capitalizeFirstLetter(name)}
        <input
          data-testid={`${name}-input`}
          className={`pa2 mb0 ba bg-white w-100 br2 ${errorClass}`}
          type={type}
          name={name}
          id={name}
          onChange={(event) => onChange(name, event)}
          onBlur={() => onBlur(name)}
        />
        {showError && (
          <p className="red f6 absolute mv0 right-0 left-0" role="alert">
            {errorText}
          </p>
        )}
      </label>
    </div>
  );
};

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  errorData: PropTypes.shape({
    showError: PropTypes.bool,
    errorText: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  isTopInput: PropTypes.bool,
};

FormInput.defaultProps = {
  type: 'text',
  onChange: () => {},
  onBlur: () => {},
  isTopInput: false,
};

export default FormInput;
