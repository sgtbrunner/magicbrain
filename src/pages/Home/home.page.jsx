import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Rank from '../../components/Rank';
import Logo from '../../components/Logo';
import ImageLinkForm from '../../components/Inputs/ImageLinkForm';
import FaceRecognition from '../../components/FaceRecognition';
import api from '../../utils/api.utils';
import { setUserOnLocalStorage } from '../../utils/functions.utils';

const Home = ({ user, setUser }) => {
  const [box, setBox] = useState({});
  const [image, setImage] = useState({
    input: '',
    url: '',
  });

  const { id, name, entries } = user;
  const { input, url } = image;

  const onInputChange = (event) => {
    setImage({ ...image, input: event.target.value });
  };

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

  const onImageDetect = () => {
    setImage({ ...image, url: input });
    api
      .getImageBoundary({ input })
      .then((response) => {
        if (response.outputs) {
          api.updateImageCount({ id }).then((count) => {
            const userData = { ...user, entries: Number(count) };
            setUser(userData);
            setUserOnLocalStorage(userData);
          });
        }
        displayFaceBox(calculateFaceLocation(response));
      })
      .catch((err) => {
        alert(err);
        window.alert('Unable to process your image. Please try a different image later!');
      });
  };

  return (
    <div>
      <Rank name={name} entries={entries} />
      <Logo />
      <ImageLinkForm onInputChange={onInputChange} onButtonClick={onImageDetect} />
      <FaceRecognition imageUrl={url} box={box} />
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
