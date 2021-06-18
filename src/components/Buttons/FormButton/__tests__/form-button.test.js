import { screen } from '@testing-library/react';

import { mountComponent } from '../../../../utils/test.utils';
import FormButton from '..';

const REGISTER = 'Register';
const BUTTON = 'button';

const validClass = 'b bg-lightest-blue grow';

const mountFormButtonComponent = (props) => mountComponent({ component: FormButton, props });

describe('FormButton component', () => {
  it('should match snapshot', () => {
    const { container } = mountFormButtonComponent({ children: REGISTER });

    expect(container).toMatchSnapshot();
  });

  it(`should render 'Register' as button text if children prop is 'Register'`, () => {
    mountFormButtonComponent({ children: REGISTER });

    const button = screen.getByRole(BUTTON);
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(REGISTER);
  });

  it(`should NOT be disabled if disabled prop is false`, () => {
    mountFormButtonComponent({ children: REGISTER, disabled: false });

    const button = screen.getByRole(BUTTON);
    expect(button).toBeEnabled();
  });

  it(`should be disabled if disabled prop is true`, () => {
    mountFormButtonComponent({ children: REGISTER, disabled: true });

    const button = screen.getByRole(BUTTON);
    expect(button).toBeDisabled();
  });

  it(`should NOT have valid form classes if isValidForm is false `, () => {
    mountFormButtonComponent({ children: REGISTER, isValidForm: false });

    const button = screen.getByRole(BUTTON);
    expect(button).not.toHaveClass(validClass);
  });

  it(`should have valid form classes if isValidForm is true `, () => {
    mountFormButtonComponent({ children: REGISTER, isValidForm: true });

    const button = screen.getByRole(BUTTON);
    expect(button).toHaveClass(validClass);
  });
});
