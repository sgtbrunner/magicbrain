import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mountComponent } from '../../../../utils/test.utils';
import ImageLinkForm from '..';

const BUTTON = 'button';

const mountImageLinkFormComponent = () =>
  mountComponent({ component: ImageLinkForm, props: { onFormSubmit: jest.fn() } });

describe('ImageLinkForm component', () => {
  it('should match snapshot', () => {
    const { container } = mountImageLinkFormComponent();

    expect(container).toMatchSnapshot();
  });

  it(`should render a button with 'Detect' label`, () => {
    mountImageLinkFormComponent();

    const button = screen.getByRole(BUTTON);
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Detect');
  });

  it('should have button initially disabled', () => {
    mountImageLinkFormComponent();

    const button = screen.getByRole(BUTTON);
    expect(button).toBeDisabled();
  });

  it('should enable button if user fills in the input field', () => {
    mountImageLinkFormComponent();

    const input = screen.getByRole('textbox');

    userEvent.clear(input);
    userEvent.type(input, 'http:my-domain.com/my-image.jpg');

    const button = screen.getByRole(BUTTON);
    expect(button).toBeEnabled();
  });
});
