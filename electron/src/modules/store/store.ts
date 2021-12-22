import {옵저버_객체} from '../observer/observer';

interface 문자열_프로퍼티_객체 {
  [키: string]: any;
}
// interface 스토어 {
//   readonly 상태: 문자열_프로퍼티_객체;
//   상태_변경(새_상태: 문자열_프로퍼티_객체): void;
// }

// interface 리듀서 {
//   (새_전역_상태: 전역_상태, 액션: 액션): 전역_상태;
// }

// export const 스토어: 스토어 = {
//   상태: 전역_상태로_변환({
//     a: 10,
//     b: 20
//   }),

//   상태_변경(새_상태) {
//     for (const [키, 값] of Object.entries(새_상태)) {
//       if (this.상태[키]) {
//         this.상태[키] = 값;
//       }
//     }
//   }
// };
interface 액션 {
  타입: string;
  페이로드: any;
}

interface 상태 {
  a: number;
  b: number;
}

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

class 스토어 {
  private readonly 상태: 상태 = {
    a: 10,
    b: 20
  };
  private readonly 전역_상태 = 옵저버_객체.전역_상태로_변환(this.상태) as 상태;

  // private readonly 동결_상태 = this.동결_상태_변환() as 상태;

  // private 동결_상태_변환(전역_상태 = this.전역_상태) {
  //   const 프로퍼티_객체 = Object.entries(전역_상태).reduce((객체: 문자열_프로퍼티_객체, [키, 값]) => {
  //     객체[키] = {
  //       get() {
  //         return 값;
  //       },

  //       enumerable: true
  //     };

  //     return 객체;
  //   }, {});

  //   const 동결_상태 = {};

  //   Object.defineProperties(동결_상태, 프로퍼티_객체);

  //   return 동결_상태;
  // }

  상태_조회() {
    return this.전역_상태;
  }

  디스패치(액션: 액션) {
    const {전역_상태} = this;
    const 새_전역_상태 = this.리듀서(전역_상태, 액션);

    for (const [새_전역_상태_키, 새_전역_상태_값] of Object.entries(새_전역_상태) as Entries<상태>) {
      if (전역_상태[새_전역_상태_키] && 전역_상태[새_전역_상태_키] !== 새_전역_상태_값) {
        전역_상태[새_전역_상태_키] = 새_전역_상태_값;
      }
    }
  }

  private 리듀서(새_전역_상태: 상태, 액션: 액션) {
    switch (액션.타입) {
      case 'UPDATE_A':
        return {...새_전역_상태, a: 액션.페이로드};
      case 'UPDATE_B':
        return {...새_전역_상태, b: 액션.페이로드};
      default:
        return 새_전역_상태;
    }
  }
}

export const 스토어_객체 = new 스토어();

// const 스토어_생성 = (리듀서: 리듀서) => {
//   const 전역_상태 = 옵저버_객체.전역_상태로_변환(리듀서());
//   const 프로퍼티_객체 = Object.entries(전역_상태).reduce((객체: 문자열_프로퍼티_객체, [키, 값]) => {
//     객체[키] = {
//       get() {
//         return 값;
//       }
//     };

//     return 객체;
//   }, {});

//   const 동결_객체 = {};

//   Object.defineProperties(동결_객체, 프로퍼티_객체);

//   function 디스패치(액션: {타입: string; 페이로드: any}) {
//     const 새_전역_상태 = 리듀서(전역_상태, 액션);

//     for (const [키, 값] of Object.entries(새_전역_상태)) {
//       if (전역_상태[키]) {
//         전역_상태[키] = 값;
//       }
//     }
//   }

//   function 상태_조회() {
//     return 동결_객체;
//   }

//   return {상태_조회, 디스패치};
// }
// const 전역_상태: 전역_상태 = {
//   a: 10,
//   b: 20
// };

// const 리듀서: 리듀서 = (새_전역_상태 = 전역_상태, 액션: {타입: string; 페이로드: any}) => {
//   switch (액션.타입) {
//     case 'A':
//       return {...새_전역_상태, a: 액션.페이로드};
//     case 'B':
//       return {...새_전역_상태, b: 액션.페이로드};
//     default:
//       return 새_전역_상태;
//   }
// }

// export const 스토어 = 스토어_생성();
