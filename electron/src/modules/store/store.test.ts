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
    it('액션에 따라 변경된 새 전역 상태를 생성한다.', () => {
      const 상태 = {
        a: 10,
        b: 20
      };
      const 액션 = {
        타입: 'UPDATE_A',
        페이로드: 100
      };
      const 새_전역_상태 = (스토어_객체 as any).리듀서(상태, 액션);
      상태.a = 100;

      expect(새_전역_상태).toEqual(상태);
    });
  });

  describe("'디스패치' 메서드 테스트", () => {
    it('액션에 따라 리듀서로 생성된 새 전역 상태를 기존 전역 상태에 적용시킨다.', () => {
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
        페이로드: 100
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
