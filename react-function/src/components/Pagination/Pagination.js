import React, { useContext, useEffect, useState } from 'react';
import './Pagination.scss';
import PaginationButton from '../PaginationButton/PaginationButton';
import { Context } from '../Store/Store';

function Pagination() {
  const {
    state: { curPageNum, lastPageNum },
  } = useContext(Context);
  const [value, setValue] = useState(curPageNum);

  useEffect(() => {
    setValue(curPageNum);
  }, [curPageNum]);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div data-testid="pagination" className="pagination">
        {['first', 'prev', 'next', 'last'].map((val) => (
          <PaginationButton moveTo={val} key={val} />
        ))}
      </div>
      <div data-testid="pagination" className="pagination">
        <input
          data-testid="currentPageNumber"
          value={value}
          title="current page number"
          onChange={onChange}
          className="pagination__input"
        />
        <b data-testid="lastPageNumber" className="pagination__text">
          /{lastPageNum}
        </b>
        <PaginationButton moveTo="num" pageNum={Number(value)}>
          GO
        </PaginationButton>
      </div>
    </>
  );
}

export default Pagination;
