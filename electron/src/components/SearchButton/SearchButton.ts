import 컴포넌트 from '../Component/Component.js';

interface 속성 {
  검색어: string;
  검색_유형: string;
  검색(URL_접두사: string, 검색어: string): void;
}

export default class 검색_버튼 extends 컴포넌트 {
  private readonly URL_접두사: string;

  constructor(부모: HTMLElement, 속성: 속성) {
    super(부모);
    this.속성 = 속성;

    const {검색_유형} = this.속성;
    const 키워드_검색_URL_접두사 = 'https://kr.iherb.com/search?kw=';
    const 브랜드_검색_URL_접두사 = 'https://kr.iherb.com/c/';

    this.URL_접두사 = 검색_유형 === 'keyword' ? 키워드_검색_URL_접두사 : 브랜드_검색_URL_접두사;
  }

  HTML_추가() {
    const {부모} = this;

    부모.innerHTML = `
    <button data-testid="search-btn" type="button">검색</button>
    `;
  }

  이벤트_설정() {
    const 검색_버튼_선택자 = '[data-testid="search-btn"]';
    const 검색_버튼 = this.부모.querySelector(검색_버튼_선택자) as HTMLButtonElement;

    검색_버튼.addEventListener('click', this.클릭_이벤트.bind(this));
  }

  async 클릭_이벤트() {
    const {검색, 검색어} = this.속성;
    const {URL_접두사} = this;

    await 검색(URL_접두사, 검색어);
  }
}
