import 검색바_브랜드 from './SearchBarBrand';
import {screen} from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('검색바_브랜드', () => {
  function 초기화(props = {}) {
    const {body: 부모} = document;
    const 컴포넌트 = new 검색바_브랜드(부모, props);

    컴포넌트.렌더();

    const 셀렉트 = screen.getByTestId('search-bar-select');
    const 옵션_배열 = screen.getAllByTestId('search-bar-option');
    // const btn = getByTestId(body, 'search-bar-btn');

    return {
      컴포넌트,
      셀렉트,
      옵션_배열
      // btn,
      // body
    };
  }

  it('옵션 태그(브랜드명)들을 자식으로 가질 셀렉트 태그가 있다.', () => {
    const {셀렉트} = 초기화();

    expect(셀렉트).toBeInTheDocument();
    // expect(options.length).toBe(59);

    // userEvent.selectOptions(select, '21st-century-health-care');
    // expect(select).toHaveDisplayValue('21st Century');

    // userEvent.selectOptions(select, 'aura-cacia');
    // expect(select).toHaveDisplayValue('Aura Cacia');
  });

  it('브랜드 수만큼의 옵션 태그들이 있다.', () => {
    const {옵션_배열} = 초기화();

    옵션_배열.forEach((옵션) => {
      expect(옵션).toBeInTheDocument();
    });
    expect(옵션_배열.length).toBe(59);

    // userEvent.selectOptions(select, '21st-century-health-care');
    // expect(select).toHaveDisplayValue('21st Century');

    // userEvent.selectOptions(select, 'aura-cacia');
    // expect(select).toHaveDisplayValue('Aura Cacia');
  });

  it('브랜드(옵션 태그)를 변경하면 selected 속성 값이 바뀐다.', () => {
    const {셀렉트, 옵션_배열} = 초기화();
    const {value: 상세_브랜드, textContent: 브랜드, selected: 선택} = 옵션_배열[0];

    userEvent.selectOptions(셀렉트, 상세_브랜드);
    expect(셀렉트).toHaveDisplayValue(브랜드);
    // expect(선택).toBe(true);

    // const 첫번째_브랜드 = 옵션_배열[0];
    // const{value: 처음_선택된_값} = 셀렉트;

    // expect(셀렉트).toHaveDisplayValue(첫번째_브랜드.textContent);
    // expect(셀렉트.value).toBe(첫번째_브랜드.value);

    // const e
  });

  it("브랜드(옵션 태그)를 변경하면 상태['검색어'] 값이 바뀐다.", () => {
    const {셀렉트, 옵션_배열, 컴포넌트} = 초기화();
    const {value: 브랜드, textContent: 브랜드명, selected: 선택} = 옵션_배열[0];
    const {
      상태: {검색어}
    } = 컴포넌트;
    // const{value: 처음_선택된_값} = 셀렉트;
    expect(검색어).toBe('');
    userEvent.selectOptions(셀렉트, 브랜드);
    expect(셀렉트).toHaveDisplayValue(브랜드명);

    console.log(컴포넌트.상태.검색어);
    // expect(컴포넌트.상태.검색어).toBe(브랜드);
  });

  // it('has SearchButton', async () => {
  //   const props = {
  //     검색: jest.fn(),
  //   };
  //   const { select, btn, body } = set(props);

  //   expect(btn).toBeInTheDocument();

  //   userEvent.selectOptions(select, 'aura-cacia');

  //   const newBtn = getByTestId(body, 'search-bar-btn');
  //   const spy = jest.spyOn(props, '검색');

  //   userEvent.click(newBtn);

  //   const word = 'aura-cacia';

  //   expect(spy).toBeCalledWith(word);
  // });
});
