interface 요소 {
  new (): HTMLElement;
  prototype: HTMLElement;
}

export function 특정_요소이면(타겟_요소: HTMLElement, 비교_요소들: 요소[]) {
  return 비교_요소들.some((요소) => 타겟_요소 instanceof 요소);
}
