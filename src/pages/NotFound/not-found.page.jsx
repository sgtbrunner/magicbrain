import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="f3 fw6 pt6 pr6 pl6 black-80">
    <h1>Oooooppssss.......</h1>
    <h3>You were not supposed to see this!</h3>
    <h5>
      Click <Link to="/">here</Link> to go back
    </h5>
  </div>
);

export default NotFound;
