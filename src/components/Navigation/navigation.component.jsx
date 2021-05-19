import React from 'react';
import PropTypes from 'prop-types';

import './navigation.styles.css';

const Navigation = ({ onRouteChange, signedIn }) =>
  signedIn ? (
    <nav className="navigation-bar">
      <button
        className="f4 link dim black underline pa4 pointer noselect"
        onClick={() => onRouteChange('signin')}
        type="button"
      >
        Sign Out
      </button>
    </nav>
  ) : (
    <nav className="navigation-bar">
      <button
        className="f4 link dim black underline pa3 pointer noselect"
        onClick={() => onRouteChange('signin')}
        type="button"
      >
        Sign In
      </button>
      <button
        className="f4 link dim black underline pa3 pointer noselect"
        onClick={() => onRouteChange('register')}
        type="button"
      >
        Register
      </button>
    </nav>
  );

Navigation.propTypes = {
  onRouteChange: PropTypes.func.isRequired,
  signedIn: PropTypes.bool.isRequired,
};

export default Navigation;
