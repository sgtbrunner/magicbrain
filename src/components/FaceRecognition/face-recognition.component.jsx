import React from 'react';
import PropTypes from 'prop-types';

import ErrorDisplay from '../ErrorDisplay';

import './face-recognition.styles.css';

const FaceRecognition = ({ error, box, imageUrl }) => (
  <div className="centered ma">
    <div className="absolute mt2">
      {error ? (
        <ErrorDisplay error={error} />
      ) : (
        <img id="inputimage" alt="" src={imageUrl} width="500px" height="auto" className="frame" />
      )}
      <div
        className="bounding-box"
        style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}
      />
    </div>
  </div>
);

FaceRecognition.propTypes = {
  box: PropTypes.shape({
    topRow: PropTypes.number,
    bottomRow: PropTypes.number,
    rightCol: PropTypes.number,
    leftCol: PropTypes.number,
  }).isRequired,
  error: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
};

FaceRecognition.defaultProps = {
  error: null,
};

export default FaceRecognition;
