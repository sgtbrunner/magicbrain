import React from 'react';
import { useHistory } from 'react-router-dom';

import './not-found.styles.css';

const NotFound = () => {
  const history = useHistory();
  return (
    <div className="f3 fw6 pt6 pr6 pl6 black-80">
      <h1>Oooooppssss.......</h1>
      <h3>You were not supposed to see this!</h3>
      <h5>
        Click{' '}
        <button type="button" className="link-button" onClick={() => history.push('/')}>
          here
        </button>{' '}
        to go back
      </h5>
    </div>
  );
};
export default NotFound;
