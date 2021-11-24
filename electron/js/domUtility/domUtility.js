export function 특정_요소이면(타겟_요소, 비교_요소들) {
    return 비교_요소들.some((요소) => 타겟_요소 instanceof 요소);
}
export function 옵션_태그_배열_생성(사전, 태그_속성) {
    const 공통_속성 = 태그_속성_나열(태그_속성);
    const 옵션_태그_배열 = Object.entries(사전).map(([단어, 뜻]) => `<option ${공통_속성} value="${뜻}">${단어}</option>`);
    return 옵션_태그_배열;
}
export function 태그_속성_나열(태그_속성) {
    const 공통_속성 = Object.entries(태그_속성)
        .reduce((문자열, [속성, 값]) => {
        문자열 += `${속성}="${값}" `;
        return 문자열;
    }, '')
        .trimEnd();
    return 공통_속성;
}
