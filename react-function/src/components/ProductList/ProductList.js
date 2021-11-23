import React, { useContext } from 'react';
import './ProductList.scss';
import Product from '../Product/Product';
import { Context } from '../Store/Store';

function ProductList() {
  // const { dispatch } = useContext(Context);

  // console.log('ProductList render');
  const {
    state: { page, curPageNum },
    dispatch,
  } = useContext(Context);

  return (
    <div data-testid="product-list" className="product-list">
      {page[curPageNum].map((product, idx) => (
        <Product product={product} key={product.URL} idx={idx} dispatch={dispatch} />
      ))}
    </div>
  );
}

export default ProductList;
