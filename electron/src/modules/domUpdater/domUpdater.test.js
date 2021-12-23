import 돔_업데이터 from './domUpdater';
import '@testing-library/jest-dom';
function 컴포넌트_생성(상태) {
    const HTML = `
    <div class="parent" title="This is parent.">
      ${상태.a}
      <div class="child1">
        ${상태.b}
        <div class="child2">
          ${상태.c}
        </div>
      </div>
      <div class="child3">
        ${상태.d}
        <div class="child4">
          ${상태.e}
          <div class="child5">
            ${상태.f}
          </div>
        </div>
      </div>
    </div>
  `;
    const 컴포넌트 = document.createElement('div');
    컴포넌트.innerHTML = HTML;
    return 컴포넌트;
}
beforeEach(() => {
    document.body.innerHTML = '';
    // 돔_초기화();
});
describe('돔_업데이터 테스트', () => {
    describe("'어트리뷰트_업데이트' 메서드 테스트", () => {
        it('기존 요소의 어트리뷰트들을 새 요소의 어트리뷰트로 갱신한다.', () => {
            const 기존_요소 = document.createElement('div');
            기존_요소.setAttribute('title', 'old');
            기존_요소.setAttribute('id', 'oldID');
            const 새_요소 = document.createElement('div');
            새_요소.setAttribute('id', 'newID');
            새_요소.setAttribute('class', 'newClass');
            const $돔_업데이터 = new 돔_업데이터();
            $돔_업데이터.어트리뷰트_업데이트(기존_요소, 새_요소);
            expect(기존_요소.getAttributeNames()).toHaveLength(2);
            expect(기존_요소).toHaveAttribute('id', 'newID');
            expect(기존_요소).toHaveAttribute('class', 'newClass');
            expect(기존_요소).not.toHaveAttribute('title', 'old');
        });
    });
    describe("'요소_업데이트' 메서드 테스트", () => {
        it('기존 요소와 새 요소를 비교하여 변경점들을 적용한다.', () => {
            const 기존_요소 = 컴포넌트_생성({
                a: 1,
                b: 2,
                c: 3,
                d: 4,
                e: 5,
                f: 6
            });
            const 새_요소 = 컴포넌트_생성({
                a: 7,
                b: 8,
                c: 9,
                d: 10,
                e: 11,
                f: 12
            });
            const 부모_요소 = document.createElement('div');
            부모_요소.appendChild(기존_요소);
            document.body.appendChild(부모_요소);
            const $돔_업데이터 = new 돔_업데이터();
            $돔_업데이터.요소_업데이트(부모_요소, 기존_요소, 새_요소);
        });
    });
});
