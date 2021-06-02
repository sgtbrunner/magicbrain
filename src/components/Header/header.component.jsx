import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import NavigationButton from '../Buttons/NavigationButton';

const Header = ({ isUserSignedIn, clearUser }) => {
  const history = useHistory();

  const navigateToRegister = () => history.push('/register');
  const navigateToSignIn = () => history.push('/signin');
  const logout = () => {
    clearUser();
    localStorage.clear();
    history.push('/');
  };

  return (
    <nav className="flex justify-end pt3">
      {isUserSignedIn ? (
        <NavigationButton onClick={logout}>Sign Out</NavigationButton>
      ) : (
        <div>
          <NavigationButton onClick={navigateToSignIn}>Sign In</NavigationButton>
          <NavigationButton onClick={navigateToRegister}>Register</NavigationButton>
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
