import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mountComponent } from '../../../utils/test.utils';
import { USER } from '../../../utils/mocks.utils';
import Register from '..';

const BUTTON = 'button';
const FORM_INPUT = 'form-input';
const NAME_INPUT = 'name-input';
const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const HEADING = 'heading';
const REGISTER = 'Register';

const mountRegisterPage = () =>
  mountComponent({
    component: Register,
    props: {
      loadUser: jest.fn(),
    },
  });

describe('Register page', () => {
  it.skip(`should match snapshot`, () => {
    const { container } = mountRegisterPage();

    expect(container).toMatchSnapshot();
  });

  it(`should render 'Register' label and button`, () => {
    mountRegisterPage();

    const label = screen.getByRole(HEADING, { name: REGISTER });
    const button = screen.getByRole(BUTTON, { name: REGISTER });

    expect(label).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it(`should render three (3) input fields (name, email and password)`, () => {
    mountRegisterPage();

    const inputFields = screen.getAllByTestId(FORM_INPUT);
    expect(inputFields).toHaveLength(3);

    const nameInput = screen.getByTestId(NAME_INPUT);
    expect(nameInput).toBeInTheDocument();

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    expect(passwordInput).toBeInTheDocument();
  });

  it(`should have submit button disabled if input fields are invalid`, () => {
    mountRegisterPage();

    const button = screen.getByRole(BUTTON, { name: REGISTER });
    expect(button).toBeDisabled();
  });

  it(`should have submit button enabled if input fields are valid`, () => {
    mountRegisterPage();

    const nameInput = screen.getByTestId(NAME_INPUT);
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);

    userEvent.type(nameInput, USER.name);
    userEvent.type(emailInput, USER.email);
    userEvent.type(passwordInput, 'test123');

    const registerButton = screen.getByRole(BUTTON, { name: REGISTER });
    expect(registerButton).toBeEnabled();
  });
});
