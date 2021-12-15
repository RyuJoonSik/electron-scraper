import 컴포넌트 from './Component';
class 임시_컴포넌트 extends 컴포넌트 {
    상태_초기화() {
        this.상태 = { type: 'component' };
    }
    부모_컴포넌트에_HTML_추가() {
        const { 부모 } = this;
        // 부모.
    }
}
function 컴포넌트_생성(속성 = {}) {
    console.log('hi');
    const { body: 부모 } = document;
    const 새_컴포넌트 = new 임시_컴포넌트(부모, 속성);
    return 새_컴포넌트;
}
// interface 속성_인터페이스 {
//   hi: string;
// }
// const 속성: 속성_인터페이스 = {hi: 'hello'};
// const 임시 = new 임시_컴포넌트(document.createElement('div'), 속성);
// console.log(임시.상태);
// 임시.상태 = {hi: 'hello'};
// console.log(임시.상태);
describe('컴포넌트 클래스', () => {
    it('프로퍼티들을 갖고 있다', () => {
        const 컴포넌트 = 컴포넌트_생성();
        expect(컴포넌트).toHaveProperty('부모');
        expect(컴포넌트).toHaveProperty('속성');
        expect(컴포넌트).toHaveProperty('상태');
    });
    it("객체 생성 시 '상태_초기화' 메서드를 호출한다.", () => {
        const 컴포넌트 = 컴포넌트_생성();
        const { 상태 } = 컴포넌트;
        expect(상태).toEqual({ type: 'component' });
    });
    it("'렌더' 메서드가 있다.", () => {
        const 컴포넌트 = 컴포넌트_생성();
        const 렌더_스파이 = jest.spyOn(컴포넌트, '렌더');
        컴포넌트.렌더();
        expect(렌더_스파이).toBeCalled();
    });
    it("'렌더' 메서드는 '부모_컴포넌트에_HTML_추가' 메서드를 호출한다.", () => {
        const 컴포넌트 = 컴포넌트_생성();
        const 부모_컴포넌트에_HTML_추가_스파이 = jest.spyOn(컴포넌트, '부모_컴포넌트에_HTML_추가');
        컴포넌트.렌더();
        expect(부모_컴포넌트에_HTML_추가_스파이).toBeCalled();
    });
    it("'부모_컴포넌트에_HTML_추가' 메서드는 부모 컴포넌트에 HTML을 추가한다.", () => {
        const 컴포넌트 = 컴포넌트_생성();
        const 부모_컴포넌트에_HTML_추가_스파이 = jest.spyOn(컴포넌트, '부모_컴포넌트에_HTML_추가');
        컴포넌트.렌더();
    });
    // it("'렌더' 메서드는 'HTML_추가' 메서드를 호출한다.", () => {
    //   const 컴포넌트 = 컴포넌트_생성() as any;
    //   const HTML_추가_스파이 = jest.spyOn(컴포넌트, 'HTML_추가');
    //   컴포넌트.렌더();
    //   expect(HTML_추가_스파이).toBeCalled();
    // });
    //   it("'렌더' 메서드 호출 시 'HTML_추가', '태그_속성_초기화', '이벤트_설정', '자식_렌더' 순으로 메서드들을 호출시킨다", () => {
    //     const 컴포넌트 = 초기화();
    //     const HTML_추가_스파이 = jest.spyOn(컴포넌트, 'HTML_추가');
    //     const 태그_속성_초기화_스파이 = jest.spyOn(컴포넌트, '태그_속성_초기화');
    //     const 이벤트_설정_스파이 = jest.spyOn(컴포넌트, '이벤트_설정');
    //     const 자식_렌더_스파이 = jest.spyOn(컴포넌트, '자식_렌더');
    //     컴포넌트.렌더();
    //     expect(HTML_추가_스파이).toBeCalled();
    //     expect(태그_속성_초기화_스파이).toBeCalled();
    //     expect(이벤트_설정_스파이).toBeCalled();
    //     expect(자식_렌더_스파이).toBeCalled();
    //   });
    // it("'자식_렌더' 호출 시 '자식_생성' 메서드를 호출시킨다", () => {
    //   const 컴포넌트 = 초기화();
    //   const 자식_생성_스파이 = jest.spyOn(컴포넌트, '자식_생성');
    //   컴포넌트.렌더();
    //   expect(자식_생성_스파이).toBeCalled();
    // });
    // it("'상태_설정' 메서드로 컴포넌트의 '상태' 프로퍼티를 변경한다", () => {
    //   const 컴포넌트 = 초기화();
    //   expect(컴포넌트.상태).toEqual({});
    //   const 새_상태 = {hello: 'worlds'};
    //   컴포넌트.상태_변경(새_상태);
    //   expect(컴포넌트.상태).toEqual(새_상태);
    // });
});
