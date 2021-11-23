import 다운로드_바 from './DownloadBar';
import { getByTestId } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('다운로드_바', () => {
  function set(props = {}) {
    const { body } = document;
    const component = new 다운로드_바(body, props);

    component.렌더();

    const inputStartPage = getByTestId(body, 'download-bar-start-page');
    const inputEndPage = getByTestId(body, 'download-bar-end-page');
    const downloadBtn = getByTestId(body, 'download-bar-button');

    return {
      inputStartPage,
      inputEndPage,
      downloadBtn,
    };
  }

  it('has input, button', () => {
    const { inputStartPage, inputEndPage, downloadBtn } = set();

    expect(inputStartPage).toBeInTheDocument();
    expect(inputEndPage).toBeInTheDocument();
    expect(downloadBtn).toBeInTheDocument();
  });

  it('has onDownload', () => {
    const props = {
      다운로드: jest.fn(),
    };
    const { inputStartPage, inputEndPage, downloadBtn } = set(props);
    const spy = jest.spyOn(props, '다운로드');
    const startPageNum = '1';
    const endPageNum = '10';

    userEvent.type(inputStartPage, startPageNum);
    userEvent.type(inputEndPage, endPageNum);
    userEvent.click(downloadBtn);

    expect(spy).toBeCalledWith(startPageNum, endPageNum);
  });
});
