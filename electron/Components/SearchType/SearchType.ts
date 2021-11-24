import {특정_요소이면} from '../../js/domUtility/domUtility';
import 컴포넌트 from '../Component/Component';

interface 속성 {
  검색_유형: string;
  검색_유형_변경(): void;
}

export default class 검색_유형 extends 컴포넌트 {
  constructor(부모: HTMLElement, 속성: 속성) {
    super(부모);

    this.속성 = 속성;
  }

  HTML_추가() {
    const {부모} = this;

    부모.innerHTML = `
      <div data-testid="search-type">
        <input data-testid="search-type-keyword" id="searchKeyword" name="search-type" type="radio" value="keyword"/>
        <label data-testid="search-type-keyword-label" for="searchKeyword">키워드</label>
        <input data-testid="search-type-brand" id="searchBrand" name="search-type" type="radio" value="brand"/>
        <label data-testid="search-type-brand-label" for="searchBrand">브랜드</label>
      </div>
    `;
  }

  태그_속성_초기화() {
    const {검색_유형} = this.속성;
    const 버튼 = this.부모.querySelector(`[value="${검색_유형}"]`) as HTMLInputElement;
    버튼.checked = true;
  }

  이벤트_설정() {
    const 컴포넌트_박스 = this.부모.querySelector('[data-testid="search-type"]') as HTMLDivElement;

    컴포넌트_박스.addEventListener('click', this.클릭_이벤트.bind(this));
  }

  클릭_이벤트(e: MouseEvent) {
    const {검색_유형_변경} = this.속성;
    const 타겟 = e.target as HTMLInputElement;

    if (특정_요소이면(타겟, [HTMLInputElement])) {
      const {value: 검색_유형} = 타겟 as HTMLInputElement;

      검색_유형_변경(검색_유형);
    }
  }
}
