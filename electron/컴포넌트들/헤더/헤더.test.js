import {screen} from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import 헤더 from './헤더';

describe('헤더', () => {
  function 초기화(속성 = {}) {
    const {body: 부모} = document;
    const 헤더_컴포넌트 = new 헤더(부모, 속성);

    헤더_컴포넌트.렌더();
  }

  function 검색_유형_상자_탐색() {
    const 검색_유형_상자 = screen.getByTestId('search-type');

    return 검색_유형_상자;
  }

  function 키워드_검색바_탐색() {
    const 키워드_검색바 = screen.getByTestId('search-bar-input');

    return 키워드_검색바;
  }

  function 브랜드_검색바_탐색() {
    const 브랜드_검색바 = screen.getByTestId('search-bar-select');

    return 브랜드_검색바;
  }

  function 다운로드바_탐색() {
    const 다운로드바 = screen.getByTestId('download-bar');

    return 다운로드바;
  }

  function 검색_결과_상자_탐색() {
    const 검색_결과_상자 = screen.getByTestId('search-result');

    return 검색_결과_상자;
  }

  it("'검색_유형_상자' 컴포넌트가 있다.", () => {
    const 검색_유형 = 'keyword';
    const 검색_유형_변경 = jest.fn();
    const 속성 = {
      검색_유형,
      검색_유형_변경
    };

    초기화(속성);

    const 검색_유형_상자 = 검색_유형_상자_탐색();

    expect(검색_유형_상자).toBeInTheDocument();
  });

  it("속성['검색_유형'] 값이 'keyword'이면 '키워드_검색바'가 렌더링 된다.", () => {
    const 검색_유형 = 'keyword';
    const 검색 = jest.fn();
    const 속성 = {
      검색_유형,
      검색
    };

    초기화(속성);

    const 키워드_검색바 = 키워드_검색바_탐색();

    expect(키워드_검색바).toBeInTheDocument();
  });

  it("속성['검색_유형'] 값이 'brand'이면 '브랜드_검색바'가 렌더링 된다.", () => {
    const 검색_유형 = 'brand';
    const 검색 = jest.fn();
    const 속성 = {
      검색_유형,
      검색
    };

    초기화(속성);

    const 브랜드_검색바 = 브랜드_검색바_탐색();

    expect(브랜드_검색바).toBeInTheDocument();
  });

  it("'다운로드바' 컴포넌트가 있다.", () => {
    const 검색_유형 = 'brand';
    const 다운로드 = jest.fn();
    const 속성 = {
      검색_유형,
      다운로드
    };

    초기화(속성);

    const 다운로드바 = 다운로드바_탐색();

    expect(다운로드바).toBeInTheDocument();
  });

  it("'검색_결과_상자' 컴포넌트가 있다.", () => {
    const 검색_유형 = 'keyword';
    const 검색어 = 'vitamin';
    const 마지막_페이지_번호 = 10;
    const 속성 = {
      검색_유형,
      검색어,
      마지막_페이지_번호
    };

    초기화(속성);

    const 검색_결과_상자 = 검색_결과_상자_탐색();

    expect(검색_결과_상자).toBeInTheDocument();
  });
});
