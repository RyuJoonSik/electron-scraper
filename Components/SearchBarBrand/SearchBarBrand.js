import 컴포넌트 from '../Component/Component.js';
import 검색_버튼 from '../SearchButton/SearchButton.js';
import 브랜드 from '../../data/brand.js';

export default class 검색바_브랜드 extends 컴포넌트 {
  constructor(부모_컴포넌트, 속성) {
    super(부모_컴포넌트, 속성);

    this.상태 = {
      검색어: '',
    };
  }

  템플릿() {
    const { 검색어 } = this.상태;
    const 옵션_배열 = Object.keys(브랜드)
      .map((v) => {
        let result = '';

        if (브랜드[v] !== 검색어) {
          result = `<option data-testid="search-bar-option" value="${브랜드[v]}">${v}</option>`;
        } else {
          result = `<option data-testid="search-bar-option" value="${브랜드[v]}" selected>${v}</option>`;
        }

        return result;
      })
      .join('');

    return `
    <div data-testid="search-bar">
        <select data-testid="search-bar-select" name="brands" value="${검색어}">
        <option>--- 브랜드 ---</option>
          ${옵션_배열}
        </select>
        <div data-testid="search-button-container"></div>
    </div>
    `;
  }

  변경_이벤트({ target }) {
    this.상태_설정({ 검색어: target.value });
  }

  설정() {
    const 셀렉트 = this.부모_컴포넌트.querySelector('[data-testid="search-bar-select"]');

    셀렉트.addEventListener('change', this.변경_이벤트.bind(this));
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
