import React from 'react';
import PropTypes from 'prop-types';

const Rank = ({ name, entries }) => (
  <div>
    <div className="white f4">{`Hello ${name}, your current entry count is...`}</div>
    <div className="white f2" data-testid="user-entries">
      {entries}
    </div>
  </div>
);

Rank.propTypes = {
  name: PropTypes.string.isRequired,
  entries: PropTypes.number.isRequired,
};

export default Rank;
