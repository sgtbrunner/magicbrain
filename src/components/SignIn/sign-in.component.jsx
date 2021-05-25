import React, { useState } from 'react';
import PropTypes from 'prop-types';

import api from '../../utils/api.utils';

const SignIn = ({ loadUser, onRouteChange, clearFields }) => {
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = signInData;

  const onEmailChange = (event) => {
    setSignInData({ ...signInData, email: event.target.value.toLowerCase() });
  };

  const onPasswordChange = (event) => {
    setSignInData({ ...signInData, password: event.target.value });
  };

  const onSignInSubmit = () => {
    if (email && password) {
      api.signInUser({ email, password }).then((user) => {
        if (user?.id) {
          loadUser(user);
          onRouteChange('home');
        } else {
          window.alert('Invalid user and/or password');
          clearFields();
        }
      });
    } else {
      window.alert('Email and Password fields should be filled in');
    }
  };

  const handleKeyPress = (event) => {
    return event.key === 'Enter' ? onSignInSubmit() : null;
  };

  return (
    <article
      className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center form smaller"
      onKeyPress={handleKeyPress}
    >
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_in" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0 noselect">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={onEmailChange}
                required
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="pa2 input-reset ba bg-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={onPasswordChange}
                required
              />
            </div>
          </fieldset>
          <div className="">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-lightest-blue grow pointer f6 dib"
              type="submit"
              value="Sign in"
              onClick={onSignInSubmit}
            />
          </div>
          <div className="lh-copy mt3">
            <p className="f5 link dim black db pointer" onClick={() => onRouteChange('register')}>
              Register now, it's free!
            </p>
          </div>
        </div>
      </main>
    </article>
  );
};

SignIn.propTypes = {
  loadUser: PropTypes.func.isRequired,
  onRouteChange: PropTypes.func.isRequired,
  clearFields: PropTypes.func.isRequired,
};

export default SignIn;
