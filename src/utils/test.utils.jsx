import React from 'react';
import { render } from '@testing-library/react';

export const mountComponent = ({ component, props = {} }) => {
  const Component = component;
  return render(<Component {...props} />);
};

export default null;
