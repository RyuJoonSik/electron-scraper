import {screen} from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import 검색_유형 from './검색_유형';

describe('검색_유형 컴포넌트', () => {
  function 초기화(속성 = {검색_유형: 'keyword'}) {
    const {body: 부모} = document;
    const 검색_유형_컴포넌트 = new 검색_유형(부모, 속성);

    검색_유형_컴포넌트.렌더();

    const 브랜드_라디오_버튼 = screen.getByTestId('search-type-brand');
    const 브랜드_라디오_버튼_라벨 = screen.getByTestId('search-type-brand-label');
    const 키워드_라디오_버튼 = screen.getByTestId('search-type-keyword');
    const 키워드_라디오_버튼_라벨 = screen.getByTestId('search-type-keyword-label');

    return {브랜드_라디오_버튼, 브랜드_라디오_버튼_라벨, 키워드_라디오_버튼, 키워드_라디오_버튼_라벨};
  }

  it("'키워드' 라디오 버튼(input + label 태그)를 갖고있다", () => {
    const {키워드_라디오_버튼, 키워드_라디오_버튼_라벨} = 초기화();

    expect(키워드_라디오_버튼).toBeInTheDocument();
    expect(키워드_라디오_버튼_라벨).toBeInTheDocument();
    expect(키워드_라디오_버튼_라벨).toHaveTextContent('키워드');
  });

  it("'브랜드' 라디오 버튼(input + label 태그)를 갖고있다", () => {
    const {브랜드_라디오_버튼, 브랜드_라디오_버튼_라벨} = 초기화();

    expect(브랜드_라디오_버튼).toBeInTheDocument();
    expect(브랜드_라디오_버튼_라벨).toBeInTheDocument();
    expect(브랜드_라디오_버튼_라벨).toHaveTextContent('브랜드');
  });

  it("브랜드 버튼과 키워드 버튼의 value 값 중 속성['검색_유형']값과 일치하는 버튼을 체크한다. ", () => {
    const 검색_유형 = 'keyword';
    const 속성 = {
      검색_유형
    };
    const {키워드_라디오_버튼, 브랜드_라디오_버튼} = 초기화(속성);

    expect(키워드_라디오_버튼.checked).toBe(true);
    expect(브랜드_라디오_버튼.checked).toBe(false);

    const 변경된_검색_유형 = 'brand';
    const 변경된_속성 = {
      검색_유형: 변경된_검색_유형
    };
    const {키워드_라디오_버튼: 변경된_키워드_라디오_버튼, 브랜드_라디오_버튼: 변경된_브랜드_라디오_버튼} =
      초기화(변경된_속성);

    expect(변경된_키워드_라디오_버튼.checked).toBe(false);
    expect(변경된_브랜드_라디오_버튼.checked).toBe(true);
  });

  it("키워드 버튼 클릭 시 속성['검색_유형_변경']를 호출한다", () => {
    const 속성 = {
      검색_유형: 'keyword',
      검색_유형_변경: jest.fn()
    };
    const {키워드_라디오_버튼, 키워드_라디오_버튼_라벨} = 초기화(속성);
    const 검색_유형_변경_스파이 = jest.spyOn(속성, '검색_유형_변경');
    const {value: 검색_유형} = 키워드_라디오_버튼;

    userEvent.click(키워드_라디오_버튼);
    expect(검색_유형_변경_스파이).toBeCalledWith(검색_유형);
    userEvent.click(키워드_라디오_버튼_라벨);
    expect(검색_유형_변경_스파이).toBeCalledWith(검색_유형);
  });

  it("브랜드 버튼 클릭 시 속성['검색_유형_변경']를 호출한다", () => {
    const 속성 = {
      검색_유형: 'keyword',
      검색_유형_변경: jest.fn()
    };
    const {브랜드_라디오_버튼, 브랜드_라디오_버튼_라벨} = 초기화(속성);
    const 검색_유형_변경_스파이 = jest.spyOn(속성, '검색_유형_변경');
    const {value: 검색_유형} = 브랜드_라디오_버튼;

    userEvent.click(브랜드_라디오_버튼);
    expect(검색_유형_변경_스파이).toBeCalledWith(검색_유형);
    userEvent.click(브랜드_라디오_버튼_라벨);
    expect(검색_유형_변경_스파이).toBeCalledWith(검색_유형);
  });
});
