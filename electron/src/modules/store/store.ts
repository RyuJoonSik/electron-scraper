import {옵저버_객체} from '../observer/observer';

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
