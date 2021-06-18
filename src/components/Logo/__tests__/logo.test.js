import { screen } from '@testing-library/react';

import { mountComponent } from '../../../utils/test.utils';
import Logo from '..';

const mountLogoComponent = () => mountComponent({ component: Logo });

describe('Logo component', () => {
  it('should match snapshot', () => {
    const { container } = mountLogoComponent();

    expect(container).toMatchSnapshot();
  });

  it('should render logo image within component', () => {
    mountLogoComponent();

    const logo = screen.getByRole('img');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveProperty('alt', 'logo');
  });
});
