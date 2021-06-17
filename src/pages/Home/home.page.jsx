import React, { useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import PropTypes from 'prop-types';

import FaceRecognition from '../../components/FaceRecognition';
import ImageLinkForm from '../../components/Inputs/ImageLinkForm';
import Logo from '../../components/Logo';
import Rank from '../../components/Rank';
import api from '../../utils/api.utils';
import { setUserOnLocalStorage } from '../../utils/functions.utils';

const BOX_INITIAL_STATE = {};

const Home = ({ user, setUser }) => {
  const [box, setBox] = useState(BOX_INITIAL_STATE);
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id, name, entries } = user;

  const calculateFaceLocation = (response) => {
    const clarifaiFace = response.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('input-image');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  const onImageDetect = async (input) => {
    unstable_batchedUpdates(() => {
      if (error) setError(null);
      setLoading(true);
      setBox(BOX_INITIAL_STATE);
      setImageUrl(input);
    });
    await api
      .getImageBoundary({ input })
      .then((response) => {
        if (response.outputs) {
          api.updateImageCount({ id }).then((data) => {
            if (data.count) {
              const userData = { ...user, entries: Number(data.count) };
              setUser(userData);
              setUserOnLocalStorage(userData);
              const facePosition = calculateFaceLocation(response);
              setBox({ ...facePosition });
            } else {
              setError(data.error);
            }
          });
        } else {
          setError(response.error);
        }
      })
      .catch(() => setError('Something went wrong. Please try again later.'));
    setLoading(false);
  };

  return (
    <div>
      <Rank name={name} entries={entries} />
      <Logo />
      <ImageLinkForm onFormSubmit={onImageDetect} />
      <FaceRecognition box={box} error={error} imageUrl={imageUrl} loading={loading} />
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
