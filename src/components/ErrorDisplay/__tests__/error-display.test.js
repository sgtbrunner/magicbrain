import { screen } from '@testing-library/react';

import { mountComponent } from '../../../utils/test.utils';
import ErrorDisplay from '..';

const ERROR = 'Oooops...an error occurred';

const mountErrorDisplayComponent = () =>
  mountComponent({ component: ErrorDisplay, props: { error: ERROR } });

describe('ErrorDisplay component', () => {
  it('should match snapshot', () => {
    const { container } = mountErrorDisplayComponent();

    expect(container).toMatchSnapshot();
  });

  it('should render component with correct error message', () => {
    mountErrorDisplayComponent();

    const error = screen.getByRole('alert');
    expect(error).toHaveTextContent(ERROR);
  });
});
