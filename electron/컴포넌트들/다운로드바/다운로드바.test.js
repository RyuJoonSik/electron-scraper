import {screen} from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import 다운로드_바 from './다운로드바';

describe('다운로드_바', () => {
  function 초기화(속성 = {}) {
    const {body: 부모} = document;
    const 컴포넌트 = new 다운로드_바(부모, 속성);

    컴포넌트.렌더();

    const 시작_페이지_번호_인풋 = screen.getByTestId('download-bar-start-page');
    const 끝_페이지_번호_인풋 = screen.getByTestId('download-bar-end-page');
    const 다운로드_버튼 = screen.getByTestId('download-bar-button');

    return {
      시작_페이지_번호_인풋,
      끝_페이지_번호_인풋,
      다운로드_버튼
    };
  }

  it('시작 페이지 번호 태그(input)가 있다.', () => {
    const {시작_페이지_번호_인풋} = 초기화();

    expect(시작_페이지_번호_인풋).toBeInTheDocument();
  });

  it('끝 페이지 번호 태그(input)가 있다.', () => {
    const {끝_페이지_번호_인풋} = 초기화();

    expect(끝_페이지_번호_인풋).toBeInTheDocument();
  });

  it('다운로드 버튼(button)이 있다.', () => {
    const {다운로드_버튼} = 초기화();

    expect(다운로드_버튼).toBeInTheDocument();
  });

  it("다운로드 버튼(button)을 클릭하면 속성['다운로드']을 호출한다.", () => {
    const 속성 = {
      다운로드: jest.fn()
    };
    const {다운로드_버튼} = 초기화(속성);
    const 다운로드_스파이 = jest.spyOn(속성, '다운로드');

    userEvent.click(다운로드_버튼);
    expect(다운로드_스파이).toBeCalled();
  });

  it("다운로드 버튼(button)을 클릭하면 속성['다운로드']을 호출한다.", () => {
    const 속성 = {
      다운로드: jest.fn()
    };
    const {다운로드_버튼} = 초기화(속성);
    const 다운로드_스파이 = jest.spyOn(속성, '다운로드');

    userEvent.click(다운로드_버튼);
    expect(다운로드_스파이).toBeCalled();
  });

  it("속성['다운로드']는 시작 페이지 번호 태그(input)값과 끝 페이지 번호 태그(input)값을 인수로 호출된다.", () => {
    const 속성 = {
      다운로드: jest.fn()
    };
    const {다운로드_버튼, 시작_페이지_번호_인풋, 끝_페이지_번호_인풋} = 초기화(속성);
    const 다운로드_스파이 = jest.spyOn(속성, '다운로드');
    const 시작_페이지_번호 = 1;
    const 끝_페이지_번호 = 10;

    userEvent.type(시작_페이지_번호_인풋, String(시작_페이지_번호));
    userEvent.type(끝_페이지_번호_인풋, String(끝_페이지_번호));
    userEvent.click(다운로드_버튼);
    expect(다운로드_스파이).toBeCalledWith(시작_페이지_번호, 끝_페이지_번호);

    const 바꾼_시작_페이지_번호 = 11;
    const 바꾼_끝_페이지_번호 = 20;
    const 백_스페이스 = '{backspace}';

    userEvent.type(시작_페이지_번호_인풋, 백_스페이스 + 바꾼_시작_페이지_번호);
    userEvent.type(끝_페이지_번호_인풋, 백_스페이스.repeat(2) + 바꾼_끝_페이지_번호);
    userEvent.click(다운로드_버튼);
    expect(다운로드_스파이).toBeCalledWith(바꾼_시작_페이지_번호, 바꾼_끝_페이지_번호);
  });
});
