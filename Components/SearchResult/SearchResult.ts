import 컴포넌트 from '../Component/Component';

interface 속성 {
  검색어: string;
  마지막_페이지_번호: number;
}

export default class 검색_결과 extends 컴포넌트 {
  constructor(부모: HTMLElement, 속성: 속성) {
    super(부모);

    this.속성 = 속성;
  }

  HTML_추가() {
    const {검색어, 마지막_페이지_번호} = this.속성;
    const {부모} = this;

    부모.innerHTML = `
      <div data-testid="search-result">
        <b data-testid="search-result-word">검색어 : ${검색어}</b>
        <b data-testid="search-result-last-page-number">마지막 페이지 : ${마지막_페이지_번호}</b>
      <div>
    `;
  }
}
