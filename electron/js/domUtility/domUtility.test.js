import {특정_요소이면} from './domUtility';

describe('특정_요소이면', () => {
  it('타겟 요소가 input이거나 label인지 판별', () => {
    const 타겟_요소 = document.createElement('input');
    const 결과 = 특정_요소이면(타겟_요소, [HTMLLabelElement, HTMLInputElement]);

    expect(결과).toBe(true);
  });
});
