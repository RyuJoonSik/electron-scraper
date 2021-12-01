import {
  특정_요소이면,
  옵션_배열_생성,
  태그_속성_나열,
  옵션_선택,
  요소_값_반환,
  요소_찾기,
  인풋_값_반환,
  인풋_커서_위치_초기화,
  페이지_요청,
  DOM_변환,
  DOM_생성,
  마지막_페이지_번호_탐색,
  텍스트_컨텐츠_추출,
  요소_리스트_찾기,
  리스트_길이_추출,
  쿼리_스트링이_있다면,
  페이지_번호_배열_생성,
  페이지_제품_URL_배열_탐색,
  URL_배열_DOM_파싱,
  제품_URL_탐색,
  제품_이름_탐색,
  제품_이미지_URL_배열_탐색,
  제품_리뷰_탐색,
  제품_가격_탐색,
  제품_배송비_지불,
  제품_사용법_탐색,
  제품_재고_상태_탐색,
  제품_정보_생성,
  파일_경로_생성,
  엑셀_파일_경로_생성,
  제품_정보_배열_생성,
  워크_시트_칼럼_배열_생성,
  워크_시트_제품_칼럼_배열_생성,
  워크_시트_설정,
  워크_시트_생성
} from './domUtility';
import 목업_페이지 from '../../data/mockupPage.js';
import * as ExcelJS from 'exceljs';

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

describe('인풋_값_반환', () => {
  it('인풋 요소의 값을 반환한다.', () => {
    const 부모 = document.createElement('div');
    const 인풋 = document.createElement('input');
    const 값 = 'abc';
    const 선택자 = 'input';
    인풋.value = 값;

    부모.appendChild(인풋);

    const 결과 = 인풋_값_반환(부모, 선택자);

    expect(결과).toBe(값);
  });
});

describe('fetch 테스트', () => {
  async function 비타민_검색_페이지_DOM_생성() {
    const URL = 'https://kr.iherb.com/search?kw=vitamin';
    const DOM = await DOM_생성(URL);

    return DOM;
  }

  async function 제품_상세_페이지_DOM_생성() {
    const URL =
      'https://www.iherb.com/pr/21st-century-glucosamine-chondroitin-double-strength-500-mg-400-mg-400-easy-to-swallow-capsules/9406';
    const DOM = await DOM_생성(URL);

    return DOM;
  }

  describe('페이지_요청', () => {
    it('URL 문자열을 넘겨주면 해당 페이지의 HTML 텍스트를 반환한다.', async () => {
      const URL = 'https://kr.iherb.com/search?kw=vitamin';
      const 페이지 = await 페이지_요청(URL);

      expect(페이지).toBe(목업_페이지['비타민_검색']);
    });
  });

  describe('DOM_변환', () => {
    it('HTML 텍스트를 DOM 트리로 변환한다.', async () => {
      const URL = 'https://kr.iherb.com/search?kw=vitamin';
      const 페이지 = await 페이지_요청(URL);
      const DOM = DOM_변환(페이지);
      const {nodeName: 노드이름, nodeType: 노드타입} = DOM;

      expect(노드이름).toBe('#document');
      expect(노드타입).toBe(9);
    });
  });

  describe('DOM_생성', () => {
    it('URL을 DOM 트리로 변환한다.', async () => {
      const DOM = await 비타민_검색_페이지_DOM_생성();
      const {nodeName: 노드이름, nodeType: 노드타입} = DOM;

      expect(노드이름).toBe('#document');
      expect(노드타입).toBe(9);
    });
  });

  describe('텍스트_컨텐츠_추출', () => {
    it('요소의 텍스트 컨텐츠를 반환한다.', async () => {
      const DOM = await 비타민_검색_페이지_DOM_생성();
      const 선택자 = '.pagination-link';
      const 요소_리스트 = 요소_리스트_찾기(DOM, 선택자);
      const 길이 = 리스트_길이_추출(요소_리스트);
      const 마지막_페이지_번호 = 요소_리스트[길이 - 1];
      const 텍스트_컨텐츠 = 텍스트_컨텐츠_추출(마지막_페이지_번호);
      const 페이지_번호 = Number(텍스트_컨텐츠);

      expect(페이지_번호).toBe(417);
    });
  });

  describe('요소_리스트_찾기', () => {
    it('요소 리스트를 반환한다.', async () => {
      const DOM = await 비타민_검색_페이지_DOM_생성();
      const 선택자 = '.pagination-link';
      const 요소_리스트 = 요소_리스트_찾기(DOM, 선택자);

      expect(요소_리스트).toHaveLength(4);
    });
  });

  describe('리스트_길이_추출', () => {
    it('리스트의 길이를 반환한다.', async () => {
      const DOM = await 비타민_검색_페이지_DOM_생성();
      const 선택자 = '.pagination-link';
      const 요소_리스트 = 요소_리스트_찾기(DOM, 선택자);
      const 길이 = 리스트_길이_추출(요소_리스트);

      expect(요소_리스트).toHaveLength(길이);
    });
  });

  describe('마지막_페이지_번호_탐색', () => {
    it('페이지 번호 배열을 탐색 후 마지막 페이지 번호 요소를 반환한다.', async () => {
      const DOM = await 비타민_검색_페이지_DOM_생성();
      const 마지막_페이지_번호 = 마지막_페이지_번호_탐색(DOM);

      expect(마지막_페이지_번호).toBe(417);
    });

    // TODO: 검색결과가 단일 페이지일 경우 1반환하는 케이스 작성
  });

  describe('쿼리_스트링이_있다면', () => {
    it('URL에 쿼리 스트링이 있는지 판별한다.', () => {
      const URL1 = 'https://kr.iherb.com/search?kw=vitamin';
      const 결과1 = 쿼리_스트링이_있다면(URL1);

      expect(결과1).toBe(true);

      const URL2 = 'https://kr.iherb.com/c/andalou-naturals';
      const 결과2 = 쿼리_스트링이_있다면(URL2);

      expect(결과2).toBe(false);
    });
  });

  describe('페이지_번호_배열_생성', () => {
    it('시작 페이지 번호와 끝 페이지 번호로 페이지 번호 배열을 만든다.', () => {
      const [시작_페이지_번호, 끝_페이지_번호] = [5, 11];
      const 페이지_번호_배열 = 페이지_번호_배열_생성(시작_페이지_번호, 끝_페이지_번호);

      페이지_번호_배열.forEach((페이지_번호, 인덱스) => {
        expect(페이지_번호).toBe(시작_페이지_번호 + 인덱스);
      });
    });
  });

  describe('페이지_제품_URL_배열_탐색', () => {
    it('검색된 페이지의 제품 URL 배열을 반환한다.', async () => {
      const DOM = await 비타민_검색_페이지_DOM_생성();
      const 페이지_번호_배열 = 페이지_제품_URL_배열_탐색(DOM);
      const 제품_URL =
        'https://kr.iherb.com/pr/california-gold-nutrition-vitamin-c-gummies-natural-orange-flavor-gelatin-free-90-gummies/69569';

      expect(페이지_번호_배열).toHaveLength(1);
      expect(페이지_번호_배열[0]).toBe(제품_URL);
    });
  });

  describe('URL_배열_DOM_파싱', () => {
    it('URL 배열을 DOM 트리로 변환 후 반환한다.', async () => {
      const URL_배열 = [];
      const URL = 'https://kr.iherb.com/search?kw=vitamin';

      URL_배열.push(URL);

      const [DOM] = await URL_배열_DOM_파싱(URL_배열);
      const {nodeName: 노드이름, nodeType: 노드타입} = DOM;

      expect(노드이름).toBe('#document');
      expect(노드타입).toBe(9);
    });
  });

  describe('제품_URL_탐색', () => {
    it('제품 페이지에서 해당 제품 URL을 찾아 반환한다.', async () => {
      const DOM = await 제품_상세_페이지_DOM_생성();
      const URL =
        'https://www.iherb.com/pr/21st-century-glucosamine-chondroitin-double-strength-500-mg-400-mg-400-easy-to-swallow-capsules/9406';
      const 제품_URL = 제품_URL_탐색(DOM);

      expect(제품_URL).toBe(URL);
    });
  });

  describe('제품_이름_탐색', () => {
    it('제품 페이지에서 해당 제품 이름을 찾아 반환한다.', async () => {
      const DOM = await 제품_상세_페이지_DOM_생성();
      const 제품_이름 =
        '21st Century, Glucosamine / Chondroitin, Double Strength, 500 mg / 400 mg, 400 Easy to Swallow Capsules';
      const 결과 = 제품_이름_탐색(DOM);

      expect(결과).toBe(제품_이름);
    });
  });

  describe('제품_이미지_URL_배열_탐색', () => {
    it('제품 페이지에서 해당 제품의 이미지 URL들을 찾아 배열로 반환한다.', async () => {
      const DOM = await 제품_상세_페이지_DOM_생성();
      const 제품_이미지_URL_배열 = 제품_이미지_URL_배열_탐색(DOM);
      const 길이 = 2;
      const 제품_첫번째_이미지_URL = 'https://s3.images-iherb.com/cen/cen22291/y/15.jpg';

      expect(제품_이미지_URL_배열).toHaveLength(길이);
      expect(제품_이미지_URL_배열[0]).toBe(제품_첫번째_이미지_URL);
    });
  });

  describe('제품_리뷰_탐색', () => {
    it('제품 페이지에서 해당 제품 후기(별점, 후기 수)를 찾아 반환한다.', async () => {
      const DOM = await 제품_상세_페이지_DOM_생성();
      const [별점, 리뷰_수] = 제품_리뷰_탐색(DOM);
      const 별점_결과 = '4.7/5';
      const 리뷰_수_결과 = '324 Reviews';

      expect(별점).toBe(별점_결과);
      expect(리뷰_수).toBe(리뷰_수_결과);
    });

    // TODO: 제품 후기가 없을 케이스 작성
  });

  describe('제품_가격_탐색', () => {
    it('제품 페이지에서 해당 제품 가격을 찾아 반환한다.', async () => {
      const DOM = await 제품_상세_페이지_DOM_생성();
      const 가격 = '$51.95';
      const 결과 = 제품_가격_탐색(DOM);

      expect(결과).toBe(가격);
    });

    // TODO: 제품 가격이 없는 케이스(단종) 작성
  });

  describe('제품_배송비_지불', () => {
    it('제품 가격이 $20 미만이면 $5달러의 배송비가 든다.', async () => {
      const 가격1 = '$51.95';
      const 결과1 = 제품_배송비_지불(가격1);

      expect(결과1).toBe('');

      const 가격2 = '$19';
      const 결과2 = 제품_배송비_지불(가격2);

      expect(결과2).toBe('$5');
    });
  });

  describe('제품_사용법_탐색', () => {
    it('제품 페이지에서 해당 제품 사용법을 찾아 반환한다.', async () => {
      const DOM = await 제품_상세_페이지_DOM_생성();
      const 제품_사용법 =
        'As a dietary supplement, adults take one (1) capsule with any meal, three (3) times daily or as directed by a healthcare provider. Do not exceed recommended dosage. Individual results may vary.';
      const 결과 = 제품_사용법_탐색(DOM);

      expect(결과).toBe(제품_사용법);
    });
  });

  describe('제품_재고_상태_탐색', () => {
    it('제품 페이지에서 해당 제품 재고 상태를 찾아 반환한다.', async () => {
      const DOM = await 제품_상세_페이지_DOM_생성();
      const 재고_상태 = 'In Stock';
      const 결과 = 제품_재고_상태_탐색(DOM);

      expect(결과).toBe(재고_상태);
    });
  });

  describe('제품_정보_생성', () => {
    it('제품 페이지에서 해당 제품의 정보들을 모아 객체로 반환한다.', async () => {
      const DOM = await 제품_상세_페이지_DOM_생성();
      const {이름, 링크, 가격, 배송비, 사용법, 별점, 리뷰_수, 재고_상태} = 제품_정보_생성(DOM);

      const 예상_이름 =
        '21st Century, Glucosamine / Chondroitin, Double Strength, 500 mg / 400 mg, 400 Easy to Swallow Capsules';
      const 예상_링크 =
        'https://www.iherb.com/pr/21st-century-glucosamine-chondroitin-double-strength-500-mg-400-mg-400-easy-to-swallow-capsules/9406';
      const 예상_가격 = '$51.95';
      const 예상_배송비 = '';
      const 예상_사용법 =
        'As a dietary supplement, adults take one (1) capsule with any meal, three (3) times daily or as directed by a healthcare provider. Do not exceed recommended dosage. Individual results may vary.';
      const 예상_별점 = '4.7/5';
      const 예상_리뷰_수 = '324 Reviews';
      const 예상_재고_상태 = 'In Stock';

      expect(이름).toBe(예상_이름);
      expect(링크).toBe(예상_링크);
      expect(가격).toBe(예상_가격);
      expect(배송비).toBe(예상_배송비);
      expect(사용법).toBe(예상_사용법);
      expect(별점).toBe(예상_별점);
      expect(리뷰_수).toBe(예상_리뷰_수);
      expect(재고_상태).toBe(예상_재고_상태);
    });
  });

  describe('파일_경로_생성', () => {
    it('현재 폴더 위치 안에서 다운받을 파일의 경로를 반환한다.', () => {
      const 폴더_경로 = '/products/';
      const 파일_이름 = 'Products.xlsx';
      const 결과 = 파일_경로_생성(폴더_경로, 파일_이름);
      const 파일_경로 = 'P:\\Study\\js-scraper\\electron\\js\\domUtility/products/Products.xlsx';

      expect(결과).toBe(파일_경로);
    });
  });

  describe('엑셀 파일_경로_생성', () => {
    it('현재 폴더 위치 안에서 다운받을 엑셀 파일의 경로를 반환한다.', () => {
      const 결과 = 엑셀_파일_경로_생성();
      const 파일_경로 = 'P:\\Study\\js-scraper\\electron\\js\\domUtility/products/Products.xlsx';

      expect(결과).toBe(파일_경로);
    });
  });

  describe('제품_정보_배열_생성', () => {
    it('검색 결과 페이지 범위를 지정하고, 범위내의 제품들 정보를 배열로 변환한다.', async () => {
      const URL = 'https://kr.iherb.com/c/21st-century-health-care';
      const 페이지_범위 = {
        시작_페이지_번호: 1,
        끝_페이지_번호: 1
      };
      const 페이지_제품_정보_배열 = await 제품_정보_배열_생성(URL, 페이지_범위);
      const [첫번째_제품] = 페이지_제품_정보_배열;
      const {이름, 링크, 가격, 배송비, 사용법, 별점, 리뷰_수, 재고_상태} = 첫번째_제품;

      const 예상_이름 =
        '21st Century, Glucosamine / Chondroitin, Double Strength, 500 mg / 400 mg, 400 Easy to Swallow Capsules';
      const 예상_링크 =
        'https://www.iherb.com/pr/21st-century-glucosamine-chondroitin-double-strength-500-mg-400-mg-400-easy-to-swallow-capsules/9406';
      const 예상_가격 = '$51.95';
      const 예상_배송비 = '';
      const 예상_사용법 =
        'As a dietary supplement, adults take one (1) capsule with any meal, three (3) times daily or as directed by a healthcare provider. Do not exceed recommended dosage. Individual results may vary.';
      const 예상_별점 = '4.7/5';
      const 예상_리뷰_수 = '324 Reviews';
      const 예상_재고_상태 = 'In Stock';

      expect(이름).toBe(예상_이름);
      expect(링크).toBe(예상_링크);
      expect(가격).toBe(예상_가격);
      expect(배송비).toBe(예상_배송비);
      expect(사용법).toBe(예상_사용법);
      expect(별점).toBe(예상_별점);
      expect(리뷰_수).toBe(예상_리뷰_수);
      expect(재고_상태).toBe(예상_재고_상태);
    });
  });

  describe('워크_시트_칼럼_배열_생성', () => {
    it('칼럼 배열을 받아 워크 시트 칼럼 객체 배열을 반환한다.', () => {
      const 칼럼_배열 = ['제품 ID', '이름'];
      const 워크_시트_칼럼_배열 = 워크_시트_칼럼_배열_생성(칼럼_배열);
      const [첫번째_칼럼, 두번째_칼럼] = 워크_시트_칼럼_배열;
      const 예상_첫번째_칼럼 = {
        header: '제품 ID',
        key: '제품_ID'
      };
      const 예상_두번째_칼럼 = {
        header: '이름',
        key: '이름'
      };

      expect(첫번째_칼럼).toEqual(예상_첫번째_칼럼);
      expect(두번째_칼럼).toEqual(예상_두번째_칼럼);
    });
  });

  describe('워크_시트_제품_칼럼_배열_생성', () => {
    it('제품 칼럼 배열을 받아 워크 시트 제품 칼럼 객체 배열을 반환한다.', () => {
      const 워크_시트_제품_칼럼_배열 = 워크_시트_제품_칼럼_배열_생성();
      const 예상_배열 = [
        {header: '제품 ID', key: '제품_ID'},
        {header: '링크', key: '링크'},
        {header: '이름', key: '이름'},
        {header: '가격', key: '가격'},
        {header: '배송비', key: '배송비'},
        {header: '사용법', key: '사용법'},
        {header: '별점', key: '별점'},
        {header: '리뷰 수', key: '리뷰_수'},
        {header: '재고 상태', key: '재고_상태'}
      ];

      워크_시트_제품_칼럼_배열.forEach((칼럼, 인덱스) => {
        expect(칼럼).toEqual(예상_배열[인덱스]);
      });
    });
  });

  describe('워크_시트_생성', () => {
    it('워크 북에 워크 시트를 추가한다.', () => {
      const 워크_북 = new ExcelJS.Workbook();
      const 워크_북_스파이 = jest.spyOn(워크_북, 'addWorksheet');
      const 워크_시트 = 워크_시트_생성(워크_북);

      expect(워크_북_스파이).toBeCalledWith('My Products');
      expect(워크_시트).toBeTruthy();
    });
  });

  describe('워크_시트_설정', () => {
    it('워크 북의 워크 시트 칼럼들을 설정한다.', () => {
      const 제품 = {
        제품_ID: '',
        링크: 'https://www.iherb.com/pr/21st-century-glucosamine-chondroitin-double-strength-500-mg-400-mg-400-easy-to-swallow-capsules/9406',
        이름: '21st Century, Glucosamine / Chondroitin, Double Strength, 500 mg / 400 mg, 400 Easy to Swallow Capsules',
        가격: '$51.95',
        배송비: '',
        사용법:
          'As a dietary supplement, adults take one (1) capsule with any meal, three (3) times daily or as directed by a healthcare provider. Do not exceed recommended dosage. Individual results may vary.',
        별점: '4.7/5',
        리뷰_수: '324 Reviews',
        재고_상태: 'In Stock'
      };
      const 제품_정보_배열 = [제품];
      const 워크_북 = new ExcelJS.Workbook();
      const 워크_시트 = 워크_시트_생성(워크_북);
      const 워크_시트_스파이 = jest.spyOn(워크_시트, 'addRow');

      워크_시트_설정(워크_시트, 제품_정보_배열);

      const 칼럼_배열 = Object.keys(제품);
      const {columns: 워크_시트_칼럼_배열} = 워크_시트;

      워크_시트_칼럼_배열.forEach((워크_시트_칼럼, 인덱스) => {
        expect(워크_시트_칼럼['_key']).toBe(칼럼_배열[인덱스]);
      });
      expect(워크_시트_스파이).toBeCalledTimes(1);
    });
  });
});
