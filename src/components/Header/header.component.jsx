import React from 'react';
import PropTypes from 'prop-types';

import './header.styles.css';

const Header = ({ onRouteChange, signedIn }) =>
  signedIn ? (
    <nav className="header">
      <button
        className="f4 link dim black underline pa4 pointer noselect"
        onClick={() => onRouteChange('signin')}
        type="button"
      >
        Sign Out
      </button>
    </nav>
  ) : (
    <nav className="header">
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

Header.propTypes = {
  onRouteChange: PropTypes.func.isRequired,
  signedIn: PropTypes.bool.isRequired,
};

export default Header;
