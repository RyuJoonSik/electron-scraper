import 컴포넌트 from '../Component/Component';
import 검색_버튼 from '../SearchButton/SearchButton';
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
    자식_컴포넌트_렌더() {
        const 검색_버튼_컨테이너 = this.부모_컴포넌트.querySelector('[data-testid="search-button-container"]');
        const 새_속성 = {
            검색: this.속성.검색,
            검색어: this.상태.검색어,
        };
        const 검색_버튼_컴포넌트 = new 검색_버튼(검색_버튼_컨테이너, 새_속성);
        검색_버튼_컴포넌트.렌더();
    }
    설정() {
        const 입력 = this.부모_컴포넌트.querySelector('[data-testid="search-bar-input"]');
        입력.focus();
        입력.selectionStart = 입력.selectionEnd = 입력.value.length;
        입력.addEventListener('input', this.입력_이벤트.bind(this));
    }
    입력_이벤트(e) {
        const 새_검색어 = e.target.value;
        this.상태_설정({ 검색어: 새_검색어 });
    }
}
