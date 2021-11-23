import React from 'react';
import PropTypes from 'prop-types';
import './ProductImage.scss';

ProductImage.propTypes = {
  imgURL: PropTypes.string,
};

function ProductImage({ imgURL }) {
  // console.log('ProductImage render');
  return (
    <a data-testid="product-img-link" href={imgURL} rel="noreferrer" target="_blank" className="product-image-link">
      <img src={imgURL} loading="lazy" title="새 창으로 이미지 열기" alt={imgURL} className="product-image-link__img" />
    </a>
  );
}

export default React.memo(ProductImage);
