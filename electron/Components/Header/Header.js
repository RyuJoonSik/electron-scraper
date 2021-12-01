import 컴포넌트 from '../Component/Component.js';
import 검색_유형_상자 from '../SearchTypeBox/SearchTypeBox.js';
import 키워드_검색바 from '../KeywordSearchBar/KeywordSearchBar.js';
import 브랜드_검색바 from '../BrandSearchBar/BrandSearchBar.js';
import 검색_결과_상자 from '../SearchResultBox/SearchResultBox.js';
import 다운로드바 from '../DownloadBar/DownloadBar.js';
import { 요소_찾기 } from '../../js/domUtility/domUtility.js';
export default class 헤더 extends 컴포넌트 {
    constructor(부모, 속성) {
        super(부모);
        this.속성 = 속성;
    }
    HTML_추가() {
        const { 부모 } = this;
        부모.innerHTML = `
    <header data-testid="header">
      <a href="https://www.iherb.com" target="_blank">사이트 이동</a>
      <div data-testid="search-type-container"></div>
      <div data-testid="search-bar-container"></div>
      <div data-testid="search-result-container"></div>
      <div data-testid="download-bar-container"></div>
    </header>
    `;
    }
    자식_렌더() {
        this.검색_유형_상자_생성();
        this.검색바_생성();
        this.다운로드바_생성();
        this.검색_결과_상자_생성();
        this.자식_배열.forEach((자식) => {
            자식.렌더();
        });
    }
    검색_유형_상자_생성() {
        const { 부모 } = this;
        const { 검색_유형, 검색_유형_변경 } = this.속성;
        const 속성 = {
            검색_유형,
            검색_유형_변경
        };
        const 컨테이너_선택자 = '[data-testid="search-type-container"]';
        const 컴포넌트_컨테이너 = 요소_찾기(부모, 컨테이너_선택자);
        const 컴포넌트 = new 검색_유형_상자(컴포넌트_컨테이너, 속성);
        this.자식_배열.push(컴포넌트);
    }
    검색바_생성() {
        const { 부모 } = this;
        const { 검색_유형, 검색 } = this.속성;
        const 속성 = {
            검색_유형,
            검색
        };
        const 컨테이너_선택자 = '[data-testid="search-bar-container"]';
        const 컴포넌트_컨테이너 = 요소_찾기(부모, 컨테이너_선택자);
        const 컴포넌트 = 검색_유형 === 'keyword' ? new 키워드_검색바(컴포넌트_컨테이너, 속성) : new 브랜드_검색바(컴포넌트_컨테이너, 속성);
        this.자식_배열.push(컴포넌트);
    }
    다운로드바_생성() {
        const { 부모 } = this;
        const { 엑셀_다운로드, 이미지_다운로드 } = this.속성;
        const 속성 = {
            엑셀_다운로드,
            이미지_다운로드
        };
        const 컨테이너_선택자 = '[data-testid="download-bar-container"]';
        const 컴포넌트_컨테이너 = 요소_찾기(부모, 컨테이너_선택자);
        const 컴포넌트 = new 다운로드바(컴포넌트_컨테이너, 속성);
        this.자식_배열.push(컴포넌트);
    }
    검색_결과_상자_생성() {
        const { 부모 } = this;
        const { 검색어, 마지막_페이지_번호 } = this.속성;
        const 속성 = {
            검색어,
            마지막_페이지_번호
        };
        const 컨테이너_선택자 = '[data-testid="search-result-container"]';
        const 컴포넌트_컨테이너 = 요소_찾기(부모, 컨테이너_선택자);
        const 컴포넌트 = new 검색_결과_상자(컴포넌트_컨테이너, 속성);
        this.자식_배열.push(컴포넌트);
    }
}
