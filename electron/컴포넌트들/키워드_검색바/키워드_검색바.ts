import 컴포넌트 from '../컴포넌트/컴포넌트';
import 검색_버튼 from '../검색_버튼/검색_버튼';
import {요소_찾기, 요소_값_반환, 인풋_커서_위치_초기화} from '../../js/domUtility/domUtility';

interface 속성 {
  검색(): void;
}

interface 상태 {
  검색어: string;
}

export default class 키워드_검색바 extends 컴포넌트 {
  protected 상태: 상태 = {
    검색어: ''
  };

  constructor(부모: HTMLElement, 속성: 속성) {
    super(부모);

    this.속성 = 속성;
  }

  HTML_추가() {
    const {부모} = this;
    const {검색어} = this.상태;

    부모.innerHTML = `
      <div data-testid="search-bar">
        <input data-testid="search-bar-input" type="text" value="${검색어}" placeholder="검색어"/>
        <div data-testid="search-button-container"></div>
      </div>
    `;
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
    const 검색_버튼_컨테이너 = 요소_찾기(부모, 검색_버튼_컨테이너_선택자);
    const 검색_버튼_속성 = {
      검색,
      검색어
    };
    const 검색_버튼_컴포넌트 = new 검색_버튼(검색_버튼_컨테이너, 검색_버튼_속성);

    return 검색_버튼_컴포넌트;
  }

  태그_속성_초기화() {
    const {부모} = this;
    const 검색어_인풋_선택자 = '[data-testid="search-bar-input"]';
    const 검색어_인풋 = 요소_찾기(부모, 검색어_인풋_선택자) as HTMLInputElement;

    인풋_커서_위치_초기화(검색어_인풋);
    검색어_인풋.focus();
  }

  이벤트_설정() {
    const {부모} = this;
    const 검색어_인풋_선택자 = '[data-testid="search-bar-input"]';
    const 검색어_인풋 = 요소_찾기(부모, 검색어_인풋_선택자) as HTMLInputElement;

    검색어_인풋.addEventListener('input', this.입력_이벤트.bind(this));
  }

  입력_이벤트(e: Event) {
    const 입력 = e.target as HTMLInputElement;
    const 새_검색어 = 요소_값_반환(입력);

    this.상태_변경({검색어: 새_검색어});
  }
}
