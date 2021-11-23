import React from 'react';
import PropTypes from 'prop-types';
import './SearchResult.scss';

SearchResult.propTypes = {};

function SearchResult({ keyword, lastPageNum }) {
  // console.log('SearchResult render');
  return (
    <h1 title="result" data-testid="main-title" className="keyword-result">
      😎{keyword}｜📄{lastPageNum}
    </h1>
  );
}

export default React.memo(SearchResult);
