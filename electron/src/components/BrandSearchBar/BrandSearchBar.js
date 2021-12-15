import 컴포넌트 from '../Component/Component.js';
import 검색_버튼 from '../SearchButton/SearchButton.js';
import 브랜드 from '../../data/brand.json';
import { 옵션_배열_생성, 옵션_선택, 요소_찾기, 요소_값_반환 } from '../../js/domUtility/domUtility';
export default class 브랜드_검색바 extends 컴포넌트 {
    브랜드 = 브랜드;
    상태 = {
        검색어: '21st-century-health-care'
    };
    constructor(부모, 속성) {
        super(부모);
        this.속성 = 속성;
    }
    HTML_추가() {
        const { 부모, 브랜드 } = this;
        const 태그_속성 = {
            'data-testid': 'search-bar-option'
        };
        const 브랜드_옵션 = 옵션_배열_생성(브랜드, 태그_속성).join();
        부모.innerHTML = `
      <div data-testid="search-bar">
          <select data-testid="search-bar-select" name="brands">
            ${브랜드_옵션}
          </select>
          <div data-testid="search-button-container"></div>
      </div>
    `;
    }
    태그_속성_초기화() {
        const { 검색어 } = this.상태;
        const { 부모 } = this;
        const 브랜드_옵션_선택자 = `[value="${검색어}"]`;
        const 브랜드_옵션 = 요소_찾기(부모, 브랜드_옵션_선택자);
        옵션_선택(브랜드_옵션);
    }
    자식_렌더() {
        this.검색_버튼_생성();
        this.자식_배열.forEach((자식) => {
            자식.렌더();
        });
    }
    검색_버튼_생성() {
        const { 검색, 검색_유형 } = this.속성;
        const { 검색어 } = this.상태;
        const { 부모 } = this;
        const 컨테이너_선택자 = '[data-testid="search-button-container"]';
        const 컨테이너 = 요소_찾기(부모, 컨테이너_선택자);
        const 속성 = {
            검색,
            검색어,
            검색_유형
        };
        const 컴포넌트 = new 검색_버튼(컨테이너, 속성);
        this.자식_배열.push(컴포넌트);
    }
    이벤트_설정() {
        const { 부모 } = this;
        const 브랜드_셀렉트_선택자 = '[data-testid="search-bar-select"]';
        const 브랜드_셀렉트 = 요소_찾기(부모, 브랜드_셀렉트_선택자);
        브랜드_셀렉트.addEventListener('change', this.브랜드_옵션_변경_이벤트.bind(this));
    }
    브랜드_옵션_변경_이벤트(e) {
        const 옵션 = e.target;
        const 새_검색어 = 요소_값_반환(옵션);
        this.상태_변경({ 검색어: 새_검색어 });
    }
}
