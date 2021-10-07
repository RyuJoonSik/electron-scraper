import 컴포넌트 from '../Component/Component.js';
import 검색_유형 from '../SearchType/SearchType.js';
import 검색바_키워드 from '../SearchBarKeyword/SearchBarKeyword.js';
import 검색바_브랜드 from '../SearchBarBrand/SearchBarBrand.js';
import 검색_결과 from '../SearchResult/SearchResult.js';
import 다운로드_바 from '../DownloadBar/DownloadBar.js';

export default class 헤더 extends 컴포넌트 {
  템플릿() {
    return `
    <header data-testid="header">
      <a href="https://www.iherb.com" target="_blank">사이트 이동</a>
      <div data-component="search-type-container"></div>
      <div data-component="search-bar-container"></div>
      <div data-component="search-result-container"></div>
      <div data-component="download-bar"></div>
    </header>
    `;
  }

  자식_컴포넌트_렌더() {
    const { 유형, 유형_변경, 검색, 다운로드, 검색어, 마지막_페이지_번호 } = this.속성;
    const 검색_유형_컨테이너 = this.부모_컴포넌트.querySelector('[data-component="search-type-container"]');
    const 검색_유형_컴포넌트 = new 검색_유형(검색_유형_컨테이너, {
      유형_변경,
      유형,
    });

    검색_유형_컴포넌트.렌더();

    const 검색바_컨테이너 = this.부모_컴포넌트.querySelector('[data-component="search-bar-container"]');
    let 검색바;

    if (유형 === 'keyword') {
      검색바 = new 검색바_키워드(검색바_컨테이너, { 검색 });
    } else {
      검색바 = new 검색바_브랜드(검색바_컨테이너, { 검색 });
    }

    검색바.렌더();

    const 검색_결과_컨테이너 = this.부모_컴포넌트.querySelector('[data-component="search-result-container"]');
    const 검색_결과_컴포넌트 = new 검색_결과(검색_결과_컨테이너, {
      검색어,
      마지막_페이지_번호,
    });

    검색_결과_컴포넌트.렌더();

    const 다운로드_바_컨테이너 = this.부모_컴포넌트.querySelector('[data-component="download-bar"]');
    const 다운로드_바_컴포넌트 = new 다운로드_바(다운로드_바_컨테이너, {
      다운로드,
    });

    다운로드_바_컴포넌트.렌더();
  }
}
