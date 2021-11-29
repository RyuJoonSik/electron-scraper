import 컴포넌트 from '../컴포넌트/컴포넌트';
import 헤더 from '../헤더/헤더';
// import 스크랩 from '../../js/scrap';
// import {mkdirSync} from 'fs';
// import {join} from 'path';
// import 성분_배열 from '../../data/ingredients';
import { 요소_찾기, DOM_생성, 마지막_페이지_번호_탐색, 쿼리_스트링이_있다면, 페이지_번호_배열_생성, 페이지_제품_URL_배열_탐색, URL_배열_DOM_파싱, 제품_URL_탐색 } from '../../js/domUtility/domUtility';
export default class 앱 extends 컴포넌트 {
    상태 = {
        URL: '',
        검색_유형: 'keyword',
        검색어: '',
        마지막_페이지_번호: 0
    };
    HTML_추가() {
        const { 부모 } = this;
        부모.innerHTML = `
      <div data-component="app">
        <div data-testid="header-container"></div>
      </div>
    `;
    }
    자식_렌더() {
        this.헤더_생성();
        this.자식_배열.forEach((자식) => {
            자식.렌더();
        });
    }
    헤더_생성() {
        const { 부모 } = this;
        const { 검색_유형, 검색어, 마지막_페이지_번호 } = this.상태;
        const 속성 = {
            검색_유형,
            검색어,
            마지막_페이지_번호,
            검색_유형_변경: this.검색_유형_변경.bind(this),
            검색: this.검색.bind(this),
            다운로드: this.다운로드.bind(this)
        };
        const 컨테이너_선택자 = '[data-testid="header-container"]';
        const 컴포넌트_컨테이너 = 요소_찾기(부모, 컨테이너_선택자);
        const 컴포넌트 = new 헤더(컴포넌트_컨테이너, 속성);
        this.자식_배열.push(컴포넌트);
    }
    검색_유형_변경(검색_유형) {
        this.상태_변경({
            검색_유형: 검색_유형
        });
    }
    async 검색(URL_접두사, 검색어) {
        const URL = URL_접두사 + 검색어;
        const DOM = await DOM_생성(URL);
        const 마지막_페이지_번호 = 마지막_페이지_번호_탐색(DOM);
        // console.log(검색어);
        // console.log(URL);
        // console.log(DOM);
        // console.log(마지막_페이지_번호);
        this.상태_변경({
            URL,
            마지막_페이지_번호,
            검색어
        });
        // console.log(this.상태);
    }
    async 다운로드(시작_페이지_번호, 끝_페이지_번호) {
        const { URL: 기본_URL } = this.상태;
        const URL = 쿼리_스트링이_있다면(기본_URL) ? 기본_URL + '&p=' : 기본_URL + '?p=';
        const 페이지_번호_배열 = 페이지_번호_배열_생성(시작_페이지_번호, 끝_페이지_번호);
        const URL_배열 = 페이지_번호_배열.map((페이지_번호) => URL + 페이지_번호);
        const DOM_배열 = await URL_배열_DOM_파싱(URL_배열);
        const 제품_URL_배열 = DOM_배열.map((DOM) => 페이지_제품_URL_배열_탐색(DOM)).flat();
        const 제품_DOM_배열 = await URL_배열_DOM_파싱(제품_URL_배열);
        제품_DOM_배열.forEach((제품_DOM) => {
            console.log(제품_URL_탐색(제품_DOM));
        });
        // 페이지_제품_URL_배열_탐색
        // const DOM_배열 = URL_배열.map(async (제품_URL) => await DOM_생성(제품_URL)).map((v) => v);
        // 페이지_번호_배열
        // console.log(페이지_번호_배열);
        // if(URL) {
        // }
    }
}
