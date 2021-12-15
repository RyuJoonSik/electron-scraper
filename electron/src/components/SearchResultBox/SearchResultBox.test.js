import {screen} from '@testing-library/dom';
import '@testing-library/jest-dom';

import 검색_결과_상자 from './SearchResultBox';

describe('검색_결과_상자 컴포넌트', () => {
  function 초기화(속성 = {}) {
    const {body: 부모} = document;
    const 검색_결과_상자_컴포넌트 = new 검색_결과_상자(부모, 속성);

    검색_결과_상자_컴포넌트.렌더();

    const 검색어_텍스트 = screen.getByTestId('search-result-word');
    const 마지막_페이지_텍스트 = screen.getByTestId('search-result-last-page-number');

    return {검색어_텍스트, 마지막_페이지_텍스트};
  }

  it('검색어 태그(b)를 갖고 있다', () => {
    const {검색어_텍스트} = 초기화();

    expect(검색어_텍스트).toBeInTheDocument();
  });

  it('검색 결과의 마지막 페이지 번호를 알려주는 태그(b)를 갖고 있다', () => {
    const {마지막_페이지_텍스트} = 초기화();

    expect(마지막_페이지_텍스트).toBeInTheDocument();
  });

  it("속성['검색어'] 값을 검색어 태그의 텍스트 콘텐츠로 넣는다", () => {
    const 검색어 = 'vitamin';
    const 속성 = {
      검색어
    };
    const {검색어_텍스트} = 초기화(속성);

    expect(검색어_텍스트).toHaveTextContent(검색어);
  });

  it("속성[마지막_페이지_번호'] 값을 마지막 페이지 번호 태그의 텍스트 콘텐츠로 넣는다", () => {
    const 마지막_페이지_번호 = 'vitamin';
    const 속성 = {
      마지막_페이지_번호
    };
    const {마지막_페이지_텍스트} = 초기화(속성);

    expect(마지막_페이지_텍스트).toHaveTextContent(마지막_페이지_번호);
  });
});
