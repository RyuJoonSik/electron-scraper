import {
  특정_요소이면,
  옵션_배열_생성,
  태그_속성_나열,
  옵션_선택,
  요소_값_반환,
  요소_찾기,
  인풋_커서_위치_초기화
} from './domUtility';

describe('특정_요소이면', () => {
  it('타겟 요소가 input이거나 label인지 판별한다.', () => {
    const 타겟_요소 = document.createElement('input');
    const 결과 = 특정_요소이면(타겟_요소, [HTMLLabelElement, HTMLInputElement]);

    expect(결과).toBe(true);
  });
});

describe('옵션_배열_생성', () => {
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
    const 옵션_배열 = 옵션_배열_생성(사전, 공통_속성);
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

describe('옵션_선택', () => {
  it('옵션 요소의 selected 속성 값을 true로 바꾼다.', () => {
    const 옵션 = document.createElement('option');

    expect(옵션.selected).toBe(false);
    옵션_선택(옵션);
    expect(옵션.selected).toBe(true);
  });
});

describe('요소_값_반환', () => {
  it('인풋 요소의 value 값을 반환한다.', () => {
    const 인풋 = document.createElement('input');
    const 값 = 'abc';
    인풋.value = 값;
    const 결과 = 요소_값_반환(인풋);

    expect(결과).toBe(값);
  });
});

describe('요소_찾기', () => {
  it('부모 요소에서 셀렉터에 해당하는 요소를 반환한다', () => {
    const 부모 = document.createElement('div');
    const 자식 = document.createElement('div');
    자식.dataset.testid = 'download-bar-start-page';

    부모.appendChild(자식);

    const 셀렉터 = '[data-testid="download-bar-start-page"]';
    const 결과 = 요소_찾기(부모, 셀렉터);

    expect(결과).toBe(자식);
  });
});

describe('인풋_커서_위치_초기화', () => {
  it('인풋 커서의 위치를 입력된 문자열의 뒤로 옮긴다.', () => {
    const 인풋 = document.createElement('input');
    const 값 = 'abc';
    인풋.value = 값;
    인풋.selectionStart = 인풋.selectionEnd = 0;

    인풋_커서_위치_초기화(인풋);

    const {selectionStart, selectionEnd} = 인풋;
    const 인풋_값_길이 = 값.length;

    expect(selectionStart).toBe(인풋_값_길이);
    expect(selectionEnd).toBe(인풋_값_길이);
  });
});
