export function 특정_요소이면(타겟_요소, 비교_요소들) {
    return 비교_요소들.some((요소) => 타겟_요소 instanceof 요소);
}
