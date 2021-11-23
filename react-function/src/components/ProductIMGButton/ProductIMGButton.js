import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { downloadIMGs } from '../../js/scrap';
import './ProductIMGButton.scss';

ProductIMGButton.propTypes = {
  title: PropTypes.string,
  imgURLs: PropTypes.arrayOf(PropTypes.string),
};

function ProductIMGButton({ title, imgURLs }) {
  // console.log('ProductIMGButton render');
  const onClick = useCallback(() => {
    downloadIMGs(title, imgURLs, 1000);
  }, [title, imgURLs]);

  return (
    <button title="download-product-imgs" onClick={onClick} className="product-img-download">
      📷
    </button>
  );
}

export default React.memo(ProductIMGButton);
