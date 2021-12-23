"use strict";
// import '@testing-library/jest-dom';
// import {screen} from '@testing-library/dom';
// import userEvent from '@testing-library/user-event';
// import 컴포넌트 from './Component';
// // import {스토어} from '../store/store';
// interface 문자열_프로퍼티_객체 {
//   readonly [키: string]: any;
// }
// class 임시_컴포넌트 extends 컴포넌트 {
//   부모_컴포넌트에_HTML_추가() {
//     const {부모} = this;
//     const 상태: 문자열_프로퍼티_객체 = 스토어.상태_조회();
//     부모.innerHTML = `
//       <div data-testid="component">
//         <p data-testid="state-a">${상태.a}</p>
//         <p data-testid="state-b">${상태.b}</p>
//         <div data-testid="child-container"></div>
//       </div>
//     `;
//   }
//   태그_속성_초기화(): void {
//     const [DIV_태그] = this.부모.getElementsByTagName('div');
//     DIV_태그.setAttribute('title', 'DIV 태그 입니다.');
//   }
//   이벤트_설정(): void {
//     const [DIV_태그] = this.부모.getElementsByTagName('div');
//     DIV_태그.addEventListener('click', () => {
//       console.log('클릭 이벤트 입니다.');
//     });
//     const [상태_태그1, 상태_태그2] = this.부모.getElementsByTagName('p');
//     상태_태그1.addEventListener('click', () => {
//       // 스토어.상태_변경({a: 100});
//     });
//     상태_태그2.addEventListener('click', () => {
//       // 스토어.상태_변경({b: 200});
//     });
//   }
//   자식_생성(): void {
//     this.자식_컴포넌트_생성();
//   }
//   자식_컴포넌트_생성(): void {
//     const DIV_태그 = this.부모.querySelector('div div') as HTMLElement;
//     const 자식 = new 자식_컴포넌트(DIV_태그);
//     자식.렌더();
//   }
// }
// class 자식_컴포넌트 extends 컴포넌트 {
//   부모_컴포넌트에_HTML_추가() {
//     const {부모} = this;
//     const 상태: 문자열_프로퍼티_객체 = 스토어.상태_조회();
//     부모.innerHTML = `
//         <div data-testid="child-component">${상태.a}</div>
//     `;
//   }
//   이벤트_설정(): void {
//     const [DIV_태그] = this.부모.getElementsByTagName('div');
//     DIV_태그.addEventListener('click', () => {
//       // 스토어.상태_변경({a: 1000});
//     });
//   }
// }
// function BODY_초기화() {
//   document.body.innerHTML = '';
//   return document;
// }
// function 컴포넌트_생성(속성 = {}) {
//   const {body: 부모} = BODY_초기화();
//   const 새_컴포넌트 = new 임시_컴포넌트(부모, 속성);
//   return 새_컴포넌트;
// }
// describe('컴포넌트 클래스', () => {
//   it('프로퍼티들을 갖고 있다', () => {
//     const 컴포넌트 = 컴포넌트_생성();
//     expect(컴포넌트).toHaveProperty('부모');
//     expect(컴포넌트).toHaveProperty('속성');
//     expect(컴포넌트).toHaveProperty('상태');
//   });
//   it("객체 생성 시 '상태_초기화' 메서드를 호출한다.", () => {
//     const 컴포넌트 = 컴포넌트_생성();
//     const {상태} = 컴포넌트;
//     expect(상태).toEqual({});
//   });
//   it("'렌더' 메서드가 있다.", () => {
//     const 컴포넌트 = 컴포넌트_생성();
//     const 렌더_스파이 = jest.spyOn(컴포넌트, '렌더');
//     컴포넌트.렌더();
//     expect(렌더_스파이).toBeCalled();
//   });
//   it("'렌더' 메서드는 '부모_컴포넌트에_HTML_추가' 메서드를 호출한다.", () => {
//     const 컴포넌트 = 컴포넌트_생성() as any;
//     const 부모_컴포넌트에_HTML_추가_스파이 = jest.spyOn(컴포넌트, '부모_컴포넌트에_HTML_추가');
//     컴포넌트.렌더();
//     expect(부모_컴포넌트에_HTML_추가_스파이).toBeCalled();
//   });
//   it("'부모_컴포넌트에_HTML_추가' 메서드는 부모 컴포넌트에 HTML을 추가한다.", () => {
//     const 컴포넌트 = 컴포넌트_생성() as any;
//     컴포넌트.렌더();
//     const 컴포넌트_태그 = screen.getByTestId('component');
//     expect(컴포넌트_태그).toBeInTheDocument();
//   });
//   it("'렌더' 메서드는 '태그_속성_초기화' 메서드를 호출한다.", () => {
//     const 컴포넌트 = 컴포넌트_생성() as any;
//     const 태그_속성_초기화_스파이 = jest.spyOn(컴포넌트, '태그_속성_초기화');
//     컴포넌트.렌더();
//     expect(태그_속성_초기화_스파이).toBeCalled();
//   });
//   it("'태그_속성_초기화' 메서드는 태그의 속성들을 초기화한다..", () => {
//     const 컴포넌트 = 컴포넌트_생성() as any;
//     컴포넌트.렌더();
//     const DIV_태그 = screen.getByTestId('component');
//     const 어트리뷰트 = 'title';
//     const 값 = 'DIV 태그 입니다.';
//     expect(DIV_태그).toHaveAttribute(어트리뷰트, 값);
//   });
//   it("'렌더' 메서드는 '이벤트_설정' 메서드를 호출한다.", () => {
//     const 컴포넌트 = 컴포넌트_생성() as any;
//     const 이벤트_설정_스파이 = jest.spyOn(컴포넌트, '이벤트_설정');
//     컴포넌트.렌더();
//     expect(이벤트_설정_스파이).toBeCalled();
//   });
//   it("'이벤트_설정' 메서드는 태그에 이벤트를 설정한다.", () => {
//     const 컴포넌트 = 컴포넌트_생성() as any;
//     컴포넌트.렌더();
//     const DIV_태그 = screen.getByTestId('component');
//     const 콘솔_스파이 = jest.spyOn(console, 'log');
//     userEvent.click(DIV_태그);
//     expect(콘솔_스파이).toBeCalledWith('클릭 이벤트 입니다.');
//   });
//   it("'렌더' 메서드는 '자식_생성' 메서드를 호출한다.", () => {
//     const 컴포넌트 = 컴포넌트_생성() as any;
//     const 자식_생성_스파이 = jest.spyOn(컴포넌트, '자식_생성');
//     컴포넌트.렌더();
//     expect(자식_생성_스파이).toBeCalled();
//   });
//   it("'자식_생성' 메서드는 자식 컴포넌트들을 렌더링한다.", () => {
//     const 컴포넌트 = 컴포넌트_생성() as any;
//     컴포넌트.렌더();
//     const 자식 = screen.getByTestId('child-component');
//     expect(자식).toBeInTheDocument();
//   });
//   it("'상태_변경' 메서드는 컴포넌트의 상태를 바꾼다.", () => {
//     const 컴포넌트 = 컴포넌트_생성() as any;
//     const 상태 = {type: 'component', test: 'jest'};
//     컴포넌트.상태_변경(상태);
//     expect(컴포넌트.상태).toEqual(상태);
//   });
//   it("'상태_변경' 메서드는 '렌더' 메서드를 호출한다.", () => {
//     const 컴포넌트 = 컴포넌트_생성() as any;
//     const 상태 = {type: 'component', test: 'jest'};
//     const 렌더_스파이 = jest.spyOn(컴포넌트, '렌더');
//     컴포넌트.상태_변경(상태);
//     expect(렌더_스파이).toBeCalled();
//   });
//   it('전역 상태를 읽어 온다.', () => {
//     const 컴포넌트 = 컴포넌트_생성();
//     컴포넌트.렌더();
//     console.log(document.body.innerHTML);
//     // const 상태_태그1 = screen.getByTestId('state-a');
//     // const 상태_태그2 = screen.getByTestId('state-b');
//     // expect(상태_태그1).toHaveTextContent('10');
//     // expect(상태_태그2).toHaveTextContent('20');
//   });
//   // it("전역 상태를 바꿀때마다 '렌더' 메서드를 호출한다.", () => {
//   //   const 컴포넌트 = 컴포넌트_생성();
//   //   컴포넌트.렌더();
//   //   let 상태_태그1 = screen.getByTestId('state-a');
//   //   expect(상태_태그1).toHaveTextContent('10');
//   //   userEvent.click(상태_태그1);
//   //   상태_태그1 = screen.getByTestId('state-a');
//   //   expect(상태_태그1).toHaveTextContent('100');
//   //   let 상태_태그2 = screen.getByTestId('state-b');
//   //   expect(상태_태그2).toHaveTextContent('20');
//   //   userEvent.click(상태_태그2);
//   //   상태_태그2 = screen.getByTestId('state-b');
//   //   expect(상태_태그2).toHaveTextContent('200');
//   //   let 자식_태그 = screen.getByTestId('child-component');
//   //   expect(자식_태그).toHaveTextContent('100');
//   //   userEvent.click(자식_태그);
//   //   자식_태그 = screen.getByTestId('child-component');
//   //   expect(자식_태그).toHaveTextContent('1000');
//   // });
// });
