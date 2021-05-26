import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import './header.styles.css';

const Header = ({ isUserSignedIn, clearUser }) => {
  const history = useHistory();

  const logout = () => {
    clearUser();
    localStorage.clear();
    history.push('/');
  };

  return (
    <nav className="header">
      {isUserSignedIn ? (
        <button
          className="f4 link dim black underline pa3 pointer noselect"
          onClick={logout}
          type="button"
        >
          Sign Out
        </button>
      ) : (
        <div>
          <button
            className="f4 link dim black underline pa3 pointer noselect"
            onClick={() => history.push('/signin')}
            type="button"
          >
            Sign In
          </button>
          <button
            className="f4 link dim black underline pa3 pointer noselect"
            onClick={() => history.push('/register')}
            type="button"
          >
            Register
          </button>
        </div>
      )}
    </nav>
  );
};

Header.propTypes = {
  clearUser: PropTypes.func.isRequired,
  isUserSignedIn: PropTypes.bool.isRequired,
};

export default Header;
