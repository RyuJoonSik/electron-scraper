import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ProductList.scss';
import ProductItem from './ProductItem';

class ProductList extends Component {
  render() {
    console.log('ProductList rendering');
    const { PRODUCTS, onClickProduct } = this.props;

    return (
      <section className="product-list">
        {PRODUCTS.map((PRODUCT, idx) => (
          <ProductItem
            onClickProduct={onClickProduct}
            PRODUCT={PRODUCT}
            key={PRODUCT.TITLE}
            index={idx}
          />
        ))}
      </section>
    );
  }
}

// ProductList.defaultProps = {};
ProductList.propTypes = {
  PRODUCTS: PropTypes.arrayOf(PropTypes.object),
  onClickProduct: PropTypes.func,
};

export default ProductList;
