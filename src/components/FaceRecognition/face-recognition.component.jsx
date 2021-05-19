import React from 'react';
import PropTypes from 'prop-types';

import './face-recognition.styles.css';

const FaceRecognition = ({ imageUrl, box }) => (
  <div className="centered ma">
    <div className="absolute mt2">
      <img id="inputimage" alt="" src={imageUrl} width="500px" heigh="auto" />
      <div
        className="bounding-box"
        style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}
      />
    </div>
  </div>
);

FaceRecognition.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  box: PropTypes.shape({
    topRow: PropTypes.number,
    bottomRow: PropTypes.number,
    rightCol: PropTypes.number,
    leftCol: PropTypes.number,
  }).isRequired,
};

export default FaceRecognition;
