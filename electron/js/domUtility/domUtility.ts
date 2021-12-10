import * as ExcelJS from 'exceljs';

interface 요소 {
  // ex) HTMLInputElement
  new (): HTMLElement;
  prototype: HTMLElement;
}

interface 문자열_문자열_쌍 {
  [key: string]: string;
}

interface 페이지_범위 {
  시작_페이지_번호: number;
  끝_페이지_번호: number;
}

interface 제품 {
  제품_ID: string;
  이름: string;
  링크: string;
  사용법: string;
  재고_상태: string;
  가격: string;
  배송비: string;
  별점: string;
  리뷰_수: string;
}

export function 특정_요소이면(타겟_요소: HTMLElement, 비교_요소들: 요소[]) {
  return 비교_요소들.some((요소) => 타겟_요소 instanceof 요소);
}

export function 옵션_배열_생성(사전: 문자열_문자열_쌍, 태그_속성: 문자열_문자열_쌍) {
  const 공통_속성 = 태그_속성_나열(태그_속성);
  const 옵션_태그_배열 = Object.entries(사전).map(
    ([단어, 뜻]) => `<option ${공통_속성} value="${뜻}">${단어}</option>`
  );

  return 옵션_태그_배열;
}

export function 태그_속성_나열(태그_속성: 문자열_문자열_쌍) {
  const 공통_속성 = Object.entries(태그_속성)
    .reduce((문자열, [속성, 값]) => {
      문자열 += `${속성}="${값}" `;

      return 문자열;
    }, '')
    .trimEnd();

  return 공통_속성;
}

export function 옵션_선택(옵션_요소: HTMLOptionElement) {
  옵션_요소.selected = true;
}

export function 요소_값_반환(요소: HTMLInputElement | HTMLOptionElement) {
  return 요소.value;
}

export function 요소_찾기(부모: HTMLElement | Document, 셀렉터: string): HTMLElement {
  const 요소 = 부모.querySelector(셀렉터) as HTMLElement;

  return 요소;
}

export function 인풋_커서_위치_초기화(인풋_요소: HTMLInputElement) {
  const {value: 문자열} = 인풋_요소;
  const 문자열_길이 = 문자열.length;
  인풋_요소.selectionStart = 인풋_요소.selectionEnd = 문자열_길이;
}

export async function DOM_생성(URL: string) {
  const HTML_텍스트 = await 페이지_요청(URL);
  const DOM = DOM_변환(HTML_텍스트);

  return DOM;
}

export async function 페이지_요청(URL: string) {
  const 응답 = await fetch(URL);
  const HTML_텍스트 = await 응답.text();
  // if (!응답.ok) {
  //   throw new Error();
  // }

  return HTML_텍스트;
}

export function DOM_변환(HTML_텍스트: string) {
  const DOM_파서 = new DOMParser();
  const DOM = DOM_파서.parseFromString(HTML_텍스트, 'text/html');

  return DOM;
}

export function 마지막_페이지_번호_탐색(DOM: Document, 선택자 = '.pagination-link') {
  const 페이지_번호_리스트 = 요소_리스트_찾기(DOM, 선택자);
  const 길이 = 리스트_길이_추출(페이지_번호_리스트);
  const 마지막_인덱스 = 길이 - 1;
  const 마지막_페이지_번호 = 페이지_번호_리스트[마지막_인덱스] as HTMLElement;
  const 마지막_페이지_번호_텍스트 = 텍스트_컨텐츠_추출(마지막_페이지_번호);

  return Number(마지막_페이지_번호_텍스트);
}

export function 요소_리스트_찾기(부모: HTMLElement | Document, 선택자: string): Element[] {
  const 요소_리스트 = Array.from(부모.querySelectorAll(선택자));

  return 요소_리스트;
}

export function 리스트_길이_추출(리스트: any[] | NodeListOf<Element>) {
  const 길이 = 리스트.length;

  return 길이;
}

export function 텍스트_컨텐츠_추출(요소: HTMLElement) {
  const 텍스트 = 요소.textContent?.trim();

  return 텍스트;
}

export function 쿼리_스트링이_있다면(검색_URL: string) {
  const 결과 = 검색_URL.includes('?');

  return 결과;
}

export function 페이지_번호_배열_생성(시작_페이지_번호: number, 끝_페이지_번호: number) {
  const 페이지_수 = 끝_페이지_번호 - 시작_페이지_번호 + 1;
  const 페이지_번호_배열 = Array.from({length: 페이지_수}, (_, 인덱스) => 인덱스 + 시작_페이지_번호);

  return 페이지_번호_배열;
}

export function 페이지_제품_URL_배열_탐색(페이지: Document, 선택자 = '.absolute-link.product-link') {
  const 링크_리스트 = 요소_리스트_찾기(페이지, 선택자);
  const 링크_배열 = [...링크_리스트] as HTMLAnchorElement[];

  return 링크_배열.map(({href}) => href);
}

export async function URL_배열_DOM_파싱(URL_배열: string[]) {
  const DOM_배열 = [];

  for await (let URL of URL_배열) {
    const DOM = await DOM_생성(URL);

    DOM_배열.push(DOM);
  }

  return DOM_배열;
}

export function 제품_URL_탐색(페이지: Document, 선택자 = '.ga-product.product-grouping-refresh') {
  const 요소 = 요소_찾기(페이지, 선택자);
  const URL = 요소.getAttribute('itemid') as string;

  return URL;
}

export function 제품_이름_탐색(페이지: Document, 선택자 = '#name') {
  const 요소 = 요소_찾기(페이지, 선택자);
  const 이름 = 텍스트_컨텐츠_추출(요소) as string;

  return 이름;
}

export function 제품_이미지_URL_배열_탐색(페이지: Document, 선택자 = '.lazy.img-responsive') {
  const 이미지_리스트 = 요소_리스트_찾기(페이지, 선택자);
  const 이미지_배열 = [...이미지_리스트] as HTMLAnchorElement[];
  const 이미지_URL_배열 = 이미지_배열.map(({dataset: {lazyload}}) => lazyload);

  return 이미지_URL_배열;
}

export function 제품_리뷰_탐색(페이지: Document, 선택자 = '#product-summary-header .stars') {
  const 요소 = 요소_찾기(페이지, 선택자);
  const {title: 리뷰} = 요소;
  const [별점, 리뷰_수] = 리뷰.split(' - ');

  return [별점, 리뷰_수];
}

export function 제품_가격_탐색(페이지: Document, 선택자 = '#price') {
  const 요소 = 요소_찾기(페이지, 선택자);
  const 가격 = 텍스트_컨텐츠_추출(요소) as string;

  return 가격;
}

export function 제품_배송비_지불(제품_가격: string) {
  const 가격 = Number(제품_가격.slice(1));
  const 배송비_무료_금액 = 20; // $20
  let 배송비 = '';

  if (가격 < 배송비_무료_금액) {
    배송비 = '$5';
  }

  return 배송비;
}

export function 제품_사용법_탐색(페이지: Document, 선택자 = '.prodOverviewDetail') {
  const 요소_리스트 = 요소_리스트_찾기(페이지, 선택자);
  const [제품_사용법_문단] = 요소_리스트;
  const 제품_사용법 = 텍스트_컨텐츠_추출(제품_사용법_문단 as HTMLElement) as string;

  return 제품_사용법;
}

export function 제품_재고_상태_탐색(페이지: Document, 선택자 = '#stock-status > *:first-child') {
  const 요소 = 요소_찾기(페이지, 선택자);
  const 재고_상태 = 텍스트_컨텐츠_추출(요소) as string;

  return 재고_상태;
}

export function 제품_정보_생성(페이지: Document) {
  const 이름 = 제품_이름_탐색(페이지);
  const 가격 = 제품_가격_탐색(페이지);
  const 배송비 = 제품_배송비_지불(가격);
  const [별점, 리뷰_수] = 제품_리뷰_탐색(페이지);

  const 제품: 제품 = {
    제품_ID: 이름,
    이름,
    가격,
    배송비,
    별점,
    리뷰_수,
    링크: 제품_URL_탐색(페이지),
    사용법: 제품_사용법_탐색(페이지),
    재고_상태: 제품_재고_상태_탐색(페이지)
  };

  return 제품;
}

export function 파일_경로_생성(폴더_경로: string, 파일_이름: string) {
  const 프로젝트_루트 = __dirname;
  const 파일_경로 = 프로젝트_루트 + 폴더_경로 + 파일_이름;

  return 파일_경로;
}

export function 엑셀_파일_경로_생성(폴더_경로 = '/products/', 파일_이름 = 'Products.xlsx') {
  const 파일_경로 = 파일_경로_생성(폴더_경로, 파일_이름);

  return 파일_경로;
}

export async function 제품_정보_배열_생성(기본_URL: string, {시작_페이지_번호, 끝_페이지_번호}: 페이지_범위) {
  const URL = 쿼리_스트링이_있다면(기본_URL) ? 기본_URL + '&p=' : 기본_URL + '?p=';
  const 페이지_번호_배열 = 페이지_번호_배열_생성(시작_페이지_번호, 끝_페이지_번호);
  const URL_배열 = 페이지_번호_배열.map((페이지_번호) => URL + 페이지_번호);
  const DOM_배열: Document[] = await URL_배열_DOM_파싱(URL_배열);
  const 제품_URL_배열 = DOM_배열.map((DOM) => 페이지_제품_URL_배열_탐색(DOM)).flat();
  const 제품_DOM_배열: Document[] = await URL_배열_DOM_파싱(제품_URL_배열);
  const 제품_정보_배열 = 제품_DOM_배열.map((제품_DOM) => 제품_정보_생성(제품_DOM));

  return 제품_정보_배열;
}

export function 워크시트_칼럼_배열_생성(칼럼_배열: string[]) {
  const 워크시트_칼럼_배열 = 칼럼_배열.map((칼럼) => {
    const 헤더 = 칼럼;
    const 키 = 칼럼.replace(/\s/g, '_');
    const 칼럼_객체 = {
      header: 헤더,
      key: 키
    };

    return 칼럼_객체;
  });

  return 워크시트_칼럼_배열;
}

export function 워크시트_제품_칼럼_배열_생성(
  제품_칼럼_배열 = ['제품 ID', '링크', '이름', '가격', '배송비', '사용법', '별점', '리뷰 수', '재고 상태']
) {
  const 워크시트_칼럼_배열 = 워크시트_칼럼_배열_생성(제품_칼럼_배열);

  return 워크시트_칼럼_배열;
}

export function 워크시트_생성(워크북: ExcelJS.Workbook, 워크시트_이름 = 'My Products') {
  const 워크시트 = 워크북.addWorksheet(워크시트_이름);

  return 워크시트;
}

export function 워크시트_설정(워크시트: ExcelJS.Worksheet, 제품_정보_배열: 제품[]) {
  워크시트.columns = 워크시트_제품_칼럼_배열_생성();

  제품_정보_배열.forEach((제품_정보) => {
    워크시트.addRow(제품_정보);
  });
}

export function 인풋_값_반환(부모: HTMLElement | Document, 선택자: string) {
  const 인풋 = 요소_찾기(부모, 선택자) as HTMLInputElement;
  const 값 = 요소_값_반환(인풋);

  return 값;
}

export function 워크북_생성() {
  const 워크북 = new ExcelJS.Workbook();

  return 워크북;
}

export async function 읽은_엑셀_파일_워크북_생성(워크북: ExcelJS.Workbook, 엑셀_파일_경로: string) {
  const 제품_워크북 = await 워크북.xlsx.readFile(엑셀_파일_경로);

  return 제품_워크북;
}

export function 워크_시트_추출(워크_북: ExcelJS.Workbook, 워크_시트_이름: string = 'My Products') {
  const 워크_시트 = 워크_북.getWorksheet(워크_시트_이름);

  return 워크_시트;
}

export function 엑셀_행_셀_값_추출(행: ExcelJS.Row, 행_식별자: number | string) {
  const 셀 = 행.getCell(행_식별자);

  return 셀;
}
