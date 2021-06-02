import React from 'react';
import PropTypes from 'prop-types';

const NavigationButton = ({ onClick, children }) => (
  <button className="f4 link black pv2 ma3 b--none bg-transparent" onClick={onClick} type="button">
    {children}
  </button>
);

NavigationButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
};

export default NavigationButton;
