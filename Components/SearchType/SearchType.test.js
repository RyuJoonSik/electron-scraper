import {screen} from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import 검색_유형 from './SearchType';

describe('검색_유형 컴포넌트', () => {
  function 초기화(속성 = {}) {
    const {body: 부모} = document;
    const 컴포넌트 = new 검색_유형(부모, 속성);
    컴포넌트.렌더();

    return 컴포넌트;
  }

  it("'키워드' 라디오 버튼(input + label) 존재", () => {
    const 컴포넌트 = 초기화();
    const 키워드_버튼 = screen.getByTestId('search-type-keyword');
    const 키워드_라벨 = screen.getByTestId('search-type-keyword-label');

    expect(키워드_버튼).toBeInTheDocument();
    expect(키워드_라벨).toBeInTheDocument();
    expect(키워드_라벨).toHaveTextContent('키워드');
  });

  it("'브랜드' 라디오 버튼(input + label) 존재", () => {
    const 컴포넌트 = 초기화();
    const 브랜드_버튼 = screen.getByTestId('search-type-brand');
    const 브랜드_라벨 = screen.getByTestId('search-type-brand-label');

    expect(브랜드_버튼).toBeInTheDocument();
    expect(브랜드_라벨).toBeInTheDocument();
    expect(브랜드_라벨).toHaveTextContent('브랜드');
  });

  // it("컴포넌트 클릭 시 속성 중 '검색_유형_변경' 메서드 호출", () => {
  //   const 속성 = {
  //     검색_유형_변경: jest.fn()
  //   };
  //   const 컴포넌트 = 초기화(속성);
  //   const 컴포넌트_컨테이너 = screen.getByTestId('search-type');
  //   const 검색_유형_변경_스파이 = jest.spyOn(속성, '검색_유형_변경');

  //   userEvent.click(컴포넌트_컨테이너);
  //   expect(검색_유형_변경_스파이).toBeCalled();
  // });

  // function set(props = {}) {
  //   const {body} = document;
  //   const component = new 검색_유형(body, props);

  //   component.렌더();

  //   const inputBrand = getByTestId(body, 'search-type-brand');
  //   const inputKeyword = getByTestId(body, 'search-type-keyword');
  //   const labelBrand = getByTestId(body, 'search-type-brand-label');
  //   const labelKeyword = getByTestId(body, 'search-type-keyword-label');

  //   return {
  //     inputBrand,
  //     inputKeyword,
  //     labelBrand,
  //     labelKeyword
  //   };
  // }

  // it('has inputs', async () => {
  //   const props = {
  //     유형_변경: jest.fn(),
  //     유형: 'keyword',
  //   };
  //   const { inputBrand, inputKeyword } = set(props);

  //   expect(inputBrand).toBeInTheDocument();
  //   expect(inputKeyword).toBeInTheDocument();
  //   expect(inputKeyword).toBeChecked();

  //   userEvent.click(inputBrand);
  //   expect(inputBrand).toBeChecked();
  //   expect(inputKeyword).not.toBeChecked();
  // });

  // it('has labels', () => {
  //   const props = {
  //     유형_변경: jest.fn(),
  //     유형: 'keyword',
  //   };
  //   const { inputBrand, inputKeyword, labelBrand, labelKeyword } = set(props);

  //   expect(labelBrand).toBeInTheDocument();
  //   expect(labelKeyword).toBeInTheDocument();

  //   userEvent.click(labelBrand);
  //   expect(inputBrand).toBeChecked();
  //   expect(inputKeyword).not.toBeChecked();
  // });

  // it('has click event', () => {
  //   const props = {
  //     유형_변경: jest.fn(),
  //     유형: 'keyword',
  //   };
  //   const { labelBrand, labelKeyword } = set(props);
  //   const spy = jest.spyOn(props, '유형_변경');

  //   userEvent.click(labelKeyword);
  //   expect(spy).toBeCalled();
  //   userEvent.click(labelBrand);
  //   expect(spy).toBeCalled();
  // });
});
