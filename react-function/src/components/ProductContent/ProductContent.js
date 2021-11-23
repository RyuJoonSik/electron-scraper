import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './ProductContent.scss';
import ProductImage from '../ProductImage/ProductImage';
import ProductStar from '../ProductStar/ProductStar';
import ProductReviewCount from '../ProductReviewCount/ProductReviewCount';
import ProductState from '../ProductState/ProductState';
import ProductPrice from '../ProductPrice/ProductPrice';
import ProductSpecialPrice from '../ProductSpecialPrice/ProductSpecialPrice';
import ProductLinkButton from '../ProductLinkButton/ProductLinkButton';
import ProductIMGButton from '../ProductIMGButton/ProductIMGButton';
import ProductSUPButton from '../ProductSUPButton/ProductSUPButton';
import ProductCheckButton from '../ProductCheckButton/ProductCheckButton';
import ContentRow from '../ContentRow/ContentRow';
import { Context } from '../Store/Store';

ProductContent.propTypes = {
  product: PropTypes.object,
  idx: PropTypes.number,
  dispatch: PropTypes.func,
};

function ProductContent({ product, idx, dispatch }) {
  // console.log('ProductContent render');
  // const { dispatch } = useContext(Context);
  // console.log(dispatch);

  const { title, URL, supplementTable, isChecked, imgURLs, star, review, state, originalPrice, specialPrice } = product;
  return (
    <div data-testid="product-content" className="product-content">
      <ProductImage imgURL={imgURLs[0]} />
      <ContentRow>
        <ProductStar star={star} />
        <ProductReviewCount review={review} />
        <ProductState state={state} />
      </ContentRow>
      <ContentRow>
        <ProductPrice originalPrice={originalPrice} />
        <ProductSpecialPrice specialPrice={specialPrice} />
      </ContentRow>
      <ContentRow>
        <ProductLinkButton URL={URL} />
        <ProductIMGButton title={title} imgURLs={imgURLs} />
        <ProductSUPButton title={title} supplementTable={supplementTable} />
        <ProductCheckButton isChecked={isChecked} idx={idx} dispatch={dispatch} />
      </ContentRow>
    </div>
  );
}

export default React.memo(ProductContent, (prev, next) => prev.product.isChecked === next.product.isChecked);
