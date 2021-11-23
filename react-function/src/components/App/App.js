import React from 'react';
import './App.scss';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Store from '../Store/Store';

function App() {
  // console.log('App render');
  return (
    <Store>
      <Header />
      <Main />
    </Store>
  );
}

export default App;
