import {screen, waitFor} from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import 앱 from './앱.js';

describe('component 앱', () => {
  function 초기화(속성 = {}) {
    const {body: 부모} = document;
    const 앱_컴포넌트 = new 앱(부모, 속성);

    앱_컴포넌트.렌더();
  }

  function 헤더_탐색() {
    const 헤더 = screen.getByTestId('header');

    return 헤더;
  }

  function 브랜드_검색바_탐색() {
    const 브랜드_검색바 = screen.getByTestId('search-bar-select');

    return 브랜드_검색바;
  }

  function 브랜드_버튼_탐색() {
    const 브랜드_버튼 = screen.getByTestId('search-type-brand');

    return 브랜드_버튼;
  }

  function 키워드_검색바_탐색() {
    const 키워드_검색바 = screen.getByTestId('search-bar-input');

    return 키워드_검색바;
  }

  function 키워드_버튼_탐색() {
    const 키워드_버튼 = screen.getByTestId('search-type-keyword');

    return 키워드_버튼;
  }

  function 검색_버튼_탐색() {
    const 검색_버튼 = screen.getByTestId('search-btn');

    return 검색_버튼;
  }

  function 검색어_찾기() {
    const 검색어 = screen.getByTestId('search-result-word');

    return 검색어;
  }

  async function 검색_단어_찾기(단어) {
    const 검색_단어 = await screen.findByText(`검색어 : ${단어}`);

    return 검색_단어;
  }

  async function 마지막_페이지_번호_찾기(페이지_번호) {
    const 마지막_페이지_번호 = await screen.findByText(`마지막 페이지 : ${페이지_번호}`);

    return 마지막_페이지_번호;
  }

  it("'헤더' 컨포넌트가 있다.", () => {
    초기화();

    const 헤더 = 헤더_탐색();

    expect(헤더).toBeInTheDocument();
  });

  it("브랜드 버튼을 클릭하면 '브랜드 검색바'가 렌더링 된다.", () => {
    초기화();

    const 브랜드_버튼 = 브랜드_버튼_탐색();

    userEvent.click(브랜드_버튼);

    const 브랜드_검색바 = 브랜드_검색바_탐색();

    expect(브랜드_검색바).toBeInTheDocument();
  });

  it("키워드 버튼을 클릭하면 '키워드 검색바'가 렌더링 된다.", () => {
    초기화();

    const 브랜드_버튼 = 브랜드_버튼_탐색();

    userEvent.click(브랜드_버튼);

    const 브랜드_검색바 = 브랜드_검색바_탐색();

    expect(브랜드_검색바).toBeInTheDocument();

    const 키워드_버튼 = 키워드_버튼_탐색();

    userEvent.click(키워드_버튼);

    const 키워드_검색바 = 키워드_검색바_탐색();

    expect(키워드_검색바).toBeInTheDocument();
  });

  it("키워드로 검색하면 '검색_결과_상자'가 렌더링 된다.", async () => {
    초기화();

    const 키워드_검색바 = 키워드_검색바_탐색();
    const 검색어 = 'vitamin';
    const 페이지_번호 = 417;

    userEvent.type(키워드_검색바, 검색어);

    const 검색_버튼 = 검색_버튼_탐색();

    userEvent.click(검색_버튼);

    const 검색_단어 = await 검색_단어_찾기(검색어);

    expect(검색_단어).toBeInTheDocument();

    const 마지막_페이지_번호 = await 마지막_페이지_번호_찾기(페이지_번호);

    expect(마지막_페이지_번호).toBeInTheDocument();
    // const 마지막_페이지_번호_텍스트 = await screen.findByText('마지막 페이지 : 417');

    // await waitFor(() => expect(마지막_페이지_번호_텍스트).toBeInTheDocument());
    // expect(마지막_페이지_번호_텍스트).toBe(`마지막 페이지 : 417`)
  });

  it("브랜드로 검색하면 '검색_결과_상자'가 렌더링 된다.", async () => {
    초기화();
    const 브랜드_버튼 = 브랜드_버튼_탐색();

    userEvent.click(브랜드_버튼);

    const 브랜드_검색바 = 브랜드_검색바_탐색();
    const 검색어 = '21st-century-health-care';
    const 페이지_번호 = 8;

    userEvent.selectOptions(브랜드_검색바, 검색어);

    const 검색_버튼 = 검색_버튼_탐색();

    userEvent.click(검색_버튼);

    const 검색_단어 = await 검색_단어_찾기(검색어);

    expect(검색_단어).toBeInTheDocument();

    const 마지막_페이지_번호 = await 마지막_페이지_번호_찾기(페이지_번호);

    expect(마지막_페이지_번호).toBeInTheDocument();
    // const 마지막_페이지_번호_텍스트 = await screen.findByText('마지막 페이지 : 417');

    // await waitFor(() => expect(마지막_페이지_번호_텍스트).toBeInTheDocument());
    // expect(마지막_페이지_번호_텍스트).toBe(`마지막 페이지 : 417`)
  });

  it('검색 후 다운로드 버튼을 클릭하면 엑셀로 다운받는다', () => {});
});

//  it('searches brand', async () => {
//   const { body, header } = set();
//   expect(header).toBeInTheDocument();
//   const brandRadioBtn = getByTestId(body, 'search-type-brand');
//   userEvent.click(brandRadioBtn);
//   const searchBarBrand = getByTestId(body, 'search-bar-select');
//   expect(searchBarBrand).toBeInTheDocument();
//   let searchBtn = getByTestId(body, 'search-bar-btn');
//   userEvent.click(searchBtn);
//   userEvent.selectOptions(searchBarBrand, '21st-century-health-care');
//   searchBtn = getByTestId(body, 'search-bar-btn');
//   userEvent.click(searchBtn);
//   const searchResultWord = await findByText(body, '검색어 : 21st Century Health Care');
//   const searchLastPageNum = await findByText(body, `마지막 페이지 : 8`);
//   expect(searchResultWord).toBeInTheDocument();
//   expect(searchLastPageNum).toBeInTheDocument();
//   const startNumberInput = getByTestId(body, 'download-bar-start-page');
//   const endNumberInput = getByTestId(body, 'download-bar-end-page');
//   userEvent.type(startNumberInput, '1');
//   userEvent.type(endNumberInput, '1');
//   const spyConsole = jest.spyOn(console, 'log');
//   const downloadBtn = getByTestId(body, 'download-bar-button');
//   userEvent.click(downloadBtn);
//   await waitFor(() => expect(spyConsole).toBeCalledWith('소요 시간 : 0초'));
// });
// it('searches keyword', async () => {
//   const { body, header } = set();
//   expect(header).toBeInTheDocument();
//   const keywordRadioBtn = getByTestId(body, 'search-type-keyword');
//   userEvent.click(keywordRadioBtn);
//   const searchBarKeyword = getByTestId(body, 'search-bar-input');
//   expect(searchBarKeyword).toBeInTheDocument();
//   let searchBtn = getByTestId(body, 'search-bar-btn');
//   userEvent.click(searchBtn);
//   userEvent.type(searchBarKeyword, 'vitamin');
//   searchBtn = getByTestId(body, 'search-bar-btn');
//   userEvent.click(searchBtn);
//   const searchResultWord = await findByText(body, '검색어 : vitamin');
//   const searchLastPageNum = await findByText(body, `마지막 페이지 : 417`);
//   expect(searchResultWord).toBeInTheDocument();
//   expect(searchLastPageNum).toBeInTheDocument();
//   const startNumberInput = getByTestId(body, 'download-bar-start-page');
//   const endNumberInput = getByTestId(body, 'download-bar-end-page');
//   userEvent.type(startNumberInput, '1');
//   expect(startNumberInput).toHaveValue('1');
//   userEvent.type(endNumberInput, '2');
//   expect(endNumberInput).toHaveValue('2');
//   const spyConsole = jest.spyOn(console, 'log');
//   const downloadBtn = getByTestId(body, 'download-bar-button');
//   userEvent.click(downloadBtn);
//   await waitFor(() => expect(spyConsole).toBeCalledWith('소요 시간 : 0초'));
// });
