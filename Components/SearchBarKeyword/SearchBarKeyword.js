import 컴포넌트 from '../Component/Component.js';
import 검색_버튼 from '../SearchButton/SearchButton.js';

export default class 검색바_키워드 extends 컴포넌트 {
  constructor(부모_컴포넌트, 속성) {
    super(부모_컴포넌트, 속성);

    this.상태 = {
      검색어: '',
    };
  }

  템플릿() {
    const { 검색어 } = this.상태;

    return `
      <div data-testid="search-bar">
        <input data-testid="search-bar-input" type="text" value='${검색어}' placeholder="검색어"/>
        <div data-testid="search-button-container"></div>
      </div>
    `;
  }

  입력_이벤트({ target: { value } }) {
    this.상태_설정({ 검색어: value });
  }

  설정() {
    const 입력 = this.부모_컴포넌트.querySelector('[data-testid="search-bar-input"]');

    입력.focus();
    입력.selectionStart = 입력.selectionEnd = 입력.value.length;
    입력.addEventListener('input', this.입력_이벤트.bind(this));
  }

  자식_컴포넌트_렌더() {
    const 컨테이너 = this.부모_컴포넌트.querySelector('[data-testid="search-button-container"]');
    const { 검색 } = this.속성;
    const { 검색어 } = this.상태;
    const 검색_버튼_컴포넌트 = new 검색_버튼(컨테이너, {
      검색,
      검색어,
    });

    검색_버튼_컴포넌트.렌더();
  }
}
