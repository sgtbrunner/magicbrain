import { screen } from '@testing-library/react';
import { USER } from '../../../utils/mocks.utils';

import { mountComponent } from '../../../utils/test.utils';
import Home from '..';

const USER_ENTRIES = 'user-entries';

const mountHomePage = () =>
  mountComponent({
    component: Home,
    props: {
      user: USER,
      setUser: jest.fn(),
    },
  });

describe('Home Page', () => {
  it('should match snapshot', () => {
    const { container } = mountHomePage();

    expect(container).toMatchSnapshot();
  });

  it('should render welcoming text correctly', () => {
    mountHomePage();

    const text = screen.getByText('Hello test, your current entry count is...');
    expect(text).toBeInTheDocument();
  });

  it('should render entries correctly', () => {
    mountHomePage();

    const entries = screen.getByTestId(USER_ENTRIES);
    expect(entries).toHaveTextContent(USER.entries);
  });
});
