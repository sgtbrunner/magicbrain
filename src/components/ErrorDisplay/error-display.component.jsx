import React from 'react';
import PropTypes from 'prop-types';

const ErrorDisplay = ({ error }) => (
  <p className="red f6 mv3 pa3 right-0 left-0 b bg-light-pink ba b--red br2" role="alert">
    {error}
  </p>
);

ErrorDisplay.propTypes = {
  error: PropTypes.string.isRequired,
};

export default ErrorDisplay;
