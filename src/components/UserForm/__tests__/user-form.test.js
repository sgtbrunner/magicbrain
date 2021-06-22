import { screen } from '@testing-library/react';

import { INPUT_INITIAL_STATE } from '../../../utils/constants.utils';
import { capitalizeFirstLetter } from '../../../utils/functions.utils';
import { mountComponent } from '../../../utils/test.utils';
import UserForm from '..';

const mountUserFormComponent = (newProps) =>
  mountComponent({ component: UserForm, props: { loadUser: jest.fn(), ...newProps } });

const setField = jest.fn();

const EMAIL = 'email';
const PASSWORD = 'password';
const SIGN_IN = 'Sign in';
const REGISTER = 'Register';
const HEADING = 'heading';
const BUTTON = 'button';
const FORM_INPUT = 'form-input';
const TEST_EMAIL = 'test@test.com';
const TEST_PASSWORD = 'test123';

const signInProps = {
  fields: {
    email: {
      id: 2,
      name: EMAIL,
      ...INPUT_INITIAL_STATE,
      type: EMAIL,
      setField,
    },
    password: {
      id: 3,
      name: PASSWORD,
      ...INPUT_INITIAL_STATE,
      type: PASSWORD,
      setField,
    },
  },
  type: 'sign in',
};

const registerProps = {
  fields: {
    name: {
      id: 1,
      name: 'name',
      ...INPUT_INITIAL_STATE,
      type: 'text',
      setField,
    },
    ...signInProps.fields,
  },
  type: 'register',
};

describe('UserForm component', () => {
  it(`should match snapshot when type is 'sign in'`, () => {
    const { container } = mountUserFormComponent(signInProps);

    expect(container).toMatchSnapshot();
  });

  it(`should match snapshot when type is 'register'`, () => {
    const { container } = mountUserFormComponent(registerProps);

    expect(container).toMatchSnapshot();
  });

  it(`should render 'Sign In' label and button when type is 'sign in'`, () => {
    mountUserFormComponent(signInProps);

    const label = screen.getByRole(HEADING, { name: SIGN_IN });
    const button = screen.getByRole(BUTTON, { name: SIGN_IN });

    expect(label).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it(`should render two (2) input fields (email and password) when type is 'sign in'`, () => {
    mountUserFormComponent(signInProps);

    const inputFields = screen.getAllByTestId(FORM_INPUT);
    expect(inputFields).toHaveLength(2);

    const emailInput = screen.getByLabelText(capitalizeFirstLetter(EMAIL));
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByLabelText(capitalizeFirstLetter(PASSWORD));
    expect(passwordInput).toBeInTheDocument();
  });

  it(`should have submit button disabled if input fields are invalid when type is 'sign in'`, () => {
    mountUserFormComponent(signInProps);

    const button = screen.getByRole(BUTTON, { name: SIGN_IN });
    expect(button).toBeDisabled();
  });

  it(`should render a register link when type is 'sign in'`, () => {
    mountUserFormComponent(signInProps);

    const linkButton = screen.getByRole(BUTTON, { name: `Register now, it's free!` });
    expect(linkButton).toBeInTheDocument();
  });

  it(`should render 'Register' label and button when type is 'register'`, () => {
    mountUserFormComponent(registerProps);

    const label = screen.getByRole(HEADING, { name: REGISTER });
    const button = screen.getByRole(BUTTON, { name: REGISTER });

    expect(label).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it(`should render three (3) input fields (name, email and password) when type is 'register'`, () => {
    mountUserFormComponent(registerProps);

    const inputFields = screen.getAllByTestId(FORM_INPUT);
    expect(inputFields).toHaveLength(3);

    const nameInput = screen.getByLabelText(capitalizeFirstLetter('name'));
    expect(nameInput).toBeInTheDocument();

    const emailInput = screen.getByLabelText(capitalizeFirstLetter(EMAIL));
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByLabelText(capitalizeFirstLetter(PASSWORD));
    expect(passwordInput).toBeInTheDocument();
  });

  it(`should have submit button disabled if input fields are invalid when type is 'register'`, () => {
    mountUserFormComponent(registerProps);

    const button = screen.getByRole(BUTTON, { name: REGISTER });
    expect(button).toBeDisabled();
  });
});
