import React from 'react';
import './CheckButton.scss';

function CheckButton({ checkState, children, dispatch }) {
  const onClick = () => {
    dispatch({ type: 'CHECK_ALL_PRODUCTS', payload: checkState });
  };

  return (
    <button data-testid="check-button" className="all-check" onClick={onClick}>
      {children}
    </button>
  );
}

export default React.memo(CheckButton, (prev, next) => prev.checkState === next.checkState);
