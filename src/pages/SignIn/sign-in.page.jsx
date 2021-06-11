import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  EMAIL,
  PASSWORD,
  INPUT_INITIAL_STATE,
  EMAIL_ERROR_MESSAGE,
  PASSWORD_ERROR_MESSAGE,
} from '../../utils/constants.utils';

import UserForm from '../../components/UserForm';

const SignIn = ({ loadUser }) => {
  const [email, setEmail] = useState({
    ...INPUT_INITIAL_STATE,
    errorText: EMAIL_ERROR_MESSAGE,
  });

  const [password, setPassword] = useState({
    ...INPUT_INITIAL_STATE,
    errorText: PASSWORD_ERROR_MESSAGE,
  });

  const fields = {
    email: {
      id: 1,
      name: EMAIL,
      ...email,
      type: EMAIL,
      setField: setEmail,
    },
    password: {
      id: 2,
      name: PASSWORD,
      ...password,
      type: PASSWORD,
      setField: setPassword,
    },
  };
  return <UserForm fields={fields} type="sign in" loadUser={loadUser} />;
};

SignIn.propTypes = {
  loadUser: PropTypes.func.isRequired,
};

export default SignIn;
