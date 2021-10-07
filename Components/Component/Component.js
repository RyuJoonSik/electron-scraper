export default class 컴포넌트 {
  부모_컴포넌트;
  상태;
  속성;

  constructor(부모_컴포넌트, 속성) {
    this.부모_컴포넌트 = 부모_컴포넌트;
    this.속성 = 속성;
    this.상태 = {};
  }

  템플릿() {
    return '';
  }

  설정() {}

  자식_컴포넌트_렌더() {}

  렌더() {
    this.부모_컴포넌트.innerHTML = this.템플릿();
    this.설정();
    this.자식_컴포넌트_렌더();
  }

  상태_설정(새_상태) {
    this.상태 = { ...this.상태, ...새_상태 };
    this.렌더();
  }
}
