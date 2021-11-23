import 헤더 from './Header.js';
import { getByTestId, queryByTestId } from '@testing-library/dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('헤더', () => {
  function set(props = {}) {
    const { body } = document;
    const component = new 헤더(body, props);

    component.렌더();

    const searchType = getByTestId(body, 'search-type');
    const keywordRadioBtn = getByTestId(body, 'search-type-keyword');
    const brandRadioBtn = getByTestId(body, 'search-type-brand');
    const searchBarKeyword = queryByTestId(body, 'search-bar-input');
    const searchBarBrand = queryByTestId(body, 'search-bar-select');
    const searchBtn = getByTestId(body, 'search-bar-btn');
    const searchResult = getByTestId(body, 'search-result');
    const searchResultWord = getByTestId(body, 'search-result-word');
    const searchResultLastPageNum = getByTestId(body, 'search-result-last-page-num');
    const downloadBar = getByTestId(body, 'download-bar');
    const downloadBtn = getByTestId(body, 'download-bar-button');

    return {
      body,
      searchType,
      keywordRadioBtn,
      brandRadioBtn,
      searchBarKeyword,
      searchBarBrand,
      searchBtn,
      searchResult,
      searchResultWord,
      searchResultLastPageNum,
      downloadBar,
      downloadBtn,
    };
  }

  it('has SearchType', () => {
    const props = {
      유형_변경: jest.fn(),
      유형: 'keyword',
    };
    const { searchType, keywordRadioBtn, brandRadioBtn } = set(props);

    expect(searchType).toBeInTheDocument();
    expect(keywordRadioBtn).toBeInTheDocument();
    expect(keywordRadioBtn).toBeChecked();

    const spy = jest.spyOn(props, '유형_변경');

    userEvent.click(keywordRadioBtn);
    expect(spy).toBeCalledWith(keywordRadioBtn.value);

    userEvent.click(brandRadioBtn);
    expect(spy).toBeCalledWith(brandRadioBtn.value);
  });

  it('has SearchBarKeyword', () => {
    const props = {
      검색: jest.fn(),
      유형: 'keyword',
    };
    const { searchBarKeyword, searchBtn } = set(props);

    expect(searchBarKeyword).toBeInTheDocument();

    const spy = jest.spyOn(props, '검색');

    userEvent.click(searchBtn);
    expect(spy).toBeCalled();
  });

  it('has SearchBarBrand', () => {
    const props = {
      검색: jest.fn(),
      유형: 'brand',
    };
    const { searchBarBrand, searchBtn } = set(props);

    expect(searchBarBrand).toBeInTheDocument();

    const spy = jest.spyOn(props, '검색');

    userEvent.click(searchBtn);
    expect(spy).toBeCalled();
  });

  it('has SearchResult', () => {
    const 검색어 = 'vitamin';
    const 마지막_페이지_번호 = 417;
    const props = {
      검색: jest.fn(),
      유형_변경: jest.fn(),
      유형: 'keyword',
      검색어,
      마지막_페이지_번호,
    };
    const { searchResult, searchResultWord, searchResultLastPageNum } = set(props);

    expect(searchResult).toBeInTheDocument();
    expect(searchResultWord).toHaveTextContent(`검색어 : ${검색어}`);
    expect(searchResultLastPageNum).toHaveTextContent(`마지막 페이지 : ${마지막_페이지_번호}`);
  });

  it('has DownloadBar', () => {
    const props = {
      유형: 'keyword',
      다운로드: jest.fn(),
    };
    const { downloadBar, downloadBtn } = set(props);

    expect(downloadBar).toBeInTheDocument();

    const spy = jest.spyOn(props, '다운로드');

    userEvent.click(downloadBtn);
    expect(spy).toBeCalled();
  });
});
