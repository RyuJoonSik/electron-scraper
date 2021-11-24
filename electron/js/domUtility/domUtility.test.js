import {특정_요소이면, 옵션_태그_배열_생성, 태그_속성_나열} from './domUtility';

describe('특정_요소이면', () => {
  it('타겟 요소가 input이거나 label인지 판별한다.', () => {
    const 타겟_요소 = document.createElement('input');
    const 결과 = 특정_요소이면(타겟_요소, [HTMLLabelElement, HTMLInputElement]);

    expect(결과).toBe(true);
  });
});

describe('옵션_태그_배열_생성', () => {
  it('key(문장열): value(문자열) 객체로 옵션 태그 배열을 생성한다.', () => {
    const 사전 = {
      '21st Century': '21st-century-health-care',
      Acure: 'acure',
      'Andalou Naturals': 'andalou-naturals'
    };
    const 공통_속성 = {
      'data-testid': 'search-bar-option',
      class: 'option'
    };
    const 옵션_배열 = 옵션_태그_배열_생성(사전, 공통_속성);
    const 예상_결과1 = `<option data-testid="search-bar-option" class="option" value="21st-century-health-care">21st Century</option>`;
    const 예상_결과2 = `<option data-testid="search-bar-option" class="option" value="acure">Acure</option>`;
    const 예상_결과3 = `<option data-testid="search-bar-option" class="option" value="andalou-naturals">Andalou Naturals</option>`;

    expect(옵션_배열[0]).toBe(예상_결과1);
    expect(옵션_배열[1]).toBe(예상_결과2);
    expect(옵션_배열[2]).toBe(예상_결과3);
  });
});

describe('태그_속성_나열', () => {
  it('객체에 포함된 모든 속성들로 나열된 key="value" 문자열을 생성한다.', () => {
    const 태그_속성 = {
      'data-testid': 'search-bar-option',
      class: 'option'
    };
    const 공통_속성 = 태그_속성_나열(태그_속성);
    const 예상_결과 = `data-testid="search-bar-option" class="option"`;

    expect(공통_속성).toBe(예상_결과);
  });
});
