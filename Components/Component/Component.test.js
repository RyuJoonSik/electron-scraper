import 컴포넌트 from './Component.js';

describe('Component', () => {
  function set(parentEl, props) {
    const component = new 컴포넌트(parentEl, props);

    return component;
  }

  it('is abstract class', () => {
    const parent = document.createElement('div');
    const props = { value: 'hello' };
    const component = set(parent, props);

    expect(component.부모_컴포넌트).toBe(parent);
    expect(component.속성).toEqual(props);

    const spyTemplate = jest.spyOn(component, '템플릿');
    const spySetUp = jest.spyOn(component, '설정');
    const spySetChildren = jest.spyOn(component, '자식_컴포넌트_렌더');
    // const spySetEvent = jest.spyOn(component, 'setEvent');

    component.렌더();

    expect(spyTemplate).toHaveBeenCalled();
    expect(parent.innerHTML).toBe('');
    expect(spySetUp).toHaveBeenCalled();
    expect(spySetChildren).toHaveBeenCalled();
    // expect(spySetEvent).toHaveBeenCalled();

    const newState = { value: 'hi' };
    const spyRender = jest.spyOn(component, '렌더');

    component.상태_설정(newState);

    expect(spyRender).toHaveBeenCalled();
    expect(component.상태).toEqual(newState);
  });
});
