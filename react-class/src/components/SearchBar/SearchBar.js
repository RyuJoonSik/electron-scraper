import React from 'react';
import PropTypes from 'prop-types';

SearchBar.propTypes = {
  
};

function SearchBar(props) {
  return (
    <div>
      <input placeholder="Keyword" />
      <button>Search</button>
    </div>
  );
}

export default SearchBar;