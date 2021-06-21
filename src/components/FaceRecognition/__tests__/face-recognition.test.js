import { screen } from '@testing-library/react';

import { mountComponent } from '../../../utils/test.utils';
import FaceRecognition from '..';

const BOX = { bottomRow: 50, leftCol: 50, rightCol: 50, topRow: 50 };
const ERROR = 'Oooops, there is an error';
const IMG = 'img';

const mountFaceRecognitionComponent = (newProps) =>
  mountComponent({ component: FaceRecognition, props: { imageUrl: '', ...newProps } });

describe('FaceRecognition component', () => {
  it('should match snapshot whilst face location is loading', () => {
    const { container } = mountFaceRecognitionComponent({ loading: true });

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot once face location is loaded', () => {
    const { container } = mountFaceRecognitionComponent({
      loading: false,
      box: BOX,
    });

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot if there is an error', () => {
    const { container } = mountFaceRecognitionComponent({
      loading: false,
      error: ERROR,
    });

    expect(container).toMatchSnapshot();
  });

  it('should render image and spinner whilst loading', () => {
    mountFaceRecognitionComponent({ loading: true });

    const image = screen.getByRole(IMG);
    const spinner = screen.getByTestId('overlay');

    expect(image).toBeInTheDocument();
    expect(spinner).toBeInTheDocument();
  });

  it('should render image and box location once loaded', () => {
    mountFaceRecognitionComponent({
      loading: false,
      box: BOX,
    });

    const image = screen.getByRole(IMG);
    const box = screen.getByTestId('face-location');

    expect(image).toBeInTheDocument();
    expect(box).toBeInTheDocument();
  });

  it('should NOT render image but render ErrorDisplay component if there is an error', () => {
    mountFaceRecognitionComponent({
      loading: false,
      error: ERROR,
    });

    const image = screen.queryByRole(IMG);
    const error = screen.getByRole('alert');

    expect(image).not.toBeInTheDocument();
    expect(error).toBeInTheDocument();
  });
});
