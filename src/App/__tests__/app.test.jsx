import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import 'jest-canvas-mock';

import api from '../../utils/api.utils';
import { USER, CREDENTIAL_ERROR, SERVER_ERROR } from '../../utils/mocks.utils';
import App from '../App';

jest.mock('../../utils/api.utils.js');

const ALERT = 'alert';
const BUTTON = 'button';
const REGISTER = 'Register';
const SIGN_IN = 'Sign In';
const SIGN_OUT = 'Sign Out';
const USER_FORM = 'user-form';
const USER_ENTRIES = 'user-entries';
const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const PASSWORD = 'test123';

const mountApp = () =>
  render(
    <Router>
      <App />
    </Router>
  );

describe('App', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it.skip('should match snapshot', () => {
    const { container } = mountApp();

    expect(container).toMatchSnapshot();
  });

  it(`should render 'Sign In' and SIGN_OUT link buttons on page header if user
    IS NOT logged in`, () => {
    mountApp();

    const signInButton = screen.getByRole(BUTTON, { name: SIGN_IN });
    expect(signInButton).toBeInTheDocument();

    const registerButton = screen.getByRole(BUTTON, { name: REGISTER });
    expect(registerButton).toBeInTheDocument();
  });

  it(`should render 'Sign In' form on page if user IS NOT logged in`, () => {
    mountApp();

    const userForm = screen.getByTestId(USER_FORM);
    expect(userForm).toBeInTheDocument();
    expect(userForm).toHaveTextContent('Sign in');
  });

  it(`should render 'Register' form on page if 'Register' link button is 
    clicked and 'Sign In' form again if 'Sign In' link button is clicked, 
    if user IS NOT logged in`, () => {
    mountApp();

    const signInButton = screen.getByRole(BUTTON, { name: SIGN_IN });
    const registerButton = screen.getByRole(BUTTON, { name: REGISTER });

    // navigate to register page
    userEvent.click(registerButton);

    const registerForm = screen.getByTestId(USER_FORM);
    expect(registerForm).toBeInTheDocument();
    expect(registerForm).toHaveTextContent(REGISTER);

    // navigate to sign in page
    userEvent.click(signInButton);

    const signInForm = screen.getByTestId(USER_FORM);
    expect(signInForm).toBeInTheDocument();
    expect(signInForm).toHaveTextContent('Sign in');
  });

  it(`should sign in user and load home page if credentials are correct
    and then sign out`, async () => {
    mountApp();
    api.signInUser.mockResolvedValue(USER);

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);

    // type in user credentials
    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, PASSWORD);

    // submit form
    const formButton = screen.getByRole(BUTTON, { name: 'Sign in' });
    userEvent.click(formButton);

    await waitFor(async () => {
      // checks for home page loaded
      const entries = screen.getByTestId(USER_ENTRIES);
      expect(entries).toBeInTheDocument();
      expect(entries).toHaveTextContent(USER.entries);

      // signs out
      const signOutButton = screen.getByRole(BUTTON, { name: SIGN_OUT });
      userEvent.click(signOutButton);

      await waitFor(async () => {
        // checks for sign in form
        const signInForm = screen.getByTestId(USER_FORM);
        expect(signInForm).toBeInTheDocument();
      });
    });
  });

  it(`should render error alert on sign in attempt if credentials are wrong`, async () => {
    mountApp();
    api.signInUser.mockResolvedValue(CREDENTIAL_ERROR);

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);

    // type in user credentials
    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, 'qwerty');

    // submit form
    const formButton = screen.getByRole(BUTTON, { name: 'Sign in' });
    userEvent.click(formButton);

    await waitFor(async () => {
      // checks for alert
      const alert = screen.getByRole(ALERT);
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveTextContent(CREDENTIAL_ERROR.error);
    });
  });

  it(`should render error alert on sign in attempt if server is down`, async () => {
    mountApp();
    api.signInUser.mockResolvedValue(SERVER_ERROR);

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);

    // type in user credentials
    userEvent.type(emailInput, USER.email);
    userEvent.type(passwordInput, PASSWORD);

    // submit form
    const formButton = screen.getByRole(BUTTON, { name: 'Sign in' });
    userEvent.click(formButton);

    await waitFor(async () => {
      // checks for home page loaded
      const alert = screen.getByRole(ALERT);
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveTextContent(SERVER_ERROR.error);
    });
  });

  it(`should register user and load home page if user info is correct`, async () => {
    mountApp();
    api.registerUser.mockResolvedValue(USER);

    // navigate to register page
    const registerButton = screen.getByRole(BUTTON, { name: REGISTER });
    userEvent.click(registerButton);

    const nameInput = screen.getByTestId('name-input');
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);

    // type in new user credentials
    userEvent.type(nameInput, USER.name);
    userEvent.type(emailInput, USER.email);
    userEvent.type(passwordInput, PASSWORD);

    // submit form
    const formButton = screen.getAllByRole(BUTTON, { name: REGISTER })[1];
    userEvent.click(formButton);

    await waitFor(async () => {
      // checks for home page loaded
      const entries = screen.getByTestId(USER_ENTRIES);
      expect(entries).toBeInTheDocument();
      expect(entries).toHaveTextContent(USER.entries);

      // signs out
      const signOutButton = screen.getByRole(BUTTON, { name: SIGN_OUT });
      userEvent.click(signOutButton);

      await waitFor(async () => {
        // checks for sign in form
        const signInForm = screen.getByTestId(USER_FORM);
        expect(signInForm).toBeInTheDocument();
      });
    });
  });
});
