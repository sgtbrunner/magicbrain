import { screen } from '@testing-library/react';

import { mountComponent } from '../../../utils/test.utils';
import Header from '..';

const BUTTON = 'button';
const clearUser = jest.fn();

const mountHeaderComponent = ({ isUserSignedIn }) =>
  mountComponent({ component: Header, props: { isUserSignedIn, clearUser } });

describe('Header component', () => {
  it('should match snapshot when user IS NOT signed id', () => {
    const { container } = mountHeaderComponent({ isUserSignedIn: false });

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when user IS signed id', () => {
    const { container } = mountHeaderComponent({ isUserSignedIn: true });

    expect(container).toMatchSnapshot();
  });

  it('should render two (2) buttons when user IS NOT signed in', () => {
    mountHeaderComponent({ isUserSignedIn: false });

    const buttons = screen.getAllByRole(BUTTON);
    expect(buttons).toHaveLength(2);
  });

  it(`should render 'Sign In' and 'Register' buttons when user IS NOT signed in`, () => {
    mountHeaderComponent({ isUserSignedIn: false });

    const signInButton = screen.getByRole(BUTTON, { name: 'Sign In' });
    expect(signInButton).toBeInTheDocument();

    const registerButton = screen.getByRole(BUTTON, { name: 'Register' });
    expect(registerButton).toBeInTheDocument();
  });

  it('should render one (1) button when user IS signed in', () => {
    mountHeaderComponent({ isUserSignedIn: true });

    const buttons = screen.getAllByRole(BUTTON);
    expect(buttons.length).toBe(1);
  });

  it(`should render 'Sign out' button when user IS signed in`, () => {
    mountHeaderComponent({ isUserSignedIn: true });

    const signOutButton = screen.getByRole(BUTTON, { name: 'Sign Out' });
    expect(signOutButton).toBeInTheDocument();
  });
});
