import {screen} from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import 검색_버튼 from './검색_버튼';

describe('검색_버튼', () => {
  function 초기화(속성 = {}) {
    const {body: 부모} = document;
    const 검색_버튼_컴포넌트 = new 검색_버튼(부모, 속성);

    검색_버튼_컴포넌트.렌더();

    const 버튼 = screen.getByTestId('search-btn');

    return {버튼};
  }

  it('button 태그(검색 버튼)가 있다.', () => {
    const {버튼} = 초기화();

    expect(버튼).toBeInTheDocument();
  });

  it("button 태그(검색 버튼)를 클릭하면 속성['검색']이 호출된다.", () => {
    const 검색어 = 'vitamin';
    const 검색_유형 = 'keyword';
    const 속성 = {
      검색어,
      검색_유형,
      검색: jest.fn()
    };
    const {버튼} = 초기화(속성);
    const 검색_스파이 = jest.spyOn(속성, '검색');
    const URL_접두사 = `https://kr.iherb.com/search?kw=`;

    userEvent.click(버튼);
    expect(검색_스파이).toBeCalledWith(URL_접두사, 검색어);
  });

  it("속성['검색_유형']에 따라 URL 접두사가 변한다.", () => {
    const 검색_유형 = 'keyword';
    const 검색어 = 'vitamin';
    const 속성 = {
      검색어,
      검색_유형,
      검색: jest.fn()
    };
    const URL_접두사 = `https://kr.iherb.com/search?kw=`;
    const {버튼} = 초기화(속성);
    const 검색_스파이 = jest.spyOn(속성, '검색');

    userEvent.click(버튼);
    expect(검색_스파이).toBeCalledWith(URL_접두사, 검색어);
  });
});
