import React from 'react';
import PropTypes from 'prop-types';
import './ProductLinkButton.scss';

ProductLinkButton.propTypes = {
  URL: PropTypes.string,
};

function ProductLinkButton({ URL }) {
  // console.log('ProductLinkButton render');
  return (
    <a
      title="product-link"
      data-testid="product-URL"
      rel="noreferrer"
      target="_blank"
      href={URL}
      className="product-link"
    >
      🔗
    </a>
  );
}

export default React.memo(ProductLinkButton);
