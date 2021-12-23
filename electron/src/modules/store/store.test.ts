import {스토어_객체} from './store';
import {옵저버_객체} from '../observer/observer';

describe('스토어 객체 테스트', () => {
  describe("'상태_조회' 메서드 테스트", () => {
    it('전역 상태를 반환한다.', () => {
      const 상태 = {
        a: 10,
        b: 20
      };
      const 전역_상태 = 스토어_객체.상태_조회();

      expect(전역_상태).toEqual(상태);
    });
  });

  describe("'리듀서' 메서드 테스트", () => {
    it("액션 타입이 'UPDATE_A'이면 프로퍼티 'a'의 값을 바꾼다.", () => {
      const 스토어 = 스토어_객체 as any;
      const 상태 = {
        a: 10,
        b: 20
      };
      const 액션 = {
        타입: 'UPDATE_A',
        페이로드: 100
      };
      const 새_전역_상태 = 스토어.리듀서(상태, 액션);

      상태.a = 100;

      expect(새_전역_상태).toEqual(상태);
    });

    it("액션 타입이 'UPDATE_B'이면 프로퍼티 'b'의 값을 바꾼다.", () => {
      const 스토어 = 스토어_객체 as any;
      const 상태 = {
        a: 10,
        b: 20
      };
      const 액션 = {
        타입: 'UPDATE_B',
        페이로드: 200
      };
      const 새_전역_상태 = 스토어.리듀서(상태, 액션);

      상태.b = 200;

      expect(새_전역_상태).toEqual(상태);
    });

    it('해당 액션 타입이 없으면 기본 값으로 입력 받은 상태를 반환한다.', () => {
      const 스토어 = 스토어_객체 as any;
      const 상태 = {
        a: 10,
        b: 20
      };
      const 액션 = {
        타입: 'UPDATE_C',
        페이로드: 300
      };
      const 새_전역_상태 = 스토어.리듀서(상태, 액션);

      expect(새_전역_상태).toEqual(상태);
    });
  });

  describe("'디스패치' 메서드 테스트", () => {
    it('리듀서로 생성한 새 전역 상태를 기존 전역 상태로 업데이트한다.', () => {
      const 액션 = {
        타입: 'UPDATE_A',
        페이로드: 100
      };
      const 새_전역_상태 = {
        a: 100,
        b: 20
      };

      스토어_객체.디스패치(액션);

      expect(스토어_객체.상태_조회()).toEqual(새_전역_상태);
    });

    it('새 전역 상태를 기존 전역 상태로 업데이트하는 과정에서 값이 변경되면 옵저버에 등록된 함수를 호출한다.', () => {
      const 함수_객체 = {
        함수1: jest.fn(),
        함수2: jest.fn(),
        함수3: jest.fn()
      };

      Object.entries(함수_객체).forEach(([, 함수]) => {
        옵저버_객체.함수_등록(함수);
      });

      const 액션 = {
        타입: 'UPDATE_A',
        페이로드: 1000
      };

      스토어_객체.디스패치(액션);
      const 스파이_배열 = [
        jest.spyOn(함수_객체, '함수1'),
        jest.spyOn(함수_객체, '함수2'),
        jest.spyOn(함수_객체, '함수3')
      ];

      스파이_배열.forEach((스파이) => {
        expect(스파이).toBeCalledTimes(1);
      });
    });
  });
});
