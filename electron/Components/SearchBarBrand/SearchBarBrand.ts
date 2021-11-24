import 컴포넌트 from '../Component/Component';
import 검색_버튼 from '../SearchButton/SearchButton';
import 브랜드 from '../../data/brand.json';
import {옵션_태그_배열_생성} from '../../js/domUtility/domUtility';

interface 사전 {
  [key: string]: string;
}

interface 속성 {
  검색(): void;
}

export default class 검색바_브랜드 extends 컴포넌트 {
  private readonly 브랜드: 사전 = 브랜드;

  constructor(부모: HTMLElement, 속성: 속성) {
    super(부모);

    this.속성 = 속성;
    this.상태 = {
      검색어: ''
    };
  }

  HTML_추가() {
    const {부모, 브랜드} = this;
    // const {
    //   상태: {검색어},
    //   브랜드_사전
    // } = this;
    // // const 옵션_배열 = Object.keys(브랜드_사전).map((브랜드_이름) => {
    // //   let 옵션 = '';

    // //   if (브랜드_사전[브랜드_이름] !== 검색어) {
    // //     옵션 = `<option data-testid="search-bar-option" value="${브랜드_사전[브랜드_이름]}">${브랜드_이름}</option>`;
    // //   } else {
    // //     옵션 = `<option data-testid="search-bar-option" value="${브랜드_사전[브랜드_이름]}" selected>${브랜드_이름}</option>`;
    // //   }

    // //   return 옵션;
    // // });

    // return `
    // <div data-testid="search-bar">
    //     <select data-testid="search-bar-select" name="brands" value="${검색어}">
    //     <option>--- 브랜드 ---</option>
    //       ${옵션_배열.join('')}
    //     </select>
    //     <div data-testid="search-button-container"></div>
    // </div>
    // `;
    const 태그_속성 = {
      'data-testid': 'search-bar-option'
    };
    const 옵션_태그 = 옵션_태그_배열_생성(브랜드, 태그_속성).join();

    부모.innerHTML = `
      <div data-testid="search-bar">
          <select data-testid="search-bar-select" name="brands">
          <option>--- 브랜드 ---</option>
            ${옵션_태그}
          </select>
          <div data-testid="search-button-container"></div>
      </div>
    `;
  }

  // 자식_컴포넌트_렌더() {
  //   const 검색_버튼_컨테이너 = this.부모_컴포넌트.querySelector(
  //     '[data-testid="search-button-container"]'
  //   ) as HTMLElement;
  //   const 새_속성 = {
  //     검색: this.속성.검색,
  //     검색어: this.상태.검색어,
  //   };
  //   const 검색_버튼_컴포넌트 = new 검색_버튼(검색_버튼_컨테이너, 새_속성);

  //   검색_버튼_컴포넌트.렌더();
  // }

  이벤트_설정() {
    const 셀렉트 = this.부모.querySelector('[data-testid="search-bar-select"]') as HTMLSelectElement;

    셀렉트.addEventListener('change', this.옵션_변경_이벤트.bind(this));
  }

  옵션_변경_이벤트(e: Event) {
    const 옵션 = e.target as HTMLSelectElement;
    const {value: 새_검색어} = 옵션;

    this.상태_변경({검색어: 새_검색어});
  }
}
