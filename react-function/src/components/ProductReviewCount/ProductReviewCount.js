import React from 'react';
import PropTypes from 'prop-types';
import './ProductReviewCount.scss';

ProductReviewCount.propTypes = {
  review: PropTypes.string,
};

function ProductReviewCount({ review }) {
  // console.log('ProductReviewCount render');
  return (
    <b title="review-count" data-testid="product-review" className="product-review-count">
      👨‍👩‍👦‍👦{review ? review : 0}
    </b>
  );
}

export default React.memo(ProductReviewCount);
