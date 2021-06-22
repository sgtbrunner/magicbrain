import { screen } from '@testing-library/react';

import { capitalizeFirstLetter } from '../../../utils/functions.utils';
import { mountComponent } from '../../../utils/test.utils';
import SignIn from '..';

const BUTTON = 'button';
const EMAIL = 'email';
const FORM_INPUT = 'form-input';
const HEADING = 'heading';
const PASSWORD = 'password';
const SIGN_IN = 'Sign in';

const mountSignInPage = () =>
  mountComponent({
    component: SignIn,
    props: {
      loadUser: jest.fn(),
    },
  });

describe('SignIn component', () => {
  it(`should match snapshot`, () => {
    const { container } = mountSignInPage();

    expect(container).toMatchSnapshot();
  });

  it(`should render 'Sign In' label and button`, () => {
    mountSignInPage();

    const label = screen.getByRole(HEADING, { name: SIGN_IN });
    const button = screen.getByRole(BUTTON, { name: SIGN_IN });

    expect(label).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it(`should render two (2) input fields (email and password)`, () => {
    mountSignInPage();

    const inputFields = screen.getAllByTestId(FORM_INPUT);
    expect(inputFields).toHaveLength(2);

    const emailInput = screen.getByLabelText(capitalizeFirstLetter(EMAIL));
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByLabelText(capitalizeFirstLetter(PASSWORD));
    expect(passwordInput).toBeInTheDocument();
  });

  it(`should have submit button disabled if input fields are invalid`, () => {
    mountSignInPage();

    const button = screen.getByRole(BUTTON, { name: SIGN_IN });
    expect(button).toBeDisabled();
  });

  it(`should render a register link`, () => {
    mountSignInPage();

    const linkButton = screen.getByRole(BUTTON, { name: `Register now, it's free!` });
    expect(linkButton).toBeInTheDocument();
  });
});
