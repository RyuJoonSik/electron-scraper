import {screen} from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import 브랜드_검색바 from './BrandSearchBar';

describe('브랜드_검색바', () => {
  function 초기화(props = {}) {
    const {body: 부모} = document;
    const 브랜드_검색바_컴포넌트 = new 브랜드_검색바(부모, props);

    브랜드_검색바_컴포넌트.렌더();

    const 브랜드_셀렉트 = screen.getByTestId('search-bar-select');
    const 브랜드_옵션_배열 = screen.getAllByTestId('search-bar-option');

    return {
      브랜드_검색바_컴포넌트,
      브랜드_셀렉트,
      브랜드_옵션_배열
    };
  }

  function 검색_버튼_탐색() {
    const 검색_버튼 = screen.getByTestId('search-btn');

    return 검색_버튼;
  }

  it('옵션 태그(브랜드명)들을 자식으로 가질 브랜드_셀렉트 태그가 있다.', () => {
    const {브랜드_셀렉트} = 초기화();

    expect(브랜드_셀렉트).toBeInTheDocument();
  });

  it('브랜드 수만큼의 옵션 태그들이 있다.', () => {
    const {브랜드_옵션_배열} = 초기화();

    브랜드_옵션_배열.forEach((옵션) => {
      expect(옵션).toBeInTheDocument();
    });
    expect(브랜드_옵션_배열).toHaveLength(59);
  });

  it("브랜드(옵션 태그)를 변경하면 상태['검색어'] 값이 바뀐다.", () => {
    const {
      브랜드_셀렉트,
      브랜드_옵션_배열: [, 두번째_브랜드],
      브랜드_검색바_컴포넌트
    } = 초기화();
    const {value: 브랜드} = 두번째_브랜드;
    const {
      상태: {검색어}
    } = 브랜드_검색바_컴포넌트;
    const 검색어_기본값 = '21st-century-health-care';

    expect(검색어).toBe(검색어_기본값);
    userEvent.selectOptions(브랜드_셀렉트, 브랜드);

    const {
      상태: {검색어: 변경된_검색어}
    } = 브랜드_검색바_컴포넌트;

    expect(변경된_검색어).toBe(브랜드);
  });

  it("상태['검색어'] 값과 value값이 일치하는 옵션 태그의 selected를 true로 바꾼다.", () => {
    const {
      브랜드_셀렉트,
      브랜드_옵션_배열: [첫번째_브랜드, 두번째_브랜드]
    } = 초기화();

    expect(첫번째_브랜드.selected).toBe(true);
    expect(두번째_브랜드.selected).toBe(false);

    const {value: 변경된_브랜드} = 두번째_브랜드;

    userEvent.selectOptions(브랜드_셀렉트, 변경된_브랜드);
    expect(첫번째_브랜드.selected).toBe(false);
    expect(두번째_브랜드.selected).toBe(true);
  });

  it("'검색_버튼' 컴포넌트가 있다.", () => {
    const 검색_버튼 = 검색_버튼_탐색();

    expect(검색_버튼).toBeInTheDocument();
  });

  it("'검색_버튼' 컴포넌트에 속성['검색']을 속성으로 넘겨준다.", () => {
    const 속성 = {
      검색: jest.fn()
    };
    const {
      브랜드_검색바_컴포넌트,
      브랜드_셀렉트,
      브랜드_옵션_배열: [, 두번째_브랜드]
    } = 초기화(속성);
    const {상태} = 브랜드_검색바_컴포넌트;
    const {검색어} = 상태;
    const 검색_스파이 = jest.spyOn(속성, '검색');
    const 검색_버튼 = 검색_버튼_탐색();
    const URL_접두사 = `https://kr.iherb.com/c/`;

    userEvent.click(검색_버튼);
    expect(검색_스파이).toBeCalledWith(URL_접두사, 검색어);

    const {value: 변경된_브랜드} = 두번째_브랜드;

    userEvent.selectOptions(브랜드_셀렉트, 변경된_브랜드);

    const 새_검색_버튼 = 검색_버튼_탐색();
    const {검색어: 변경된_검색어} = 상태;
    const 변경된_URL_접두사 = `https://kr.iherb.com/c/`;

    userEvent.click(새_검색_버튼);
    expect(검색_스파이).toBeCalledWith(변경된_URL_접두사, 변경된_검색어);
  });
});
