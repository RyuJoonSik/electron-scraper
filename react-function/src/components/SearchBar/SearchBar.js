import React, { useContext } from 'react';
import './SearchBar.scss';
import { Context } from '../Store/Store';

function SearchBar() {
  // console.log('SearchBar render');
  const { onChange, onSearch } = useContext(Context);

  return (
    <div data-testid="search-bar" className="search-bar">
      <input
        title="input keyword"
        placeholder="keyword"
        onChange={onChange}
        onKeyDown={onSearch}
        className="search-bar__input"
      />
      <button title="search" onClick={onSearch} className="search-bar__button">
        🔍
      </button>
    </div>
  );
}

export default SearchBar;
