import { screen } from '@testing-library/react';

import { mountComponent } from '../../../utils/test.utils';
import NotFound from '..';

const mountNotFoundPage = () => mountComponent({ component: NotFound });

const HEADING = 'heading';

describe('NotFound Page', () => {
  it('should match snapshot', () => {
    const { container } = mountNotFoundPage();

    expect(container).toMatchSnapshot();
  });

  it('should render default not found message on screen', () => {
    mountNotFoundPage();

    const message = screen.getByRole(HEADING, { name: /you were not supposed to see this!/i });
    expect(message).toBeInTheDocument();
  });

  it('should render three (3) headings', () => {
    mountNotFoundPage();

    const headings = screen.getAllByRole(HEADING);
    expect(headings).toHaveLength(3);
  });

  it('should render link button', () => {
    mountNotFoundPage();

    const linkButton = screen.getByRole('button', { name: 'here' });
    expect(linkButton).toBeInTheDocument();
  });
});
