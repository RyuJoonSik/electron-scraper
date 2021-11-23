import React from 'react';
import PropTypes from 'prop-types';
import './ProductState.scss';

ProductState.propTypes = {
  state: PropTypes.string,
};

function ProductState({ state }) {
  // console.log('ProductState render');
  return (
    <b title="product-state" data-testid="product-state" className="product-state">
      {state === 'In Stock' ? '✔️' : '❌'}
    </b>
  );
}

export default React.memo(ProductState);
