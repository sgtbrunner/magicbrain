import React from 'react';
import PropTypes from 'prop-types';
import LoadingOverlay from 'react-loading-overlay';

import ErrorDisplay from '../ErrorDisplay';

import './face-recognition.styles.css';

const FaceRecognition = ({ box, error, imageUrl, loading }) => (
  <div className="centered">
    <div className="absolute mt2">
      <div className="mb2">
        <LoadingOverlay active={loading} spinner>
          {!error && <img id="input-image" alt="" src={imageUrl} width="460" />}
          <div
            data-testid="face-location"
            className="bounding-box"
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol,
            }}
          />
        </LoadingOverlay>
      </div>
      {error && <ErrorDisplay error={error} />}
    </div>
  </div>
);

FaceRecognition.propTypes = {
  box: PropTypes.shape({
    topRow: PropTypes.number,
    bottomRow: PropTypes.number,
    rightCol: PropTypes.number,
    leftCol: PropTypes.number,
  }),
  error: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

FaceRecognition.defaultProps = {
  box: {},
  error: null,
};

export default FaceRecognition;
