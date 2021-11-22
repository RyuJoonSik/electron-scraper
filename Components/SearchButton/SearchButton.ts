import 컴포넌트 from '../Component/Component';

export default class 검색_버튼 extends 컴포넌트 {
  템플릿() {
    return `
    <button data-testid="search-bar-btn" type="button">검색</button>
    `;
  }

  설정() {
    const 버튼 = this.부모_컴포넌트.querySelector('[data-testid="search-bar-btn"]') as HTMLButtonElement;

    버튼.addEventListener('click', this.클릭_이벤트.bind(this));
  }

  async 클릭_이벤트() {
    const { 검색, 검색어 } = this.속성;

    await 검색(검색어);
  }
}
