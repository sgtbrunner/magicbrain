import React, { useState } from 'react';
import PropTypes from 'prop-types';

import api from '../../utils/api.utils';

const Register = ({ loadUser, clearFields }) => {
  const [registrationData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = registrationData;

  const onNameChange = (event) => {
    setRegisterData({ ...registrationData, name: event.target.value });
  };

  const onEmailChange = (event) => {
    setRegisterData({ ...registrationData, email: event.target.value.toLowerCase() });
  };

  const onPasswordChange = (event) => {
    setRegisterData({ ...registrationData, password: event.target.value });
  };

  const onRegisterSubmit = () => {
    if (name && email && password) {
      api.registerUser({ name, email, password }).then((user) => {
        if (user?.id) {
          loadUser(user);
          localStorage.setItem('user', JSON.stringify(user));
          window.alert(`User ${user.name} succesfully registered!`);
        } else {
          window.alert(user);
          clearFields();
        }
      });
    } else {
      window.alert('Name, Email and Password fields should be filled in!');
    }
  };

  const handleKeyPress = (event) => {
    return event.key === 'Enter' ? onRegisterSubmit() : null;
  };

  return (
    <article
      className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center form smaller"
      onKeyPress={handleKeyPress}
    >
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0 noselect">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Name
              </label>
              <input
                className="pa2 input-reset ba bg-white w-100"
                type="text"
                name="name"
                id="name"
                onChange={onNameChange}
                required
              />
            </div>
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
              value="Register"
              onClick={onRegisterSubmit}
            />
          </div>
        </div>
      </main>
    </article>
  );
};

Register.propTypes = {
  loadUser: PropTypes.func.isRequired,
  clearFields: PropTypes.func.isRequired,
};

export default Register;
