import 컴포넌트 from '../컴포넌트/컴포넌트';
import 검색_버튼 from '../검색_버튼/검색_버튼';
import 브랜드 from '../../data/brand.json';
import {옵션_배열_생성, 옵션_선택, 요소_찾기, 요소_값_반환} from '../../js/domUtility/domUtility';

interface 사전 {
  [key: string]: string;
}

interface 속성 {
  검색(): void;
}

interface 상태 {
  검색어: string;
}

export default class 브랜드_검색바 extends 컴포넌트 {
  private readonly 브랜드: 사전 = 브랜드;
  protected 상태: 상태 = {
    검색어: '21st-century-health-care'
  };

  constructor(부모: HTMLElement, 속성: 속성) {
    super(부모);

    this.속성 = 속성;
  }

  HTML_추가() {
    const {부모, 브랜드} = this;
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
    const {검색어} = this.상태;
    const {부모} = this;
    const 브랜드_옵션_선택자 = `[value="${검색어}"]`;
    const 브랜드_옵션 = 요소_찾기(부모, 브랜드_옵션_선택자) as HTMLOptionElement;

    옵션_선택(브랜드_옵션);
  }

  자식_렌더() {
    const 검색_버튼_컴포넌트 = this.검색_버튼_생성();

    검색_버튼_컴포넌트.렌더();
  }

  검색_버튼_생성() {
    const {검색} = this.속성;
    const {검색어} = this.상태;
    const {부모} = this;
    const 검색_버튼_컨테이너_선택자 = '[data-testid="search-button-container"]';
    const 검색_버튼_컨테이너 = 요소_찾기(부모, 검색_버튼_컨테이너_선택자) as HTMLDivElement;
    const 검색_버튼_속성 = {
      검색,
      검색어
    };
    const 검색_버튼_컴포넌트 = new 검색_버튼(검색_버튼_컨테이너, 검색_버튼_속성);

    return 검색_버튼_컴포넌트;
  }

  이벤트_설정() {
    const {부모} = this;
    const 브랜드_셀렉트_선택자 = '[data-testid="search-bar-select"]';
    const 브랜드_셀렉트 = 요소_찾기(부모, 브랜드_셀렉트_선택자);

    브랜드_셀렉트.addEventListener('change', this.브랜드_옵션_변경_이벤트.bind(this));
  }

  브랜드_옵션_변경_이벤트(e: Event) {
    const 옵션 = e.target as HTMLOptionElement;
    const 새_검색어 = 요소_값_반환(옵션);

    this.상태_변경({검색어: 새_검색어});
  }
}
