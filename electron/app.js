/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./컴포넌트들/앱/앱 */ \"./컴포넌트들/앱/앱.js\");\n\r\n\r\nconst 앱_컴포넌트 = new ___WEBPACK_IMPORTED_MODULE_0__[\"default\"](document.querySelector('#app'));\r\n\r\n앱_컴포넌트.렌더();\r\n\n\n//# sourceURL=webpack://electron-app/./index.js?");

/***/ }),

/***/ "./js/domUtility/domUtility.js":
/*!*************************************!*\
  !*** ./js/domUtility/domUtility.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"특정_요소이면\": () => (/* binding */ 특정_요소이면),\n/* harmony export */   \"옵션_배열_생성\": () => (/* binding */ 옵션_배열_생성),\n/* harmony export */   \"태그_속성_나열\": () => (/* binding */ 태그_속성_나열),\n/* harmony export */   \"옵션_선택\": () => (/* binding */ 옵션_선택),\n/* harmony export */   \"요소_값_반환\": () => (/* binding */ 요소_값_반환),\n/* harmony export */   \"요소_찾기\": () => (/* binding */ 요소_찾기),\n/* harmony export */   \"인풋_커서_위치_초기화\": () => (/* binding */ 인풋_커서_위치_초기화),\n/* harmony export */   \"DOM_생성\": () => (/* binding */ DOM_생성),\n/* harmony export */   \"페이지_요청\": () => (/* binding */ 페이지_요청),\n/* harmony export */   \"DOM_변환\": () => (/* binding */ DOM_변환),\n/* harmony export */   \"마지막_페이지_번호_탐색\": () => (/* binding */ 마지막_페이지_번호_탐색),\n/* harmony export */   \"요소_리스트_찾기\": () => (/* binding */ 요소_리스트_찾기),\n/* harmony export */   \"리스트_길이_추출\": () => (/* binding */ 리스트_길이_추출),\n/* harmony export */   \"텍스트_컨텐츠_추출\": () => (/* binding */ 텍스트_컨텐츠_추출),\n/* harmony export */   \"쿼리_스트링이_있다면\": () => (/* binding */ 쿼리_스트링이_있다면),\n/* harmony export */   \"페이지_번호_배열_생성\": () => (/* binding */ 페이지_번호_배열_생성),\n/* harmony export */   \"페이지_제품_URL_배열_탐색\": () => (/* binding */ 페이지_제품_URL_배열_탐색),\n/* harmony export */   \"URL_배열_DOM_파싱\": () => (/* binding */ URL_배열_DOM_파싱),\n/* harmony export */   \"제품_URL_탐색\": () => (/* binding */ 제품_URL_탐색),\n/* harmony export */   \"제품_이름_탐색\": () => (/* binding */ 제품_이름_탐색),\n/* harmony export */   \"제품_이미지_URL_배열_탐색\": () => (/* binding */ 제품_이미지_URL_배열_탐색),\n/* harmony export */   \"제품_후기_탐색\": () => (/* binding */ 제품_후기_탐색)\n/* harmony export */ });\nfunction 특정_요소이면(타겟_요소, 비교_요소들) {\r\n    return 비교_요소들.some((요소) => 타겟_요소 instanceof 요소);\r\n}\r\nfunction 옵션_배열_생성(사전, 태그_속성) {\r\n    const 공통_속성 = 태그_속성_나열(태그_속성);\r\n    const 옵션_태그_배열 = Object.entries(사전).map(([단어, 뜻]) => `<option ${공통_속성} value=\"${뜻}\">${단어}</option>`);\r\n    return 옵션_태그_배열;\r\n}\r\nfunction 태그_속성_나열(태그_속성) {\r\n    const 공통_속성 = Object.entries(태그_속성)\r\n        .reduce((문자열, [속성, 값]) => {\r\n        문자열 += `${속성}=\"${값}\" `;\r\n        return 문자열;\r\n    }, '')\r\n        .trimEnd();\r\n    return 공통_속성;\r\n}\r\nfunction 옵션_선택(옵션_요소) {\r\n    옵션_요소.selected = true;\r\n}\r\nfunction 요소_값_반환(요소) {\r\n    return 요소.value;\r\n}\r\nfunction 요소_찾기(부모, 셀렉터) {\r\n    const 요소 = 부모.querySelector(셀렉터);\r\n    return 요소;\r\n}\r\nfunction 인풋_커서_위치_초기화(인풋_요소) {\r\n    const { value: 문자열 } = 인풋_요소;\r\n    const 문자열_길이 = 문자열.length;\r\n    인풋_요소.selectionStart = 인풋_요소.selectionEnd = 문자열_길이;\r\n}\r\nasync function DOM_생성(URL) {\r\n    const HTML_텍스트 = await 페이지_요청(URL);\r\n    const DOM = DOM_변환(HTML_텍스트);\r\n    return DOM;\r\n}\r\nasync function 페이지_요청(URL) {\r\n    const 응답 = await fetch(URL);\r\n    const HTML_텍스트 = await 응답.text();\r\n    // if (!응답.ok) {\r\n    //   throw new Error();\r\n    // }\r\n    return HTML_텍스트;\r\n}\r\nfunction DOM_변환(HTML_텍스트) {\r\n    const DOM_파서 = new DOMParser();\r\n    const DOM = DOM_파서.parseFromString(HTML_텍스트, 'text/html');\r\n    return DOM;\r\n}\r\nfunction 마지막_페이지_번호_탐색(DOM, 선택자 = '.pagination-link') {\r\n    const 페이지_번호_리스트 = 요소_리스트_찾기(DOM, 선택자);\r\n    const 길이 = 리스트_길이_추출(페이지_번호_리스트);\r\n    const 마지막_인덱스 = 길이 - 1;\r\n    const 마지막_페이지_번호 = 페이지_번호_리스트[마지막_인덱스];\r\n    const 마지막_페이지_번호_텍스트 = 텍스트_컨텐츠_추출(마지막_페이지_번호);\r\n    return Number(마지막_페이지_번호_텍스트);\r\n}\r\nfunction 요소_리스트_찾기(부모, 선택자) {\r\n    const 요소_리스트 = 부모.querySelectorAll(선택자);\r\n    return 요소_리스트;\r\n}\r\nfunction 리스트_길이_추출(리스트) {\r\n    const 길이 = 리스트.length;\r\n    return 길이;\r\n}\r\nfunction 텍스트_컨텐츠_추출(요소) {\r\n    const 텍스트 = 요소.textContent?.trim();\r\n    return 텍스트;\r\n}\r\nfunction 쿼리_스트링이_있다면(검색_URL) {\r\n    const 결과 = 검색_URL.includes('?');\r\n    return 결과;\r\n}\r\nfunction 페이지_번호_배열_생성(시작_페이지_번호, 끝_페이지_번호) {\r\n    const 페이지_수 = 끝_페이지_번호 - 시작_페이지_번호 + 1;\r\n    const 페이지_번호_배열 = Array.from({ length: 페이지_수 }, (_, 인덱스) => 인덱스 + 시작_페이지_번호);\r\n    return 페이지_번호_배열;\r\n}\r\nfunction 페이지_제품_URL_배열_탐색(페이지, 선택자 = '.absolute-link.product-link') {\r\n    const 링크_리스트 = 요소_리스트_찾기(페이지, 선택자);\r\n    const 링크_배열 = [...링크_리스트];\r\n    return 링크_배열.map(({ href }) => href);\r\n}\r\nasync function URL_배열_DOM_파싱(URL_배열) {\r\n    const DOM_배열 = [];\r\n    for await (let URL of URL_배열) {\r\n        const DOM = await DOM_생성(URL);\r\n        DOM_배열.push(DOM);\r\n    }\r\n    return DOM_배열;\r\n}\r\nfunction 제품_URL_탐색(페이지, 선택자 = '.ga-product.product-grouping-refresh') {\r\n    const 요소 = 요소_찾기(페이지, 선택자);\r\n    const URL = 요소.getAttribute('itemid');\r\n    return URL;\r\n}\r\nfunction 제품_이름_탐색(페이지, 선택자 = '#name') {\r\n    const 요소 = 요소_찾기(페이지, 선택자);\r\n    const 이름 = 텍스트_컨텐츠_추출(요소);\r\n    return 이름;\r\n}\r\nfunction 제품_이미지_URL_배열_탐색(페이지, 선택자 = '.lazy.img-responsive') {\r\n    const 이미지_리스트 = 요소_리스트_찾기(페이지, 선택자);\r\n    const 이미지_배열 = [...이미지_리스트];\r\n    const 이미지_URL_배열 = 이미지_배열.map(({ dataset: { lazyload } }) => lazyload);\r\n    return 이미지_URL_배열;\r\n}\r\nfunction 제품_후기_탐색(페이지, 선택자 = '#product-summary-header .stars') {\r\n    const 요소 = 요소_찾기(페이지, 선택자);\r\n    const { title: 후기 } = 요소;\r\n    const [별점, 후기_수] = 후기.split(' - ');\r\n    return [별점, 후기_수];\r\n}\r\n\n\n//# sourceURL=webpack://electron-app/./js/domUtility/domUtility.js?");

/***/ }),

/***/ "./컴포넌트들/검색_결과_상자/검색_결과_상자.js":
/*!************************************!*\
  !*** ./컴포넌트들/검색_결과_상자/검색_결과_상자.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ 검색_결과_상자)\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../컴포넌트/컴포넌트 */ \"./컴포넌트들/컴포넌트/컴포넌트.js\");\n\r\nclass 검색_결과_상자 extends ___WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    constructor(부모, 속성) {\r\n        super(부모);\r\n        this.속성 = 속성;\r\n    }\r\n    HTML_추가() {\r\n        const { 검색어, 마지막_페이지_번호 } = this.속성;\r\n        const { 부모 } = this;\r\n        부모.innerHTML = `\r\n      <div data-testid=\"search-result\">\r\n        <b data-testid=\"search-result-word\">검색어 : ${검색어}</b>\r\n        <b data-testid=\"search-result-last-page-number\">마지막 페이지 : ${마지막_페이지_번호}</b>\r\n      <div>\r\n    `;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://electron-app/./%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EB%93%A4/%EA%B2%80%EC%83%89_%EA%B2%B0%EA%B3%BC_%EC%83%81%EC%9E%90/%EA%B2%80%EC%83%89_%EA%B2%B0%EA%B3%BC_%EC%83%81%EC%9E%90.js?");

/***/ }),

/***/ "./컴포넌트들/검색_버튼/검색_버튼.js":
/*!******************************!*\
  !*** ./컴포넌트들/검색_버튼/검색_버튼.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ 검색_버튼)\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../컴포넌트/컴포넌트 */ \"./컴포넌트들/컴포넌트/컴포넌트.js\");\n\r\nclass 검색_버튼 extends ___WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    URL_접두사;\r\n    constructor(부모, 속성) {\r\n        super(부모);\r\n        this.속성 = 속성;\r\n        const { 검색_유형 } = this.속성;\r\n        const 키워드_검색_URL_접두사 = 'https://kr.iherb.com/search?kw=';\r\n        const 브랜드_검색_URL_접두사 = 'https://kr.iherb.com/c/';\r\n        this.URL_접두사 = 검색_유형 === 'keyword' ? 키워드_검색_URL_접두사 : 브랜드_검색_URL_접두사;\r\n    }\r\n    HTML_추가() {\r\n        const { 부모 } = this;\r\n        부모.innerHTML = `\r\n    <button data-testid=\"search-btn\" type=\"button\">검색</button>\r\n    `;\r\n    }\r\n    이벤트_설정() {\r\n        const 검색_버튼_선택자 = '[data-testid=\"search-btn\"]';\r\n        const 검색_버튼 = this.부모.querySelector(검색_버튼_선택자);\r\n        검색_버튼.addEventListener('click', this.클릭_이벤트.bind(this));\r\n    }\r\n    async 클릭_이벤트() {\r\n        const { 검색, 검색어 } = this.속성;\r\n        const { URL_접두사 } = this;\r\n        await 검색(URL_접두사, 검색어);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://electron-app/./%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EB%93%A4/%EA%B2%80%EC%83%89_%EB%B2%84%ED%8A%BC/%EA%B2%80%EC%83%89_%EB%B2%84%ED%8A%BC.js?");

/***/ }),

/***/ "./컴포넌트들/검색_유형_상자/검색_유형_상자.js":
/*!************************************!*\
  !*** ./컴포넌트들/검색_유형_상자/검색_유형_상자.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ 검색_유형_상자)\n/* harmony export */ });\n/* harmony import */ var _js_domUtility_domUtility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../js/domUtility/domUtility */ \"./js/domUtility/domUtility.js\");\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../컴포넌트/컴포넌트 */ \"./컴포넌트들/컴포넌트/컴포넌트.js\");\n\r\n\r\nclass 검색_유형_상자 extends ___WEBPACK_IMPORTED_MODULE_1__[\"default\"] {\r\n    constructor(부모, 속성) {\r\n        super(부모);\r\n        this.속성 = 속성;\r\n    }\r\n    HTML_추가() {\r\n        const { 부모 } = this;\r\n        부모.innerHTML = `\r\n      <div data-testid=\"search-type\">\r\n        <input data-testid=\"search-type-keyword\" id=\"searchKeyword\" name=\"search-type\" type=\"radio\" value=\"keyword\"/>\r\n        <label data-testid=\"search-type-keyword-label\" for=\"searchKeyword\">키워드</label>\r\n        <input data-testid=\"search-type-brand\" id=\"searchBrand\" name=\"search-type\" type=\"radio\" value=\"brand\"/>\r\n        <label data-testid=\"search-type-brand-label\" for=\"searchBrand\">브랜드</label>\r\n      </div>\r\n    `;\r\n    }\r\n    태그_속성_초기화() {\r\n        const { 검색_유형 } = this.속성;\r\n        const 검색_유형_버튼_선택자 = `[value=\"${검색_유형}\"]`;\r\n        const 버튼 = this.부모.querySelector(검색_유형_버튼_선택자);\r\n        버튼.checked = true;\r\n    }\r\n    이벤트_설정() {\r\n        const 검색_유형_컴포넌트_컨테이너_선택자 = '[data-testid=\"search-type\"]';\r\n        const 검색_유형_컴포넌트_컨테이너 = this.부모.querySelector(검색_유형_컴포넌트_컨테이너_선택자);\r\n        검색_유형_컴포넌트_컨테이너.addEventListener('click', this.클릭_이벤트.bind(this));\r\n    }\r\n    클릭_이벤트(e) {\r\n        const { 검색_유형_변경 } = this.속성;\r\n        const 타겟_요소 = e.target;\r\n        if ((0,_js_domUtility_domUtility__WEBPACK_IMPORTED_MODULE_0__[\"특정_요소이면\"])(타겟_요소, [HTMLInputElement])) {\r\n            const { value: 검색_유형 } = 타겟_요소;\r\n            검색_유형_변경(검색_유형);\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://electron-app/./%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EB%93%A4/%EA%B2%80%EC%83%89_%EC%9C%A0%ED%98%95_%EC%83%81%EC%9E%90/%EA%B2%80%EC%83%89_%EC%9C%A0%ED%98%95_%EC%83%81%EC%9E%90.js?");

/***/ }),

/***/ "./컴포넌트들/다운로드바/다운로드바.js":
/*!******************************!*\
  !*** ./컴포넌트들/다운로드바/다운로드바.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ 다운로드_바)\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../컴포넌트/컴포넌트 */ \"./컴포넌트들/컴포넌트/컴포넌트.js\");\n/* harmony import */ var _js_domUtility_domUtility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../js/domUtility/domUtility */ \"./js/domUtility/domUtility.js\");\n\r\n\r\nclass 다운로드_바 extends ___WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    constructor(부모, 속성) {\r\n        super(부모);\r\n        this.속성 = 속성;\r\n    }\r\n    HTML_추가() {\r\n        const { 부모 } = this;\r\n        // TODO: 컴포넌트를 더 작게 나눌 수 있을 것 같다.\r\n        부모.innerHTML = `\r\n      <div data-testid=\"download-bar\">\r\n        <input data-testid=\"download-bar-start-page\" name=\"startPageNum\" type=\"text\" placeholder=\"시작 페이지 번호\">\r\n        <input data-testid=\"download-bar-end-page\" name=\"endPageNum\" type=\"text\" placeholder=\"끝 페이지 번호\">\r\n        <button data-testid=\"download-bar-button\" type=\"button\">다운로드</button>\r\n      </div>\r\n    `;\r\n    }\r\n    이벤트_설정() {\r\n        const 다움로드_버튼_선택자 = '[data-testid=\"download-bar-button\"]';\r\n        const 다운로드_버튼 = this.부모.querySelector(다움로드_버튼_선택자);\r\n        다운로드_버튼.addEventListener('click', this.클릭_이벤트.bind(this));\r\n    }\r\n    async 클릭_이벤트() {\r\n        const { 다운로드 } = this.속성;\r\n        const { 부모 } = this;\r\n        // TODO: 반복되는 명령을 줄여야 할 것 같다.\r\n        const 시작_페이지_번호_인풋_선택자 = '[data-testid=\"download-bar-start-page\"]';\r\n        const 시작_페이지_번호_인풋 = (0,_js_domUtility_domUtility__WEBPACK_IMPORTED_MODULE_1__[\"요소_찾기\"])(부모, 시작_페이지_번호_인풋_선택자);\r\n        const 시작_페이지_번호 = Number((0,_js_domUtility_domUtility__WEBPACK_IMPORTED_MODULE_1__[\"요소_값_반환\"])(시작_페이지_번호_인풋));\r\n        const 끝_페이지_번호_인풋_선택자 = '[data-testid=\"download-bar-end-page\"]';\r\n        const 끝_페이지_번호_인풋 = (0,_js_domUtility_domUtility__WEBPACK_IMPORTED_MODULE_1__[\"요소_찾기\"])(부모, 끝_페이지_번호_인풋_선택자);\r\n        const 끝_페이지_번호 = Number((0,_js_domUtility_domUtility__WEBPACK_IMPORTED_MODULE_1__[\"요소_값_반환\"])(끝_페이지_번호_인풋));\r\n        await 다운로드(시작_페이지_번호, 끝_페이지_번호);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://electron-app/./%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EB%93%A4/%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C%EB%B0%94/%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C%EB%B0%94.js?");

/***/ }),

/***/ "./컴포넌트들/브랜드_검색바/브랜드_검색바.js":
/*!**********************************!*\
  !*** ./컴포넌트들/브랜드_검색바/브랜드_검색바.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ 브랜드_검색바)\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../컴포넌트/컴포넌트 */ \"./컴포넌트들/컴포넌트/컴포넌트.js\");\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../검색_버튼/검색_버튼 */ \"./컴포넌트들/검색_버튼/검색_버튼.js\");\n/* harmony import */ var _json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../데이터/브랜드.json */ \"./데이터/브랜드.json\");\n/* harmony import */ var _js_domUtility_domUtility__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../js/domUtility/domUtility */ \"./js/domUtility/domUtility.js\");\n\r\n\r\n\r\n\r\nclass 브랜드_검색바 extends ___WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    브랜드 = _json__WEBPACK_IMPORTED_MODULE_2__;\r\n    상태 = {\r\n        검색어: '21st-century-health-care'\r\n    };\r\n    constructor(부모, 속성) {\r\n        super(부모);\r\n        this.속성 = 속성;\r\n    }\r\n    HTML_추가() {\r\n        const { 부모, 브랜드 } = this;\r\n        const 태그_속성 = {\r\n            'data-testid': 'search-bar-option'\r\n        };\r\n        const 브랜드_옵션 = (0,_js_domUtility_domUtility__WEBPACK_IMPORTED_MODULE_3__[\"옵션_배열_생성\"])(브랜드, 태그_속성).join();\r\n        부모.innerHTML = `\r\n      <div data-testid=\"search-bar\">\r\n          <select data-testid=\"search-bar-select\" name=\"brands\">\r\n            ${브랜드_옵션}\r\n          </select>\r\n          <div data-testid=\"search-button-container\"></div>\r\n      </div>\r\n    `;\r\n    }\r\n    태그_속성_초기화() {\r\n        const { 검색어 } = this.상태;\r\n        const { 부모 } = this;\r\n        const 브랜드_옵션_선택자 = `[value=\"${검색어}\"]`;\r\n        const 브랜드_옵션 = (0,_js_domUtility_domUtility__WEBPACK_IMPORTED_MODULE_3__[\"요소_찾기\"])(부모, 브랜드_옵션_선택자);\r\n        (0,_js_domUtility_domUtility__WEBPACK_IMPORTED_MODULE_3__[\"옵션_선택\"])(브랜드_옵션);\r\n    }\r\n    자식_렌더() {\r\n        this.검색_버튼_생성();\r\n        this.자식_배열.forEach((자식) => {\r\n            자식.렌더();\r\n        });\r\n    }\r\n    검색_버튼_생성() {\r\n        const { 검색, 검색_유형 } = this.속성;\r\n        const { 검색어 } = this.상태;\r\n        const { 부모 } = this;\r\n        const 컨테이너_선택자 = '[data-testid=\"search-button-container\"]';\r\n        const 컨테이너 = (0,_js_domUtility_domUtility__WEBPACK_IMPORTED_MODULE_3__[\"요소_찾기\"])(부모, 컨테이너_선택자);\r\n        const 속성 = {\r\n            검색,\r\n            검색어,\r\n            검색_유형\r\n        };\r\n        const 컴포넌트 = new ___WEBPACK_IMPORTED_MODULE_1__[\"default\"](컨테이너, 속성);\r\n        this.자식_배열.push(컴포넌트);\r\n    }\r\n    이벤트_설정() {\r\n        const { 부모 } = this;\r\n        const 브랜드_셀렉트_선택자 = '[data-testid=\"search-bar-select\"]';\r\n        const 브랜드_셀렉트 = (0,_js_domUtility_domUtility__WEBPACK_IMPORTED_MODULE_3__[\"요소_찾기\"])(부모, 브랜드_셀렉트_선택자);\r\n        브랜드_셀렉트.addEventListener('change', this.브랜드_옵션_변경_이벤트.bind(this));\r\n    }\r\n    브랜드_옵션_변경_이벤트(e) {\r\n        const 옵션 = e.target;\r\n        const 새_검색어 = (0,_js_domUtility_domUtility__WEBPACK_IMPORTED_MODULE_3__[\"요소_값_반환\"])(옵션);\r\n        this.상태_변경({ 검색어: 새_검색어 });\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://electron-app/./%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EB%93%A4/%EB%B8%8C%EB%9E%9C%EB%93%9C_%EA%B2%80%EC%83%89%EB%B0%94/%EB%B8%8C%EB%9E%9C%EB%93%9C_%EA%B2%80%EC%83%89%EB%B0%94.js?");

/***/ }),

/***/ "./컴포넌트들/앱/앱.js":
/*!**********************!*\
  !*** ./컴포넌트들/앱/앱.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ 앱)\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../컴포넌트/컴포넌트 */ \"./컴포넌트들/컴포넌트/컴포넌트.js\");\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../헤더/헤더 */ \"./컴포넌트들/헤더/헤더.js\");\n/* harmony import */ var _js_domUtility_domUtility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../js/domUtility/domUtility */ \"./js/domUtility/domUtility.js\");\n\r\n\r\n// import 스크랩 from '../../js/scrap';\r\n// import {mkdirSync} from 'fs';\r\n// import {join} from 'path';\r\n// import 성분_배열 from '../../data/ingredients';\r\n\r\nclass 앱 extends ___WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    상태 = {\r\n        URL: '',\r\n        검색_유형: 'keyword',\r\n        검색어: '',\r\n        마지막_페이지_번호: 0\r\n    };\r\n    HTML_추가() {\r\n        const { 부모 } = this;\r\n        부모.innerHTML = `\r\n      <div data-component=\"app\">\r\n        <div data-testid=\"header-container\"></div>\r\n      </div>\r\n    `;\r\n    }\r\n    자식_렌더() {\r\n        this.헤더_생성();\r\n        this.자식_배열.forEach((자식) => {\r\n            자식.렌더();\r\n        });\r\n    }\r\n    헤더_생성() {\r\n        const { 부모 } = this;\r\n        const { 검색_유형, 검색어, 마지막_페이지_번호 } = this.상태;\r\n        const 속성 = {\r\n            검색_유형,\r\n            검색어,\r\n            마지막_페이지_번호,\r\n            검색_유형_변경: this.검색_유형_변경.bind(this),\r\n            검색: this.검색.bind(this),\r\n            다운로드: this.다운로드.bind(this)\r\n        };\r\n        const 컨테이너_선택자 = '[data-testid=\"header-container\"]';\r\n        const 컴포넌트_컨테이너 = (0,_js_domUtility_domUtility__WEBPACK_IMPORTED_MODULE_2__[\"요소_찾기\"])(부모, 컨테이너_선택자);\r\n        const 컴포넌트 = new ___WEBPACK_IMPORTED_MODULE_1__[\"default\"](컴포넌트_컨테이너, 속성);\r\n        this.자식_배열.push(컴포넌트);\r\n    }\r\n    검색_유형_변경(검색_유형) {\r\n        this.상태_변경({\r\n            검색_유형: 검색_유형\r\n        });\r\n    }\r\n    async 검색(URL_접두사, 검색어) {\r\n        const URL = URL_접두사 + 검색어;\r\n        const DOM = await (0,_js_domUtility_domUtility__WEBPACK_IMPORTED_MODULE_2__[\"DOM_생성\"])(URL);\r\n        const 마지막_페이지_번호 = (0,_js_domUtility_domUtility__WEBPACK_IMPORTED_MODULE_2__[\"마지막_페이지_번호_탐색\"])(DOM);\r\n        // console.log(검색어);\r\n        // console.log(URL);\r\n        // console.log(DOM);\r\n        // console.log(마지막_페이지_번호);\r\n        this.상태_변경({\r\n            URL,\r\n            마지막_페이지_번호,\r\n            검색어\r\n        });\r\n        // console.log(this.상태);\r\n    }\r\n    async 다운로드(시작_페이지_번호, 끝_페이지_번호) {\r\n        const { URL: 기본_URL } = this.상태;\r\n        const URL = (0,_js_domUtility_domUtility__WEBPACK_IMPORTED_MODULE_2__[\"쿼리_스트링이_있다면\"])(기본_URL) ? 기본_URL + '&p=' : 기본_URL + '?p=';\r\n        const 페이지_번호_배열 = (0,_js_domUtility_domUtility__WEBPACK_IMPORTED_MODULE_2__[\"페이지_번호_배열_생성\"])(시작_페이지_번호, 끝_페이지_번호);\r\n        const URL_배열 = 페이지_번호_배열.map((페이지_번호) => URL + 페이지_번호);\r\n        const DOM_배열 = await (0,_js_domUtility_domUtility__WEBPACK_IMPORTED_MODULE_2__[\"URL_배열_DOM_파싱\"])(URL_배열);\r\n        const 제품_URL_배열 = DOM_배열.map((DOM) => (0,_js_domUtility_domUtility__WEBPACK_IMPORTED_MODULE_2__[\"페이지_제품_URL_배열_탐색\"])(DOM)).flat();\r\n        const 제품_DOM_배열 = await (0,_js_domUtility_domUtility__WEBPACK_IMPORTED_MODULE_2__[\"URL_배열_DOM_파싱\"])(제품_URL_배열);\r\n        제품_DOM_배열.forEach((제품_DOM) => {\r\n            console.log((0,_js_domUtility_domUtility__WEBPACK_IMPORTED_MODULE_2__[\"제품_URL_탐색\"])(제품_DOM));\r\n        });\r\n        // 페이지_제품_URL_배열_탐색\r\n        // const DOM_배열 = URL_배열.map(async (제품_URL) => await DOM_생성(제품_URL)).map((v) => v);\r\n        // 페이지_번호_배열\r\n        // console.log(페이지_번호_배열);\r\n        // if(URL) {\r\n        // }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://electron-app/./%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EB%93%A4/%EC%95%B1/%EC%95%B1.js?");

/***/ }),

/***/ "./컴포넌트들/컴포넌트/컴포넌트.js":
/*!****************************!*\
  !*** ./컴포넌트들/컴포넌트/컴포넌트.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ 컴포넌트)\n/* harmony export */ });\nclass 컴포넌트 {\r\n    부모;\r\n    상태 = {};\r\n    속성 = {};\r\n    자식_배열 = [];\r\n    constructor(부모) {\r\n        this.부모 = 부모;\r\n    }\r\n    렌더() {\r\n        this.HTML_추가();\r\n        this.태그_속성_초기화();\r\n        this.이벤트_설정();\r\n        this.자식_렌더();\r\n    }\r\n    HTML_추가() { }\r\n    태그_속성_초기화() { }\r\n    이벤트_설정() { }\r\n    자식_렌더() { }\r\n    상태_변경(새_상태) {\r\n        this.상태 = { ...this.상태, ...새_상태 };\r\n        this.렌더();\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://electron-app/./%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EB%93%A4/%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8/%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8.js?");

/***/ }),

/***/ "./컴포넌트들/키워드_검색바/키워드_검색바.js":
/*!**********************************!*\
  !*** ./컴포넌트들/키워드_검색바/키워드_검색바.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ 키워드_검색바)\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../컴포넌트/컴포넌트 */ \"./컴포넌트들/컴포넌트/컴포넌트.js\");\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../검색_버튼/검색_버튼 */ \"./컴포넌트들/검색_버튼/검색_버튼.js\");\n/* harmony import */ var _js_domUtility_domUtility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../js/domUtility/domUtility */ \"./js/domUtility/domUtility.js\");\n\r\n\r\n\r\nclass 키워드_검색바 extends ___WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    상태 = {\r\n        검색어: ''\r\n    };\r\n    constructor(부모, 속성) {\r\n        super(부모);\r\n        this.속성 = 속성;\r\n    }\r\n    HTML_추가() {\r\n        const { 부모 } = this;\r\n        const { 검색어 } = this.상태;\r\n        부모.innerHTML = `\r\n      <div data-testid=\"search-bar\">\r\n        <input data-testid=\"search-bar-input\" type=\"text\" value=\"${검색어}\" placeholder=\"검색어\"/>\r\n        <div data-testid=\"search-button-container\"></div>\r\n      </div>\r\n    `;\r\n    }\r\n    자식_렌더() {\r\n        this.검색_버튼_생성();\r\n        this.자식_배열.forEach((자식) => {\r\n            자식.렌더();\r\n        });\r\n    }\r\n    검색_버튼_생성() {\r\n        const { 검색, 검색_유형 } = this.속성;\r\n        const { 검색어 } = this.상태;\r\n        const { 부모 } = this;\r\n        const 컨테이너_선택자 = '[data-testid=\"search-button-container\"]';\r\n        const 컨테이너 = (0,_js_domUtility_domUtility__WEBPACK_IMPORTED_MODULE_2__[\"요소_찾기\"])(부모, 컨테이너_선택자);\r\n        const 속성 = {\r\n            검색,\r\n            검색어,\r\n            검색_유형\r\n        };\r\n        const 컴포넌트 = new ___WEBPACK_IMPORTED_MODULE_1__[\"default\"](컨테이너, 속성);\r\n        this.자식_배열.push(컴포넌트);\r\n    }\r\n    태그_속성_초기화() {\r\n        const { 부모 } = this;\r\n        const 검색어_인풋_선택자 = '[data-testid=\"search-bar-input\"]';\r\n        const 검색어_인풋 = (0,_js_domUtility_domUtility__WEBPACK_IMPORTED_MODULE_2__[\"요소_찾기\"])(부모, 검색어_인풋_선택자);\r\n        (0,_js_domUtility_domUtility__WEBPACK_IMPORTED_MODULE_2__[\"인풋_커서_위치_초기화\"])(검색어_인풋);\r\n        검색어_인풋.focus();\r\n    }\r\n    이벤트_설정() {\r\n        const { 부모 } = this;\r\n        const 검색어_인풋_선택자 = '[data-testid=\"search-bar-input\"]';\r\n        const 검색어_인풋 = (0,_js_domUtility_domUtility__WEBPACK_IMPORTED_MODULE_2__[\"요소_찾기\"])(부모, 검색어_인풋_선택자);\r\n        검색어_인풋.addEventListener('input', this.입력_이벤트.bind(this));\r\n    }\r\n    입력_이벤트(e) {\r\n        const 입력 = e.target;\r\n        const 새_검색어 = (0,_js_domUtility_domUtility__WEBPACK_IMPORTED_MODULE_2__[\"요소_값_반환\"])(입력);\r\n        this.상태_변경({ 검색어: 새_검색어 });\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://electron-app/./%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EB%93%A4/%ED%82%A4%EC%9B%8C%EB%93%9C_%EA%B2%80%EC%83%89%EB%B0%94/%ED%82%A4%EC%9B%8C%EB%93%9C_%EA%B2%80%EC%83%89%EB%B0%94.js?");

/***/ }),

/***/ "./컴포넌트들/헤더/헤더.js":
/*!************************!*\
  !*** ./컴포넌트들/헤더/헤더.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ 헤더)\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../컴포넌트/컴포넌트 */ \"./컴포넌트들/컴포넌트/컴포넌트.js\");\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../검색_유형_상자/검색_유형_상자 */ \"./컴포넌트들/검색_유형_상자/검색_유형_상자.js\");\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../키워드_검색바/키워드_검색바 */ \"./컴포넌트들/키워드_검색바/키워드_검색바.js\");\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../브랜드_검색바/브랜드_검색바 */ \"./컴포넌트들/브랜드_검색바/브랜드_검색바.js\");\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../검색_결과_상자/검색_결과_상자 */ \"./컴포넌트들/검색_결과_상자/검색_결과_상자.js\");\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../다운로드바/다운로드바 */ \"./컴포넌트들/다운로드바/다운로드바.js\");\n/* harmony import */ var _js_domUtility_domUtility__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../js/domUtility/domUtility */ \"./js/domUtility/domUtility.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nclass 헤더 extends ___WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    constructor(부모, 속성) {\r\n        super(부모);\r\n        this.속성 = 속성;\r\n    }\r\n    HTML_추가() {\r\n        const { 부모 } = this;\r\n        부모.innerHTML = `\r\n    <header data-testid=\"header\">\r\n      <a href=\"https://www.iherb.com\" target=\"_blank\">사이트 이동</a>\r\n      <div data-testid=\"search-type-container\"></div>\r\n      <div data-testid=\"search-bar-container\"></div>\r\n      <div data-testid=\"search-result-container\"></div>\r\n      <div data-testid=\"download-bar-container\"></div>\r\n    </header>\r\n    `;\r\n    }\r\n    자식_렌더() {\r\n        this.검색_유형_상자_생성();\r\n        this.검색바_생성();\r\n        this.다운로드바_생성();\r\n        this.검색_결과_상자_생성();\r\n        this.자식_배열.forEach((자식) => {\r\n            자식.렌더();\r\n        });\r\n    }\r\n    검색_유형_상자_생성() {\r\n        const { 부모 } = this;\r\n        const { 검색_유형, 검색_유형_변경 } = this.속성;\r\n        const 속성 = {\r\n            검색_유형,\r\n            검색_유형_변경\r\n        };\r\n        const 컨테이너_선택자 = '[data-testid=\"search-type-container\"]';\r\n        const 컴포넌트_컨테이너 = (0,_js_domUtility_domUtility__WEBPACK_IMPORTED_MODULE_6__[\"요소_찾기\"])(부모, 컨테이너_선택자);\r\n        const 컴포넌트 = new ___WEBPACK_IMPORTED_MODULE_1__[\"default\"](컴포넌트_컨테이너, 속성);\r\n        this.자식_배열.push(컴포넌트);\r\n    }\r\n    검색바_생성() {\r\n        const { 부모 } = this;\r\n        const { 검색_유형, 검색 } = this.속성;\r\n        const 속성 = {\r\n            검색_유형,\r\n            검색\r\n        };\r\n        const 컨테이너_선택자 = '[data-testid=\"search-bar-container\"]';\r\n        const 컴포넌트_컨테이너 = (0,_js_domUtility_domUtility__WEBPACK_IMPORTED_MODULE_6__[\"요소_찾기\"])(부모, 컨테이너_선택자);\r\n        const 컴포넌트 = 검색_유형 === 'keyword' ? new ___WEBPACK_IMPORTED_MODULE_2__[\"default\"](컴포넌트_컨테이너, 속성) : new ___WEBPACK_IMPORTED_MODULE_3__[\"default\"](컴포넌트_컨테이너, 속성);\r\n        this.자식_배열.push(컴포넌트);\r\n    }\r\n    다운로드바_생성() {\r\n        const { 부모 } = this;\r\n        const { 다운로드 } = this.속성;\r\n        const 속성 = {\r\n            다운로드\r\n        };\r\n        const 컨테이너_선택자 = '[data-testid=\"download-bar-container\"]';\r\n        const 컴포넌트_컨테이너 = (0,_js_domUtility_domUtility__WEBPACK_IMPORTED_MODULE_6__[\"요소_찾기\"])(부모, 컨테이너_선택자);\r\n        const 컴포넌트 = new ___WEBPACK_IMPORTED_MODULE_5__[\"default\"](컴포넌트_컨테이너, 속성);\r\n        this.자식_배열.push(컴포넌트);\r\n    }\r\n    검색_결과_상자_생성() {\r\n        const { 부모 } = this;\r\n        const { 검색어, 마지막_페이지_번호 } = this.속성;\r\n        const 속성 = {\r\n            검색어,\r\n            마지막_페이지_번호\r\n        };\r\n        const 컨테이너_선택자 = '[data-testid=\"search-result-container\"]';\r\n        const 컴포넌트_컨테이너 = (0,_js_domUtility_domUtility__WEBPACK_IMPORTED_MODULE_6__[\"요소_찾기\"])(부모, 컨테이너_선택자);\r\n        const 컴포넌트 = new ___WEBPACK_IMPORTED_MODULE_4__[\"default\"](컴포넌트_컨테이너, 속성);\r\n        this.자식_배열.push(컴포넌트);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://electron-app/./%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EB%93%A4/%ED%97%A4%EB%8D%94/%ED%97%A4%EB%8D%94.js?");

/***/ }),

/***/ "./데이터/브랜드.json":
/*!**********************!*\
  !*** ./데이터/브랜드.json ***!
  \**********************/
/***/ ((module) => {

eval("module.exports = JSON.parse('{\"21st Century\":\"21st-century-health-care\",\"Acure\":\"acure\",\"Andalou Naturals\":\"andalou-naturals\",\"Aura Cacia\":\"aura-cacia\",\"Aveeno\":\"aveeno\",\"Azelique\":\"azelique\",\"Bluebonnet Nutrition\":\"bluebonnet-nutrition\",\"California Gold Nutrition\":\"california-gold-nutrition\",\"Carlson Labs\":\"carlson-labs\",\"ChildLife\":\"childlife\",\"Country Life\":\"country-life\",\"Derma E\":\"derma-e\",\"Desert Essence\":\"desert-essence\",\"Doctor Trusted Brands\":\"doctor-trusted-brands\",\"Doctor\\'s Best\":\"doctors-best\",\"Enzymedica\":\"enzymedica\",\"Frontier Natural Products\":\"frontier-natural-products\",\"Garden of Life\":\"garden-of-life\",\"Gerber\":\"gerber\",\"Heritage Store\":\"heritage-store\",\"iHerb Brands\":\"iherb-brands\",\"InstaNatural\":\"instanatural\",\"Jarrow Formulas\":\"jarrow-formulas\",\"K-Beauty\":\"k-beauty\",\"Lake Avenue Nutrition\":\"lake-avenue-nutrition\",\"Life-flo\":\"life-flo\",\"Life Extension\":\"life-extension\",\"Mad Hippie\":\"mad-hippie-skin-care-products\",\"Manuka Doctor\":\"manuka-doctor\",\"MegaFood\":\"megafood\",\"Mild By Nature\":\"mild-by-nature\",\"MRM\":\"mrm\",\"Muscletech\":\"muscletech\",\"Natrol\":\"natrol\",\"Natural Factors\":\"natural-factors\",\"Nature\\'s Answer\":\"nature-s-answer\",\"Nature\\'s Bounty\":\"nature-s-bounty\",\"Nature\\'s Plus\":\"nature-s-plus\",\"Nature\\'s Way\":\"nature-s-way\",\"Neocell\":\"neocell\",\"Nordic Naturals\":\"nordic-naturals\",\"Now Foods\":\"now-foods\",\"Nubian Heritage\":\"nubian-heritage\",\"Optimum Nutrition\":\"optimum-nutrition\",\"Oslomega\":\"oslomega\",\"Paradise Herbs\":\"paradise-herbs\",\"Pet Naturals of Vermont\":\"pet-naturals-of-vermont\",\"Sambucol\":\"sambucol\",\"Sierra Fit\":\"sierra-fit\",\"Solaray\":\"solaray\",\"Solgar\":\"solgar\",\"Source Naturals\":\"source-naturals\",\"Sports Research\":\"sports-research\",\"Super Nutrition\":\"super-nutrition\",\"Thorne Research\":\"thorne-research\",\"Trace Minerals\":\"trace-minerals\",\"Ultamins\":\"ultamins\",\"Vitables\":\"vitables\",\"Weleda\":\"weleda\"}');\n\n//# sourceURL=webpack://electron-app/./%EB%8D%B0%EC%9D%B4%ED%84%B0/%EB%B8%8C%EB%9E%9C%EB%93%9C.json?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;