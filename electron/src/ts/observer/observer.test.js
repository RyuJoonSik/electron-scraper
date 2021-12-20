import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import 컴포넌트 from '../../components/ObserverComponent/Component';
import { store } from '../../ts/store/store';
class 임시_컴포넌트 extends 컴포넌트 {
    // protected 상태_생성(): 문자열_프로퍼티_객체 {
    //   return {type: 'component'};
    // }
    부모_컴포넌트에_HTML_추가() {
        const { 부모, 상태 } = this;
        const { state } = store;
        // console.log(state.a);
        부모.innerHTML = `
      <div data-testid="component">
        ${state.a}
        <div data-testid="child-container"></div>
      </div>
    `;
    }
    태그_속성_초기화() {
        const [DIV_태그] = this.부모.getElementsByTagName('div');
        DIV_태그.setAttribute('title', 'DIV 태그 입니다.');
    }
    이벤트_설정() {
        const [DIV_태그] = this.부모.getElementsByTagName('div');
        DIV_태그.addEventListener('click', () => {
            console.log('클릭 이벤트 입니다.');
        });
    }
}
class 자식_컴포넌트 extends 컴포넌트 {
    부모_컴포넌트에_HTML_추가() {
        const { 부모 } = this;
        부모.innerHTML = `
        <div data-testid="child-component"></div>
    `;
    }
}
function 컴포넌트_생성(속성 = {}) {
    const { body: 부모 } = document;
    const 새_컴포넌트 = new 임시_컴포넌트(부모, 속성);
    return 새_컴포넌트;
}
describe('옵저버 패턴 테스트', () => {
    it('중앙 제어', () => {
        const 새_컴포넌트 = 컴포넌트_생성();
        // console.log(새_컴포넌트.상태);
        store.setState({ a: 100 });
        let DIV = screen.getByTestId('component');
        console.log(DIV.textContent);
        // expect(DIV).toHaveTextContent('10');
    });
    // it('컴포넌트 생성 시 상태 초기화', () => {
    //   const 새_컴포넌트 = 컴포넌트_생성();
    //   expect(새_컴포넌트.상태).toEqual({type: 'component'});
    // });
    // it("상태가 변하면 '렌더' 메서드를 호출한다.", () => {
    //   const 새_컴포넌트 = 컴포넌트_생성() as any;
    //   const {상태} = 새_컴포넌트;
    //   const 랜더 = jest.fn();
    //   const 스파이 = jest.spyOn(새_컴포넌트.렌더, 'bind').mockReturnValue(랜더);
    //   상태.type = 'observer';
    //   expect(랜더).toBeCalled();
    //   스파이.mockRestore();
    // });
    // it('상태에 따라 HTML이 변한다.', () => {
    //   const 새_컴포넌트 = 컴포넌트_생성() as any;
    //   const {상태} = 새_컴포넌트;
    //   let DIV = screen.getByTestId('component');
    //   expect(DIV).toHaveTextContent('component');
    //   상태.type = 'observer';
    //   DIV = screen.getByTestId('component');
    //   expect(DIV).toHaveTextContent('observer');
    //   상태.type = 'pattern';
    //   DIV = screen.getByTestId('component');
    //   expect(DIV).toHaveTextContent('pattern');
    // });
});
