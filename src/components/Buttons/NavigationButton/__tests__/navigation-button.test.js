import { screen } from '@testing-library/react';

import { mountComponent } from '../../../../utils/test.utils';
import NavigationButton from '../navigation-button.component';

const HOME = 'Home';
const onClick = jest.fn();
const props = { children: HOME, onClick };

const mountNavigationButtonComponent = () => mountComponent({ component: NavigationButton, props });

describe('NavigationButton component', () => {
  it('should match snapshot', () => {
    const { container } = mountNavigationButtonComponent();

    expect(container).toMatchSnapshot();
  });

  it(`should render 'Home' as button text if children prop is 'Home'`, () => {
    mountNavigationButtonComponent();

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(HOME);
  });
});
