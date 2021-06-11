import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  EMAIL,
  PASSWORD,
  INPUT_INITIAL_STATE,
  NAME_ERROR_MESSAGE,
  EMAIL_ERROR_MESSAGE,
  PASSWORD_ERROR_MESSAGE,
} from '../../utils/constants.utils';

import UserForm from '../../components/UserForm';

const Register = ({ loadUser }) => {
  const [name, setName] = useState({ ...INPUT_INITIAL_STATE, errorText: NAME_ERROR_MESSAGE });
  const [email, setEmail] = useState({
    ...INPUT_INITIAL_STATE,
    errorText: EMAIL_ERROR_MESSAGE,
  });
  const [password, setPassword] = useState({
    ...INPUT_INITIAL_STATE,
    errorText: PASSWORD_ERROR_MESSAGE,
  });

  const fields = {
    name: {
      id: 1,
      name: 'name',
      ...name,
      type: 'text',
      setField: setName,
    },
    email: {
      id: 2,
      name: EMAIL,
      ...email,
      type: EMAIL,
      setField: setEmail,
    },
    password: {
      id: 3,
      name: PASSWORD,
      ...password,
      type: PASSWORD,
      setField: setPassword,
    },
  };

  return <UserForm fields={fields} type="register" loadUser={loadUser} />;
};

Register.propTypes = {
  loadUser: PropTypes.func.isRequired,
};

export default Register;
