import 컴포넌트 from '../Component/Component.js';

export default class 검색_유형 extends 컴포넌트 {
  클릭_이벤트({ target }) {
    if (target.nodeName !== 'INPUT') {
      return;
    }

    this.속성.유형_변경(target.value);
  }

  템플릿() {
    return `
      <div data-testid="search-type">
        <input data-testid="search-type-keyword" id="searchKeyword" name="search-type" type="radio" value="keyword"/>
        <label data-testid="search-type-keyword-label" for="searchKeyword">키워드</label>
        <input data-testid="search-type-brand" id="searchBrand" name="search-type" type="radio" value="brand"/>
        <label data-testid="search-type-brand-label" for="searchBrand">브랜드</label>
      </div>
    `;
  }

  설정() {
    const { 유형 } = this.속성;

    this.부모_컴포넌트.querySelector(`[value="${유형}"]`).checked = true;
    this.부모_컴포넌트
      .querySelector('[data-testid="search-type"]')
      .addEventListener('click', this.클릭_이벤트.bind(this));
  }
}
