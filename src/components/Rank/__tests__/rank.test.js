import { screen } from '@testing-library/react';

import { mountComponent } from '../../../utils/test.utils';
import Rank from '..';

const mountRankComponent = (props) => mountComponent({ component: Rank, props });

const USER_ENTRIES = 'user-entries';

describe('Rank component', () => {
  it('should match snapshot', () => {
    const { container } = mountRankComponent({ name: '', entries: 0 });

    expect(container).toMatchSnapshot();
  });

  it(`should render thirteen(13) entries rank info for user 'test'`, () => {
    const name = 'test';
    const entries = 13;
    mountRankComponent({ name, entries });

    const nameText = screen.getByText(`Hello ${name}, your current entry count is...`);
    expect(nameText).toBeInTheDocument();

    const entriesText = screen.getByTestId(USER_ENTRIES);
    expect(entriesText).toHaveTextContent(entries);
  });

  it(`should render thirteen(23) entries rank info for user 'admin'`, () => {
    const name = 'admin';
    const entries = 23;
    mountRankComponent({ name, entries });

    const nameText = screen.getByText(`Hello ${name}, your current entry count is...`);
    expect(nameText).toBeInTheDocument();

    const entriesText = screen.getByTestId(USER_ENTRIES);
    expect(entriesText).toHaveTextContent(entries);
  });
});
