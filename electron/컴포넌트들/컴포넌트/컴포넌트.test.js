import 컴포넌트 from './컴포넌트';

describe('컴포넌트 클래스', () => {
  function 초기화(속성 = {}) {
    const {body: 부모} = document;
    const 새_컴포넌트 = new 컴포넌트(부모, 속성);

    return 새_컴포넌트;
  }

  it("'부모', '속성', '상태' 프로퍼티들을 갖고 있다", () => {
    const {body: 부모} = document;
    const 새_컴포넌트 = new 컴포넌트(부모);

    expect(새_컴포넌트).toHaveProperty('부모');
    expect(새_컴포넌트).toHaveProperty('속성');
    expect(새_컴포넌트).toHaveProperty('상태');
  });

  it("'렌더' 메서드 호출 시 'HTML_추가', '태그_속성_초기화', '이벤트_설정', '자식_렌더' 순으로 메서드들을 호출시킨다", () => {
    const 컴포넌트 = 초기화();
    const HTML_추가_스파이 = jest.spyOn(컴포넌트, 'HTML_추가');
    const 태그_속성_초기화_스파이 = jest.spyOn(컴포넌트, '태그_속성_초기화');
    const 이벤트_설정_스파이 = jest.spyOn(컴포넌트, '이벤트_설정');
    const 자식_렌더_스파이 = jest.spyOn(컴포넌트, '자식_렌더');

    컴포넌트.렌더();

    expect(HTML_추가_스파이).toBeCalled();
    expect(태그_속성_초기화_스파이).toBeCalled();
    expect(이벤트_설정_스파이).toBeCalled();
    expect(자식_렌더_스파이).toBeCalled();
  });

  // it("'자식_렌더' 호출 시 '자식_생성' 메서드를 호출시킨다", () => {
  //   const 컴포넌트 = 초기화();
  //   const 자식_생성_스파이 = jest.spyOn(컴포넌트, '자식_생성');

  //   컴포넌트.렌더();

  //   expect(자식_생성_스파이).toBeCalled();
  // });

  it("'상태_설정' 메서드로 컴포넌트의 '상태' 프로퍼티를 변경한다", () => {
    const 컴포넌트 = 초기화();
    expect(컴포넌트.상태).toEqual({});

    const 새_상태 = {hello: 'worlds'};
    컴포넌트.상태_변경(새_상태);
    expect(컴포넌트.상태).toEqual(새_상태);
  });
});
