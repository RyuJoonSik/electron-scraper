type 문자열_프로퍼티_객체 = {
  [키: string]: any;
};

export default class 컴포넌트 {
  protected readonly 부모: HTMLElement;
  protected readonly 속성: 문자열_프로퍼티_객체;
  protected 상태: 문자열_프로퍼티_객체 = {};

  constructor(부모: HTMLElement, 속성: 문자열_프로퍼티_객체 = {}) {
    this.부모 = 부모;
    this.속성 = 속성;
  }

  렌더(): void {
    this.부모.innerHTML = this.템플릿();
    this.이벤트_설정();
    this.자식_렌더();
  }

  템플릿(): string {
    return '';
  }

  이벤트_설정(): void {}

  자식_렌더(): void {}

  상태_설정(새_상태: 문자열_프로퍼티_객체) {
    this.상태 = { ...this.상태, ...새_상태 };
    this.렌더();
  }
}
