interface 요소 {
  // ex) HTMLInputElement
  new (): HTMLElement;
  prototype: HTMLElement;
}

interface 문자열_문자열_쌍 {
  [key: string]: string;
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

export function 요소_찾기(부모: HTMLElement, 셀렉터: string): HTMLElement {
  const 요소 = 부모.querySelector(셀렉터) as HTMLElement;

  return 요소;
}

export function 인풋_커서_위치_초기화(인풋_요소: HTMLInputElement) {
  const {value: 문자열} = 인풋_요소;
  const 문자열_길이 = 문자열.length;
  인풋_요소.selectionStart = 인풋_요소.selectionEnd = 문자열_길이;
}
