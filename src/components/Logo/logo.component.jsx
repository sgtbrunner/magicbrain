import React from 'react';
import Tilt from 'react-tilt';
import brain from '../../assets/images/brain.png';
import './logo.styles.css';

const Logo = () => {
  return (
    <div className="ma4 mt0 tiltbox centered">
      <Tilt className="Tilt shadow-2" options={{ max: 100 }} style={{ height: 130, width: 130 }}>
        <div className="Tilt-inner pa4 tiltbox">
          <img className="noselect" src={brain} alt="logo" />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
