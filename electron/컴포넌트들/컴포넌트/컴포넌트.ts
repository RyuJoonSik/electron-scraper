interface 문자열_프로퍼티_객체 {
  [키: string]: any;
}

interface 자식<T extends 컴포넌트> {
  new (...args: any[]): T;
}

export default class 컴포넌트 {
  protected 상태: 문자열_프로퍼티_객체 = {};
  protected 속성: 문자열_프로퍼티_객체 = {};

  constructor(protected readonly 부모: HTMLElement) {}

  렌더(): void {
    this.HTML_추가();
    this.태그_속성_초기화();
    this.이벤트_설정();
    this.자식_렌더();
  }

  HTML_추가(): void {}

  태그_속성_초기화(): void {}

  이벤트_설정(): void {}

  자식_렌더(): void {}

  상태_변경(새_상태: 문자열_프로퍼티_객체) {
    this.상태 = {...this.상태, ...새_상태};

    this.렌더();
  }
}
