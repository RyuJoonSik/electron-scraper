import {screen} from '@testing-library/dom';
import '@testing-library/jest-dom';

import 검색_결과 from './SearchResult.js';

describe('검색_결과 컴포넌트', () => {
  function 초기화(속성 = {}) {
    const {body: 부모} = document;
    const 컴포넌트 = new 검색_결과(부모, 속성);

    컴포넌트.렌더();

    return 컴포넌트;
  }

  it('검색어 태그(b) 존재', () => {
    const 컴포넌트 = 초기화();
    const 검색어_태그 = screen.getByTestId('search-result-word');

    expect(검색어_태그).toBeInTheDocument();
  });

  it('검색 결과의 마지막 페이지 번호를 알려주는 태그(b) 존재', () => {
    const 컴포넌트 = 초기화();
    const 마지막_페이지_번호_태그 = screen.getByTestId('search-result-last-page-number');

    expect(마지막_페이지_번호_태그).toBeInTheDocument();
  });

  it("속성 중 '검색어' 프로퍼티 값을 검색어 태그의 텍스트 컨텐츠로 삽입", () => {
    const 검색어 = 'vitamin';
    const 속성 = {
      검색어
    };
    const 컴포넌트 = 초기화(속성);
    const 검색어_태그 = screen.getByTestId('search-result-word');

    expect(검색어_태그).toHaveTextContent(검색어);
  });

  it("속성 중 '마지막_페이지_번호' 프로퍼티 값을 마지막 페이지 번호 태그의 텍스트 컨텐츠로 삽입", () => {
    const 마지막_페이지_번호 = 'vitamin';
    const 속성 = {
      마지막_페이지_번호
    };
    const 컴포넌트 = 초기화(속성);
    const 마지막_페이지_번호_태그 = screen.getByTestId('search-result-last-page-number');

    expect(마지막_페이지_번호_태그).toHaveTextContent(마지막_페이지_번호);
  });
});
