import { screen } from '@testing-library/react';

import { capitalizeFirstLetter } from '../../../utils/functions.utils';
import { mountComponent } from '../../../utils/test.utils';
import Register from '..';

const BUTTON = 'button';
const EMAIL = 'email';
const FORM_INPUT = 'form-input';
const HEADING = 'heading';
const PASSWORD = 'password';
const REGISTER = 'Register';

const mountRegisterPage = () =>
  mountComponent({
    component: Register,
    props: {
      loadUser: jest.fn(),
    },
  });

describe('Register page', () => {
  it(`should match snapshot`, () => {
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

    const nameInput = screen.getByLabelText(capitalizeFirstLetter('name'));
    expect(nameInput).toBeInTheDocument();

    const emailInput = screen.getByLabelText(capitalizeFirstLetter(EMAIL));
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByLabelText(capitalizeFirstLetter(PASSWORD));
    expect(passwordInput).toBeInTheDocument();
  });

  it(`should have submit button disabled if input fields are invalid`, () => {
    mountRegisterPage();

    const button = screen.getByRole(BUTTON, { name: REGISTER });
    expect(button).toBeDisabled();
  });
});
