import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mountComponent } from '../../../utils/test.utils';
import { USER } from '../../../utils/mocks.utils';
import SignIn from '..';

const BUTTON = 'button';
const EMAIL_INPUT = 'email-input';
const FORM_INPUT = 'form-input';
const HEADING = 'heading';
const PASSWORD_INPUT = 'password-input';
const SIGN_IN = 'Sign in';

const mountSignInPage = () =>
  mountComponent({
    component: SignIn,
    props: {
      loadUser: jest.fn(),
    },
  });

describe('SignIn page', () => {
  it.skip(`should match snapshot`, () => {
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

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    expect(passwordInput).toBeInTheDocument();
  });

  it(`should have submit button disabled if input fields are invalid`, () => {
    mountSignInPage();

    const button = screen.getByRole(BUTTON, { name: SIGN_IN });
    expect(button).toBeDisabled();
  });

  it(`should have submit button enabled if input fields are valid`, () => {
    mountSignInPage();

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);

    userEvent.type(emailInput, USER.email);
    userEvent.type(passwordInput, 'test123');

    const signInButton = screen.getByRole(BUTTON, { name: SIGN_IN });
    expect(signInButton).toBeEnabled();
  });

  it(`should render a register link`, () => {
    mountSignInPage();

    const linkButton = screen.getByRole(BUTTON, { name: `Register now, it's free!` });
    expect(linkButton).toBeInTheDocument();
  });
});
