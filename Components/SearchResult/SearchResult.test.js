import 검색_결과 from './SearchResult';
import { getByTestId } from '@testing-library/dom';
import '@testing-library/jest-dom';

describe('SearchResult', () => {
  function set(props = {}) {
    const { body } = document;
    const component = new 검색_결과(body, props);

    component.렌더();

    const searchWord = getByTestId(body, 'search-result-word');
    const searchLastPageNum = getByTestId(body, 'search-result-last-page-num');

    return {
      searchWord,
      searchLastPageNum,
    };
  }

  it('has search word, search last page number', () => {
    const 검색어 = 'vitamin';
    const 마지막_페이지_번호 = 417;
    const props = {
      검색어,
      마지막_페이지_번호,
    };
    const { searchWord, searchLastPageNum } = set(props);

    expect(searchWord).toBeInTheDocument();
    expect(searchLastPageNum).toBeInTheDocument();

    expect(searchWord).toHaveTextContent(`검색어 : ${검색어}`);
    expect(searchLastPageNum).toHaveTextContent(`마지막 페이지 : ${마지막_페이지_번호}`);
  });
});
