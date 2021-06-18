import { screen } from '@testing-library/react';

import { capitalizeFirstLetter } from '../../../../utils/functions.utils';
import { mountComponent } from '../../../../utils/test.utils';
import FormInput from '..';

const TEST = 'test';
const ERROR = 'Ooopps...an error occurred';
const PASSWORD = 'password';
const EMAIL = 'email';
const ALERT = 'alert';
const FORM_INPUT = 'form-input';
const SPACING_CLASS = 'mt4';

const emptyErrorData = {};

const mountFormInputComponent = (props) => mountComponent({ component: FormInput, props });

describe('FormInput component', () => {
  it('should match snapshot when input HAS NO errors', () => {
    const { container } = mountFormInputComponent({
      name: TEST,
      errorData: { errorText: ERROR, showError: false },
    });

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when input HAS errors', () => {
    const { container } = mountFormInputComponent({
      name: TEST,
      errorData: { errorText: ERROR, showError: true },
    });

    expect(container).toMatchSnapshot();
  });

  it(`should render a 'Email' input field when name is 'email'`, () => {
    mountFormInputComponent({ name: EMAIL, errorData: emptyErrorData });

    const label = screen.getByLabelText(capitalizeFirstLetter(EMAIL));
    expect(label).toBeInTheDocument();
  });

  it(`should render a 'Name' input field when name is 'password'`, () => {
    mountFormInputComponent({ name: PASSWORD, errorData: emptyErrorData });

    const label = screen.getByLabelText(capitalizeFirstLetter(PASSWORD));
    expect(label).toBeInTheDocument();
  });

  it(`should HAVE top spacing when component 'isTopInput' prop is false`, () => {
    mountFormInputComponent({ name: TEST, errorData: emptyErrorData, isTopInput: false });

    const input = screen.getByTestId(FORM_INPUT);
    expect(input).toHaveClass(SPACING_CLASS);
  });

  it(`should NOT HAVE top spacing when component 'isTopInput' prop is true`, () => {
    mountFormInputComponent({ name: TEST, errorData: emptyErrorData, isTopInput: true });

    const input = screen.getByTestId(FORM_INPUT);
    expect(input).not.toHaveClass(SPACING_CLASS);
  });

  it(`should render error message when errorData HAS error`, () => {
    mountFormInputComponent({ name: TEST, errorData: { errorText: ERROR, showError: true } });

    const error = screen.getByRole(ALERT);
    expect(error).toBeInTheDocument();
  });

  it(`should NOT render error message when errorData HAS NO error`, () => {
    mountFormInputComponent({ name: TEST, errorData: { errorText: ERROR, showError: false } });

    const error = screen.queryByRole(ALERT);
    expect(error).not.toBeInTheDocument();
  });
});
