import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import 'jest-canvas-mock';

import App from '../App';

const REGISTER = 'Register';
const SIGN_IN = 'Sign In';
const USER_FORM = 'user-form';

const mountApp = () =>
  render(
    <Router>
      <App />
    </Router>
  );

describe('App', () => {
  it.skip('should match snapshot', () => {
    const { container } = mountApp();

    expect(container).toMatchSnapshot();
  });

  it(`should render 'Sign In' and 'Sign Out' link buttons on page header if user
    IS NOT logged in`, () => {
    mountApp();

    const signInButton = screen.getByRole('button', { name: SIGN_IN });
    expect(signInButton).toBeInTheDocument();

    const registerButton = screen.getByRole('button', { name: REGISTER });
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

    const signInButton = screen.getByRole('button', { name: SIGN_IN });
    const registerButton = screen.getByRole('button', { name: REGISTER });

    userEvent.click(registerButton);

    const registerForm = screen.getByTestId(USER_FORM);
    expect(registerForm).toBeInTheDocument();
    expect(registerForm).toHaveTextContent(REGISTER);

    userEvent.click(signInButton);

    const signInForm = screen.getByTestId(USER_FORM);
    expect(signInForm).toBeInTheDocument();
    expect(signInForm).toHaveTextContent('Sign in');
  });
});
