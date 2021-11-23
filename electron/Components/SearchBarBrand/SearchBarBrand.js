import 컴포넌트 from '../Component/Component';
import 검색_버튼 from '../SearchButton/SearchButton';
import 브랜드 from '../../data/brand.json';
export default class 검색바_브랜드 extends 컴포넌트 {
    브랜드_사전 = 브랜드;
    constructor(부모_컴포넌트, 속성) {
        super(부모_컴포넌트, 속성);
        this.상태 = {
            검색어: '',
        };
    }
    템플릿() {
        const { 상태: { 검색어 }, 브랜드_사전, } = this;
        const 옵션_배열 = Object.keys(브랜드_사전)
            .map((브랜드_이름) => {
            let 옵션 = '';
            if (브랜드_사전[브랜드_이름] !== 검색어) {
                옵션 = `<option data-testid="search-bar-option" value="${브랜드_사전[브랜드_이름]}">${브랜드_이름}</option>`;
            }
            else {
                옵션 = `<option data-testid="search-bar-option" value="${브랜드_사전[브랜드_이름]}" selected>${브랜드_이름}</option>`;
            }
            return 옵션;
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
    자식_컴포넌트_렌더() {
        const 검색_버튼_컨테이너 = this.부모_컴포넌트.querySelector('[data-testid="search-button-container"]');
        const 새_속성 = {
            검색: this.속성.검색,
            검색어: this.상태.검색어,
        };
        const 검색_버튼_컴포넌트 = new 검색_버튼(검색_버튼_컨테이너, 새_속성);
        검색_버튼_컴포넌트.렌더();
    }
    변경_이벤트(e) {
        const 새_검색어 = e.target.value;
        this.상태_설정({ 검색어: 새_검색어 });
    }
    설정() {
        const 셀렉트 = this.부모_컴포넌트.querySelector('[data-testid="search-bar-select"]');
        셀렉트.addEventListener('change', this.변경_이벤트.bind(this));
    }
}
