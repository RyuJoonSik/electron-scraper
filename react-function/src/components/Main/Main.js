import React, { useContext } from 'react';
import './Main.scss';
import ProductList from '../ProductList/ProductList';
import PageController from '../PageController/PageController';
import { Context } from '../Store/Store';
import SearchResult from '../SearchResult/SearchResult';

function Main() {
  // console.log('Main render');
  const {
    state: { page, curPageNum, keyword, lastPageNum },
  } = useContext(Context);

  return (
    <>
      {page[curPageNum] ? (
        <main data-testid="main" className="main">
          <SearchResult keyword={keyword} lastPageNum={lastPageNum} />
          <ProductList />
          <PageController />
        </main>
      ) : null}
    </>
  );
}

export default Main;
