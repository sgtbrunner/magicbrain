import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import api from '../../../utils/api.utils';
import { USER, OUTPUTS, SERVER_ERROR } from '../../../utils/mocks.utils';
import { mountComponent } from '../../../utils/test.utils';
import Home from '..';

jest.mock('../../../utils/api.utils.js');

const USER_ENTRIES = 'user-entries';
const URL = 'http:my-domain.com/my-image.jpg';
const BUTTON = 'button';
const DETECT = 'Detect';
const TEXTBOX = 'textbox';

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

  it('should render logo', () => {
    mountHomePage();

    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();
  });

  it('should render the image link form', () => {
    mountHomePage();

    const imageLinkForm = screen.getByTestId('image-link-form');
    expect(imageLinkForm).toBeInTheDocument();
  });

  it(`should detect an image and display bounding box on typing a url in the form
    and clicking on the Detect button`, async () => {
    mountHomePage();
    api.getImageBoundary.mockResolvedValue(OUTPUTS);
    api.updateImageCount.mockResolvedValue({ count: USER.entries + 1 });

    const imageLinkFormInput = screen.getByRole(TEXTBOX);
    const imageLinkFormButton = screen.getByRole(BUTTON, { name: DETECT });
    userEvent.type(imageLinkFormInput, URL);
    userEvent.click(imageLinkFormButton);

    await waitFor(async () => {
      const image = screen.getAllByRole('img')[1];
      expect(image).toBeInTheDocument();

      const boundingBox = screen.getByTestId('face-location');
      expect(boundingBox).toBeInTheDocument();
    });
  });

  it(`should display error alert in case of server error on getting image boundaries`, async () => {
    mountHomePage();
    api.getImageBoundary.mockResolvedValue(SERVER_ERROR);

    const imageLinkFormInput = screen.getByRole(TEXTBOX);
    const imageLinkFormButton = screen.getByRole(BUTTON, { name: DETECT });
    userEvent.type(imageLinkFormInput, URL);
    userEvent.click(imageLinkFormButton);

    await waitFor(async () => {
      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveTextContent(SERVER_ERROR.error);
    });
  });

  it(`should display error alert in case of server error on getting image count`, async () => {
    mountHomePage();
    api.getImageBoundary.mockResolvedValue(OUTPUTS);
    api.updateImageCount.mockResolvedValue(SERVER_ERROR);

    const imageLinkFormInput = screen.getByRole(TEXTBOX);
    const imageLinkFormButton = screen.getByRole(BUTTON, { name: DETECT });
    userEvent.type(imageLinkFormInput, URL);
    userEvent.click(imageLinkFormButton);

    await waitFor(async () => {
      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveTextContent(SERVER_ERROR.error);
    });
  });
});
