import React from 'react';
import PropTypes from 'prop-types';
import './ProductSpecialPrice.scss';

ProductSpecialPrice.propTypes = {
  specialPrice: PropTypes.string,
};

function ProductSpecialPrice({ specialPrice }) {
  // console.log('ProductSpecialPrice render');
  return (
    <>
      {specialPrice ? (
        <b title="special-price" data-testid="product-special-price" className="product-special-price">
          {specialPrice}
        </b>
      ) : null}
    </>
  );
}

export default React.memo(ProductSpecialPrice);
