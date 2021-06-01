export const PARTICLE_OPTIONS = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 500,
      },
    },
  },
};

export const INPUT_INITIAL_STATE = {
  value: '',
  isValid: false,
  errorText: '',
  showError: false,
};

export const NAME_ERROR_MESSAGE = 'Name cannot be empty';
export const EMAIL_ERROR_MESSAGE = 'Please enter a valid email address';
export const PASSWORD_ERROR_MESSAGE = 'Your password must be at least 6 characters long';

export const EMAIL_REGEX_KEY = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
