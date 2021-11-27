import {screen} from '@testing-library/dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import 헤더 from './Header.js';

describe('헤더', () => {
  function 초기화(속성 = {}) {
    const {body: 부모} = document;
    const 헤더_컴포넌트 = new 헤더(부모, 속성);

    헤더_컴포넌트.렌더();

    const 검색_유형_컴포넌트 = screen.getByTestId('search-type');
    // const keywordRadioBtn = getByTestId(body, 'search-type-keyword');
    // const brandRadioBtn = getByTestId(body, 'search-type-brand');
    // const searchBarKeyword = queryByTestId(body, 'search-bar-input');
    // const searchBarBrand = queryByTestId(body, 'search-bar-select');
    // const searchBtn = getByTestId(body, 'search-bar-btn');
    // const searchResult = getByTestId(body, 'search-result');
    // const searchResultWord = getByTestId(body, 'search-result-word');
    // const searchResultLastPageNum = getByTestId(body, 'search-result-last-page-num');
    // const downloadBar = getByTestId(body, 'download-bar');
    // const downloadBtn = getByTestId(body, 'download-bar-button');

    return {
      검색_유형_컴포넌트
    };
  }

  it("'검색_유형' 컴포넌트가 있다.", () => {
    const 검색어 = 'keyword';
    const 검색 = jest.fn();
    const 속성 = {
      검색어,
      검색
    };
    const {검색_타입_컴포넌트} = 초기화(속성);

    expect(검색_타입_컴포넌트).toBeInTheDocument();
  });

  // it('has SearchType', () => {
  //   const props = {
  //     유형_변경: jest.fn(),
  //     유형: 'keyword',
  //   };
  //   const { searchType, keywordRadioBtn, brandRadioBtn } = set(props);

  //   expect(searchType).toBeInTheDocument();
  //   expect(keywordRadioBtn).toBeInTheDocument();
  //   expect(keywordRadioBtn).toBeChecked();

  //   const spy = jest.spyOn(props, '유형_변경');

  //   userEvent.click(keywordRadioBtn);
  //   expect(spy).toBeCalledWith(keywordRadioBtn.value);

  //   userEvent.click(brandRadioBtn);
  //   expect(spy).toBeCalledWith(brandRadioBtn.value);
  // });

  // it('has SearchBarKeyword', () => {
  //   const props = {
  //     검색: jest.fn(),
  //     유형: 'keyword',
  //   };
  //   const { searchBarKeyword, searchBtn } = set(props);

  //   expect(searchBarKeyword).toBeInTheDocument();

  //   const spy = jest.spyOn(props, '검색');

  //   userEvent.click(searchBtn);
  //   expect(spy).toBeCalled();
  // });

  // it('has SearchBarBrand', () => {
  //   const props = {
  //     검색: jest.fn(),
  //     유형: 'brand',
  //   };
  //   const { searchBarBrand, searchBtn } = set(props);

  //   expect(searchBarBrand).toBeInTheDocument();

  //   const spy = jest.spyOn(props, '검색');

  //   userEvent.click(searchBtn);
  //   expect(spy).toBeCalled();
  // });

  // it('has SearchResult', () => {
  //   const 검색어 = 'vitamin';
  //   const 마지막_페이지_번호 = 417;
  //   const props = {
  //     검색: jest.fn(),
  //     유형_변경: jest.fn(),
  //     유형: 'keyword',
  //     검색어,
  //     마지막_페이지_번호,
  //   };
  //   const { searchResult, searchResultWord, searchResultLastPageNum } = set(props);

  //   expect(searchResult).toBeInTheDocument();
  //   expect(searchResultWord).toHaveTextContent(`검색어 : ${검색어}`);
  //   expect(searchResultLastPageNum).toHaveTextContent(`마지막 페이지 : ${마지막_페이지_번호}`);
  // });

  // it('has DownloadBar', () => {
  //   const props = {
  //     유형: 'keyword',
  //     다운로드: jest.fn(),
  //   };
  //   const { downloadBar, downloadBtn } = set(props);

  //   expect(downloadBar).toBeInTheDocument();

  //   const spy = jest.spyOn(props, '다운로드');

  //   userEvent.click(downloadBtn);
  //   expect(spy).toBeCalled();
  // });
});
