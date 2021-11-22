import 컴포넌트 from './Component.js';

describe('컴포넌트 클래스', () => {
  function 초기화(속성 = {}) {
    const { body: 부모 } = document;
    const 새_컴포넌트 = new 컴포넌트(부모, 속성);

    return 새_컴포넌트;
  }

  it('부모, 속성, 상태 프로퍼티들을 소유', () => {
    const 컴포넌트 = 초기화();

    expect(컴포넌트).toHaveProperty('부모');
    expect(컴포넌트).toHaveProperty('속성');
    expect(컴포넌트).toHaveProperty('상태');
  });

  it('렌더 메서드 호출 시 템플릿, 이벤트_설정, 자식_렌더 메서드 호출', () => {
    const 컴포넌트 = 초기화();

    const 스파이_템플릿 = jest.spyOn(컴포넌트, '템플릿');
    const 스파이_이벤트_설정 = jest.spyOn(컴포넌트, '이벤트_설정');
    const 스파이_자식_렌더 = jest.spyOn(컴포넌트, '자식_렌더');

    컴포넌트.렌더();
  });

  // it('is abstract class', () => {
  //   const parent = document.createElement('div');
  //   const props = { value: 'hello' };
  //   const component = set(parent, props);

  //   expect(component.부모_컴포넌트).toBe(parent);
  //   expect(component.속성).toEqual(props);

  //   const spyTemplate = jest.spyOn(component, '템플릿');
  //   const spySetUp = jest.spyOn(component, '설정');
  //   const spySetChildren = jest.spyOn(component, '자식_컴포넌트_렌더');
  //   // const spySetEvent = jest.spyOn(component, 'setEvent');

  //   component.렌더();

  //   expect(spyTemplate).toHaveBeenCalled();
  //   expect(parent.innerHTML).toBe('');
  //   expect(spySetUp).toHaveBeenCalled();
  //   expect(spySetChildren).toHaveBeenCalled();
  //   // expect(spySetEvent).toHaveBeenCalled();

  //   const newState = { value: 'hi' };
  //   const spyRender = jest.spyOn(component, '렌더');

  //   component.상태_설정(newState);

  //   expect(spyRender).toHaveBeenCalled();
  //   expect(component.상태).toEqual(newState);
  // });
});
