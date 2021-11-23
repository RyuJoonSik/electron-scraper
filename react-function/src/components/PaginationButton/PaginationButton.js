import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import './PaginationButton.scss';

PaginationButton.propTypes = {
  children: PropTypes.any,
  moveTo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onMove: PropTypes.func,
  curPageNum: PropTypes.number,
  lastPageNum: PropTypes.number,
};

function PaginationButton({ moveTo, onMove, curPageNum, lastPageNum, children }) {
  const className =
    typeof moveTo === 'string'
      ? `pagination-button pagination-button--${moveTo}`
      : 'pagination-button pagination-button--num';

  const onClick = useCallback(() => {
    let num;

    if (typeof moveTo === 'string')
      switch (moveTo) {
        case 'first':
          num = 1;
          break;
        case 'prev':
          num = curPageNum - 1;
          break;
        case 'next':
          num = curPageNum + 1;
          break;
        case 'last':
          num = lastPageNum;
          break;

        default:
      }
    else {
      num = moveTo;
    }

    onMove(num);
  }, [curPageNum, lastPageNum, onMove, moveTo]);

  return (
    <button data-testid="pagination-button" onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export default PaginationButton;
