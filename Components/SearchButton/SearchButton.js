import 컴포넌트 from '../Component/Component.js';

export default class 검색_버튼 extends 컴포넌트 {
  템플릿() {
    return `
    <button data-testid="search-bar-btn" type="button">검색</button>
    `;
  }

  async 클릭_이벤트() {
    const { 검색, 검색어 } = this.속성;

    await 검색(검색어);
  }

  설정() {
    this.부모_컴포넌트
      .querySelector('[data-testid="search-bar-btn"]')
      .addEventListener('click', this.클릭_이벤트.bind(this));
  }
}
