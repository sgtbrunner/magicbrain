import { screen } from '@testing-library/react';

import { mountComponent } from '../../../utils/test.utils';
import Home from '..';

const USER_ENTRIES = 'user-entries';
const ENTRIES = 7;

const mountHomePage = () =>
  mountComponent({
    component: Home,
    props: {
      user: {
        id: 3,
        name: 'test',
        email: 'test@test.com',
        entries: ENTRIES,
      },
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
    expect(entries).toHaveTextContent(ENTRIES);
  });
});
