export default class 돔_업데이터 {
  요소_업데이트(부모_요소: HTMLElement, 기존_요소: HTMLElement, 새_요소: HTMLElement) {
    if (!새_요소 && 기존_요소) {
      기존_요소.remove();

      return;
    }

    if (새_요소 && !기존_요소) {
      부모_요소.appendChild(새_요소);
    }

    if (새_요소.nodeName !== 기존_요소.nodeName) {
      // const index = [...부모_요소.childNodes].indexOf(기존_요소);
      기존_요소.before(새_요소);
      기존_요소.remove();

      return;
    }
    console.log(기존_요소.getAttributeNames());
    console.log(새_요소.getAttributeNames());
    // this.어트리뷰트_업데이트(기존_요소 as Element, 새_요소 as Element);

    // const 새_자식들 = [...새_요소.childNodes];
    // const 기존_자식들 = [...기존_요소.childNodes];
    // const 최대_크기 = Math.max(새_자식들.length, 기존_자식들.length);

    // for (let 인덱스 = 0; 인덱스 < 최대_크기; 인덱스++) {
    //   this.요소_업데이트(기존_요소, 새_자식들[인덱스] as HTMLElement, 기존_자식들[인덱스] as HTMLElement);
    // }
  }

  어트리뷰트_업데이트(기존_요소: Element, 새_요소: Element) {
    for (const {name: 어트리뷰트, value: 새_값} of [...새_요소.attributes]) {
      const 기존_값 = 기존_요소.getAttribute(어트리뷰트);

      if (새_값 !== 기존_값) {
        기존_요소.setAttribute(어트리뷰트, 새_값);
      }
    }

    for (const {name: 어트리뷰트} of [...기존_요소.attributes]) {
      if (!새_요소.getAttribute(어트리뷰트)) {
        기존_요소.removeAttribute(어트리뷰트);
      }
    }
  }
}
