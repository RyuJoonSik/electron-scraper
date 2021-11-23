import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../Store/Store';
import './ProductCheckButton.scss';

ProductCheckButton.propTypes = {
  idx: PropTypes.number,
  isChecked: PropTypes.bool,
};

function ProductCheckButton({ idx, isChecked, dispatch }) {
  // console.log('ProductCheckButton render');
  // const { dispatch } = useContext(Context);

  const onClick = useCallback(
    ({ target: { dataset } }) => {
      const productIdx = dataset.idx * 1;

      // console.log(dispatch);
      dispatch({ type: 'CHECK_PRODUCT', payload: productIdx });
    },
    [dispatch]
  );

  return (
    <button data-idx={idx} title="product-check" onClick={onClick} className="product-check-state">
      {isChecked ? '☑️' : '🟦'}
    </button>
  );
}

export default React.memo(ProductCheckButton, (prev, next) => prev.isChecked === next.isChecked);
