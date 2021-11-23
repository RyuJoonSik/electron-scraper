import React, { useContext } from 'react';
import './PageController.scss';
import Pagination from '../Pagination/Pagination';
import ScrollButton from '../ScrollButton/ScrollButton';
import CheckButton from '../CheckButton/CheckButton';
import ExcelExportButton from '../ExcelExportButton/ExcelExportButton';
import { Context } from '../Store/Store';
import ContentRow from '../ContentRow/ContentRow';
import PaginationBar from '../PaginationBar/PaginationBar';
import PaginationButton from '../PaginationButton/PaginationButton';

function PageController() {
  const {
    state: { keyword, curPageNum, lastPageNum },
    dispatch,
    onMove,
  } = useContext(Context);

  const margin = '0 0 0.5rem';

  return (
    <article data-testid="controller" className="controller">
      <h3 data-testid="controller-title" className="controller__title">
        Controller
      </h3>
      <div data-testid="controller-content" className="controller__content">
        <b data-testid="controller-keyword" className="controller__keyword">
          {keyword}
        </b>
        <ContentRow margin={margin} justifyContent={'space-between'}>
          {['first', 'prev', 'next', 'last'].map((v) => (
            <PaginationButton key={v} moveTo={v} curPageNum={curPageNum} lastPageNum={lastPageNum} onMove={onMove} />
          ))}
        </ContentRow>
        <ContentRow margin={margin}>
          <PaginationBar curPageNum={curPageNum} lastPageNum={lastPageNum} onMove={onMove} />
        </ContentRow>
        <ContentRow margin={margin}>
          <ScrollButton scrollTo={'top'}>🡅</ScrollButton>
          <ScrollButton scrollTo={'bottom'}>🡇</ScrollButton>
        </ContentRow>
        <ContentRow margin={margin}>
          <CheckButton dispatch={dispatch} checkState={true}>
            ✔
          </CheckButton>
          <CheckButton dispatch={dispatch} checkState={false}>
            ✘
          </CheckButton>
        </ContentRow>
        <ExcelExportButton />
      </div>
    </article>
  );
}

export default PageController;
