import 컴포넌트 from '../Component/Component';
import 검색_유형 from '../SearchType/SearchType';
import 검색바_키워드 from '../키워드_검색바/SearchBarKeyword';
import 검색바_브랜드 from '../브랜드_검색바/SearchBarBrand';
import 검색_결과 from '../검색_결과/SearchResult';
import 다운로드_바 from '../다운로드바/DownloadBar';

export default class 헤더 extends 컴포넌트 {
  템플릿() {
    return `
    <header data-testid="header">
      <a href="https://www.iherb.com" target="_blank">사이트 이동</a>
      <div data-testid="search-type-container"></div>
      <div data-testid="search-bar-container"></div>
      <div data-testid="search-result-container"></div>
      <div data-testid="download-bar-container"></div>
    </header>
    `;
  }

  검색_유형_컴포넌트_생성() {}

  자식_렌더() {}
  // 자식_컴포넌트_렌더() {
  //   const { 유형, 유형_변경, 검색, 다운로드, 검색어, 마지막_페이지_번호 } = this.속성;
  //   const 검색_유형_컨테이너 = this.부모_컴포넌트.querySelector(
  //     '[data-component="search-type-container"]'
  //   ) as HTMLDivElement;
  //   const 검색_유형_컴포넌트 = new 검색_유형(검색_유형_컨테이너, {
  //     유형_변경,
  //     유형,
  //   });

  //   검색_유형_컴포넌트.렌더();

  //   const 검색바_컨테이너 = this.부모_컴포넌트.querySelector('[data-component="search-bar-container"]') as HTMLElement;
  //   let 검색바: 검색바_키워드 | 검색바_브랜드;
  //   검색바 =
  //     유형 === 'keyword'
  //       ? new 검색바_키워드(검색바_컨테이너, { 검색 })
  //       : (검색바 = new 검색바_브랜드(검색바_컨테이너, { 검색 }));

  //   검색바.렌더();

  //   const 검색_결과_컨테이너 = this.부모_컴포넌트.querySelector(
  //     '[data-component="search-result-container"]'
  //   ) as HTMLDivElement;
  //   const 검색_결과_컴포넌트 = new 검색_결과(검색_결과_컨테이너, {
  //     검색어,
  //     마지막_페이지_번호,
  //   });

  //   검색_결과_컴포넌트.렌더();

  //   const 다운로드_바_컨테이너 = this.부모_컴포넌트.querySelector('[data-component="download-bar"]') as HTMLDivElement;
  //   const 다운로드_바_컴포넌트 = new 다운로드_바(다운로드_바_컨테이너, {
  //     다운로드,
  //   });

  //   다운로드_바_컴포넌트.렌더();
  // }
}
