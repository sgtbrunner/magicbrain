import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './image-link-form.styles.css';

const IMAGE_LINK_FORM = 'image-link-form';

const ImageLinkForm = ({ onFormSubmit }) => {
  const [imageInput, setImageInput] = useState('');

  const onInputChange = (event) => {
    setImageInput(event.target.value);
  };

  const onInputSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(imageInput);
  };

  return (
    <label className="f3" htmlFor={IMAGE_LINK_FORM}>
      The <b>MagicBrain</b> will detect faces in your pictures. Give it a try!
      <form
        className="pa4 br3 mt3 custom-shadow-w form smaller center"
        id={IMAGE_LINK_FORM}
        data-testid={IMAGE_LINK_FORM}
        onSubmit={onInputSubmit}
      >
        <input
          className="f4 pa2 w-70 ba"
          type="text"
          placeholder="enter the image URL here"
          onChange={onInputChange}
        />
        <button
          className="w-30 f4 link ph3 pv2 dib light bg-light-purple noselect"
          type="submit"
          disabled={!imageInput}
        >
          Detect
        </button>
      </form>
    </label>
  );
};

ImageLinkForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default ImageLinkForm;
