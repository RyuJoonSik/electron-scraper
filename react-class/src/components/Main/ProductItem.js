import React, { Component } from 'react';
import './ProductItem.scss';
import PropTypes from 'prop-types';
import html2canvas from 'html2canvas';

class ProductItem extends Component {
  handleOnTitleClick(e) {
    const TITLE = e.target.textContent;

    navigator.clipboard
      .writeText(TITLE)
      .then(() => alert('제품명이 복사되었습니다.'));
  }

  async onClickDownloadImg(TITLE, IMG_LINKS) {
    const CANVAS = document.createElement('canvas');
    const LENGTH = 1000;
    CANVAS.width = LENGTH;
    CANVAS.height = LENGTH;

    const CONTEXT = CANVAS.getContext('2d');
    const IMG = new Image();
    const A = document.createElement('a');

    let count = 1;

    for (const LINK of IMG_LINKS) {
      IMG.src = LINK;

      await IMG.decode();

      CONTEXT.clearRect(0, 0, LENGTH, LENGTH);
      CONTEXT.drawImage(IMG, 0, 0, LENGTH, LENGTH);

      A.href = CANVAS.toDataURL();
      A.download = `${TITLE}${count}.jpg`;
      A.click();

      count += 1;
    }
  }

  async onClickDownloadSup(SUP_TABLE) {
    document.body.appendChild(SUP_TABLE);

    const EL = document.querySelector('.supplement-facts-container');
    const CANVAS_SUP = await html2canvas(EL);
    const A = document.createElement('a');
    A.href = CANVAS_SUP.toDataURL();
    A.download = `${this.props.PRODUCT.TITLE}-성분.jpg`;

    A.click();

    EL.remove();
  }

  // async handleOnImgClick(TITLE, IMG_LINKS) {
  //   await this.downloadImages(TITLE, IMG_LINKS);
  // }

  shouldComponentUpdate(nextProps, nextState) {
    let result = false;

    if (this.props.PRODUCT.isChecked !== nextProps.PRODUCT.isChecked) {
      result = true;
    }

    return result;
  }

  render() {
    console.log('ProductItem rendering');
    const { index: INDEX, onClickProduct } = this.props;
    const {
      TITLE,
      IMG_LINKS,
      STAR,
      REVIEW,
      STOCK_STATE,
      ORIGINAL_PRICE,
      REDUCED_PRICE,
      SUP_TABLE,
      URL,
      isChecked,
    } = this.props.PRODUCT;

    return (
      <article className="product-item">
        <h2
          title={TITLE}
          onClick={this.handleOnTitleClick.bind(this)}
          className="product-item__title"
        >
          {TITLE}
        </h2>
        <a
          href={IMG_LINKS[0]}
          target="_blank"
          rel="noreferrer"
          className="product-item__link"
        >
          <img
            alt={TITLE}
            src={IMG_LINKS[0]}
            loading="lazy"
            className="product-item__img"
          ></img>
        </a>
        <div className="product-item__content-container">
          <div className="product-item__content">
            <b className="product-item__star">⭐{STAR}</b>
            <b className="product-item__review">👨‍👩‍👦‍👦{REVIEW}</b>
            <b className="product-item__state">
              {STOCK_STATE.includes('In Stock') ||
              STOCK_STATE.includes('재고있음')
                ? '✔️'
                : '❌'}
            </b>
          </div>
          <div className="product-item__content product-item__content--margin-left">
            <b className="product-item__price">{ORIGINAL_PRICE}</b>
            {REDUCED_PRICE !== '0' && (
              <b className="product-item__price product-item__price--isDiscount">
                {REDUCED_PRICE}
              </b>
            )}
          </div>
          <div className="product-item__content product-item__content--margin-left">
            <a href={URL} target="_blank" rel="noreferrer">
              🔗
            </a>
            <button
              onClick={this.onClickDownloadImg.bind(this, TITLE, IMG_LINKS)}
            >
              📷
            </button>

            {SUP_TABLE !== null ? (
              <button onClick={this.onClickDownloadSup.bind(this, SUP_TABLE)}>
                💊
              </button>
            ) : null}

            <button onClick={() => onClickProduct(INDEX)}>
              {isChecked ? '☑️' : '🟦'}
            </button>
          </div>
        </div>
      </article>
    );
  }
}

ProductItem.defaultProps = {};
ProductItem.propTypes = {
  PRODUCT: PropTypes.object,
  index: PropTypes.number,
  onClickProduct: PropTypes.func,
};

export default ProductItem;
