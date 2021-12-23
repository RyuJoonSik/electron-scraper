interface 읽기_전용_객체 {
  readonly [키: string]: any;
}

interface 읽기_쓰기_객체 {
  [키: string]: any;
}

class 옵저버 {
  private readonly _함수_셋: Set<Function> = new Set();

  함수_셋_초기화() {
    this.함수_셋.clear();
  }

  함수_등록(함수: Function) {
    this.함수_셋.add(함수);
  }

  전역_상태로_변환(상태: 읽기_전용_객체): 읽기_쓰기_객체 {
    const 함수_배열 = this.함수_셋;
    const 전역_상태 = {};
    const 프로퍼티_객체 = Object.entries(상태).reduce((객체: 읽기_쓰기_객체, [키, 값]) => {
      객체[키] = {
        get() {
          return 값;
        },

        set(새_값: any) {
          값 = 새_값;

          함수_배열.forEach((함수) => 함수());
        },
        enumerable: true
      };

      return 객체;
    }, {});

    Object.defineProperties(전역_상태, 프로퍼티_객체);

    return 전역_상태;
  }

  get 함수_셋() {
    return this._함수_셋;
  }
}

export const 옵저버_객체 = new 옵저버();

// const 옵저버_함수_배열: Set<Function> = new Set();

// export function 옵저버_함수_등록(함수: Function) {
//   옵저버_함수_배열.add(함수);
// }

// export function 전역_상태로_변환(상태: 문자열_프로퍼티_객체): 문자열_프로퍼티_객체 {
//   const 전역_상태 = {};

//   const 프로퍼티_객체 = Object.entries(상태).reduce((객체: 문자열_프로퍼티_객체, [키, 값]) => {
//     객체[키] = {
//       get() {
//         return 값;
//       },

//       set(새_값: any) {
//         값 = 새_값;

//         옵저버_함수_배열.forEach((함수) => {
//           함수();
//         });
//       }
//     };

//     return 객체;
//   }, {});

//   Object.defineProperties(전역_상태, 프로퍼티_객체);

//   return 전역_상태;

//   // Object.keys(상태).forEach((키) => {
//   //   let 값 = 상태[키];
//   //   // const 상태_변경_시_호출할_함수_배열: Set<Function> = new Set();

//   //   Object.defineProperty(상태, 키, {
//   //     get() {
//   //       // if (상태_변경_시_호출할_함수) 상태_변경_시_호출할_함수_배열.add(상태_변경_시_호출할_함수);

//   //       return 값;
//   //     },

//   //     set(새_값) {
//   //       값 = 새_값;

//   //       상태_변경_시_호출할_함수_배열.forEach((함수) => {
//   //         console.log('상태 변경 감지');
//   //         함수();
//   //       });
//   //     }
//   //   });
//   // });
//   // return 상태;
// }
