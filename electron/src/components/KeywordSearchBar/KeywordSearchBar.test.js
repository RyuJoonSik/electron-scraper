import {screen} from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import 키워드_검색바 from './KeywordSearchBar';

describe('키워드_검색바', () => {
  function 초기화(속성 = {}) {
    const {body: 부모} = document;
    const 키워드_검색바_컴포넌트 = new 키워드_검색바(부모, 속성);

    키워드_검색바_컴포넌트.렌더();

    const 검색어_인풋 = screen.getByTestId('search-bar-input');
    const 검색_버튼 = screen.getByTestId('search-btn');

    return {
      키워드_검색바_컴포넌트,
      검색어_인풋,
      검색_버튼
    };
  }

  it('사용자의 입력값을 받는 검색어 태그(input)이 있다.', () => {
    const {검색어_인풋} = 초기화();

    expect(검색어_인풋).toBeInTheDocument();
  });

  it("상태['검색어']를 가지고 있다.", () => {
    const {키워드_검색바_컴포넌트} = 초기화();
    const {
      상태: {검색어}
    } = 키워드_검색바_컴포넌트;

    expect(검색어).toBe('');
  });

  it("사용자의 입력값에 따라 상태['검색어']값이 변한다.", () => {
    const {검색어_인풋, 키워드_검색바_컴포넌트} = 초기화();
    const {상태} = 키워드_검색바_컴포넌트;
    const {검색어} = 상태;

    expect(검색어_인풋).toHaveValue(검색어);
    userEvent.type(검색어_인풋, 'a');

    let 변경된_인풋 = screen.getByTestId('search-bar-input');
    const {상태: 변경된_상태} = 키워드_검색바_컴포넌트;
    const {검색어: 변경된_검색어} = 변경된_상태;

    expect(변경된_인풋).toHaveValue(변경된_검색어);
    userEvent.type(검색어_인풋, 'b');

    let 변경된_인풋2 = screen.getByTestId('search-bar-input');
    const {상태: 변경된_상태2} = 키워드_검색바_컴포넌트;
    const {검색어: 변경된_검색어2} = 변경된_상태2;

    expect(변경된_인풋2).toHaveValue(변경된_검색어2);
  });

  it("'검색_버튼' 컴포넌트가 있다.", () => {
    const 속성 = {
      검색: jest.fn(),
      검색_유형: 'keyword'
    };
    const 검색_스파이 = jest.spyOn(속성, '검색');
    const {검색_버튼, 검색어_인풋} = 초기화(속성);
    const 검색어 = 'vitamin';

    expect(검색_버튼).toBeInTheDocument();
    userEvent.type(검색어_인풋, 검색어);

    const 변경된_검색_버튼 = screen.getByTestId('search-btn');

    expect(변경된_검색_버튼).toBeInTheDocument();
    userEvent.click(변경된_검색_버튼);

    const URL_접두사 = `https://kr.iherb.com/search?kw=`;
    expect(검색_스파이).toBeCalledWith(URL_접두사, 검색어);
  });
});
