import React, { useState } from 'react';
import PropTypes from 'prop-types';

import FaceRecognition from '../../components/FaceRecognition';
import ImageLinkForm from '../../components/Inputs/ImageLinkForm';
import Logo from '../../components/Logo';
import Rank from '../../components/Rank';
import api from '../../utils/api.utils';
import { setUserOnLocalStorage } from '../../utils/functions.utils';

const Home = ({ user, setUser }) => {
  const [box, setBox] = useState({});
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(null);

  const { id, name, entries } = user;

  const calculateFaceLocation = (response) => {
    const clarifaiFace = response.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  const displayFaceBox = (box) => {
    setBox({ ...box });
  };

  const onImageDetect = (input) => {
    setImageUrl(input);
    api
      .getImageBoundary({ input })
      .then((response) => {
        if (response.outputs) {
          api.updateImageCount({ id }).then((count) => {
            const userData = { ...user, entries: Number(count) };
            setUser(userData);
            setUserOnLocalStorage(userData);
          });
          displayFaceBox(calculateFaceLocation(response));
        } else {
          setError(response.error);
        }
      })
      .catch(() => setError('Something went wrong. Please try again later.'));
  };

  return (
    <div>
      <Rank name={name} entries={entries} />
      <Logo />
      <ImageLinkForm onFormSubmit={onImageDetect} />
      <FaceRecognition imageUrl={imageUrl} box={box} error={error} />
    </div>
  );
};

Home.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    entries: PropTypes.number,
    joined: PropTypes.string,
  }).isRequired,
  setUser: PropTypes.func.isRequired,
};

export default Home;
