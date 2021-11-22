import 컴포넌트 from '../Component/Component';

export default class 검색_결과 extends 컴포넌트 {
  템플릿() {
    const { 검색어, 마지막_페이지_번호 } = this.속성;

    return `
      <div data-testid="search-result">
        <b data-testid="search-result-word">검색어 : ${검색어}</b>
        <b data-testid="search-result-last-page-num">마지막 페이지 : ${마지막_페이지_번호}</b>
      <div>
    `;
  }
}
