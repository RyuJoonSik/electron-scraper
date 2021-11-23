import React, { useEffect, useState } from 'react';
import './PaginationBar.scss';
import PropTypes from 'prop-types';
import PaginationButton from '../PaginationButton/PaginationButton';

PaginationBar.propTypes = {
  curPageNum: PropTypes.number,
  onMove: PropTypes.func,
  lastPageNum: PropTypes.number,
};

function PaginationBar({ curPageNum, lastPageNum, onMove }) {
  const [value, setValue] = useState(curPageNum);

  useEffect(() => {
    setValue(curPageNum);
  }, [curPageNum]);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div data-testid="pagination-bar" className="pagination-bar">
      <input
        data-testid="currentPageNumber"
        value={value || ''}
        title="current page number"
        onChange={onChange}
        className="pagination__input"
      />
      <b title="last page num" data-testid="lastPageNumber" className="pagination__text">
        /{lastPageNum}
      </b>
      <PaginationButton moveTo={Number(value)} onMove={onMove}>
        GO
      </PaginationButton>
    </div>
  );
}

export default PaginationBar;
