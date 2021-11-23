import React from 'react';
import PropTypes from 'prop-types';
import './ProductStar.scss';

ProductStar.propTypes = {
  star: PropTypes.string,
};

function ProductStar({ star }) {
  // console.log('ProductStar render');
  return (
    <b title="product-star" data-testid="product-star" className="product-star">
      ⭐{star ? star : 0}
    </b>
  );
}

export default React.memo(ProductStar, (prev, next) => prev.star === next.star);
