import React from 'react';
import PropTypes from 'prop-types';

import './image-link-form.styles.css';

const ImageLinkForm = ({ onInputChange, onButtonClick }) => {
  return (
    <div>
      <p className="f3 smaller">
        The <b>MagicBrain</b> will detect faces in your pictures. Give it a try!
      </p>
      <div className="centered smaller">
        <div className="pa4 br3 custom-shadow-w form centered smaller">
          <input
            className="f4 pa2 w-70 centered ba"
            type="text"
            placeholder="enter the image URL here"
            onChange={onInputChange}
          />
          <button
            className="w-30 f4 link ph3 pv2 dib light bg-light-purple noselect"
            onClick={onButtonClick}
            type="button"
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

ImageLinkForm.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export default ImageLinkForm;
