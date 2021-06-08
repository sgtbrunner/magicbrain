import React from 'react';
import PropTypes from 'prop-types';

import Rank from '../../components/Rank';
import Logo from '../../components/Logo';
import ImageLinkForm from '../../components/Inputs/ImageLinkForm';
import FaceRecognition from '../../components/FaceRecognition';

const Home = ({ name, entries, imageUrl, box, onInputChange, onImageDetect }) => (
  <div>
    <Rank name={name} entries={entries} />
    <Logo />
    <ImageLinkForm onInputChange={onInputChange} onButtonClick={onImageDetect} />
    <FaceRecognition imageUrl={imageUrl} box={box} />
  </div>
);

Home.propTypes = {
  name: PropTypes.string.isRequired,
  entries: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  box: PropTypes.shape({
    topRow: PropTypes.number,
    bottomRow: PropTypes.number,
    rightCol: PropTypes.number,
    leftCol: PropTypes.number,
  }).isRequired,
  onInputChange: PropTypes.func.isRequired,
  onImageDetect: PropTypes.func.isRequired,
};

export default Home;
