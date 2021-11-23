import React from 'react';
import './Header.scss';
import SearchBar from '../SearchBar/SearchBar';

function Header() {
  // console.log('Header render');
  return (
    <header data-testid="header" className="header">
      <SearchBar />
    </header>
  );
}

export default Header;
