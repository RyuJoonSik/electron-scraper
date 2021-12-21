import {옵저버_함수_등록} from '../observer/observer';

interface 문자열_프로퍼티_객체 {
  [키: string]: any;
}

export default abstract class 컴포넌트 {
  _상태: 문자열_프로퍼티_객체 = {};

  constructor(private readonly _부모: HTMLElement, private readonly 속성?: 문자열_프로퍼티_객체) {
    this.옵저버_함수_초기화();
  }

  protected 상태_변경(새_상태: 문자열_프로퍼티_객체): void {
    this._상태 = {...this.상태, ...새_상태};

    this.렌더();
  }

  protected 옵저버_함수_초기화(): void {
    const 렌더 = this.렌더.bind(this);

    옵저버_함수_등록(렌더);
  }

  protected 상태_생성(): 문자열_프로퍼티_객체 {
    return {};
  }

  렌더(): void {
    this.부모_컴포넌트에_HTML_추가();
    this.태그_속성_초기화();
    this.이벤트_설정();
    this.자식_생성();
  }

  protected abstract 부모_컴포넌트에_HTML_추가(): void;

  protected 태그_속성_초기화(): void {}

  protected 이벤트_설정(): void {}

  protected 자식_생성(): void {}

  get 상태() {
    return this._상태;
  }

  set 상태(새_상태: 문자열_프로퍼티_객체) {
    this._상태 = 새_상태;
  }

  get 부모() {
    return this._부모;
  }
}
