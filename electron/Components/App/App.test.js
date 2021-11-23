import 앱 from './App.js';
import { getByTestId, findByText, waitFor } from '@testing-library/dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('component 앱', () => {
  function set(props = {}) {
    const { body } = document;
    const component = new 앱(body, props);

    component.렌더();

    const header = getByTestId(body, 'header');

    return {
      body,
      header,
    };
  }

  it('searches brand', async () => {
    const { body, header } = set();

    expect(header).toBeInTheDocument();

    const brandRadioBtn = getByTestId(body, 'search-type-brand');

    userEvent.click(brandRadioBtn);

    const searchBarBrand = getByTestId(body, 'search-bar-select');

    expect(searchBarBrand).toBeInTheDocument();

    let searchBtn = getByTestId(body, 'search-bar-btn');

    userEvent.click(searchBtn);
    userEvent.selectOptions(searchBarBrand, '21st-century-health-care');

    searchBtn = getByTestId(body, 'search-bar-btn');

    userEvent.click(searchBtn);

    const searchResultWord = await findByText(body, '검색어 : 21st Century Health Care');
    const searchLastPageNum = await findByText(body, `마지막 페이지 : 8`);

    expect(searchResultWord).toBeInTheDocument();
    expect(searchLastPageNum).toBeInTheDocument();

    const startNumberInput = getByTestId(body, 'download-bar-start-page');
    const endNumberInput = getByTestId(body, 'download-bar-end-page');

    userEvent.type(startNumberInput, '1');
    userEvent.type(endNumberInput, '1');

    const spyConsole = jest.spyOn(console, 'log');

    const downloadBtn = getByTestId(body, 'download-bar-button');

    userEvent.click(downloadBtn);
    await waitFor(() => expect(spyConsole).toBeCalledWith('소요 시간 : 0초'));
  });

  it('searches keyword', async () => {
    const { body, header } = set();

    expect(header).toBeInTheDocument();

    const keywordRadioBtn = getByTestId(body, 'search-type-keyword');

    userEvent.click(keywordRadioBtn);

    const searchBarKeyword = getByTestId(body, 'search-bar-input');

    expect(searchBarKeyword).toBeInTheDocument();

    let searchBtn = getByTestId(body, 'search-bar-btn');

    userEvent.click(searchBtn);
    userEvent.type(searchBarKeyword, 'vitamin');

    searchBtn = getByTestId(body, 'search-bar-btn');

    userEvent.click(searchBtn);

    const searchResultWord = await findByText(body, '검색어 : vitamin');
    const searchLastPageNum = await findByText(body, `마지막 페이지 : 417`);

    expect(searchResultWord).toBeInTheDocument();
    expect(searchLastPageNum).toBeInTheDocument();

    const startNumberInput = getByTestId(body, 'download-bar-start-page');
    const endNumberInput = getByTestId(body, 'download-bar-end-page');

    userEvent.type(startNumberInput, '1');
    expect(startNumberInput).toHaveValue('1');
    userEvent.type(endNumberInput, '2');
    expect(endNumberInput).toHaveValue('2');

    const spyConsole = jest.spyOn(console, 'log');
    const downloadBtn = getByTestId(body, 'download-bar-button');

    userEvent.click(downloadBtn);
    await waitFor(() => expect(spyConsole).toBeCalledWith('소요 시간 : 0초'));
  });
});
