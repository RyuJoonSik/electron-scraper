import 스크랩 from './scrap.js';
import 페이지 from '../data/page';

const 페이지_찾기 = async (페이지_종류) => {
  let URL;

  switch (페이지_종류) {
    case '비타민_검색':
      URL = 'https://kr.iherb.com/search?kw=vitamin';

      break;
    case '페이지네이션_무':
      URL =
        'https://kr.iherb.com/search?kw=Advanced%20Clinicals%2C%20Collagen%2C%20Instant%20Plumping%20Serum%2C%201.75%20f';

      break;
    case '제품_상세정보':
      URL =
        'https://kr.iherb.com/pr/california-gold-nutrition-vitamin-c-gummies-natural-orange-flavor-gelatin-free-90-gummies/69569';

      break;

    case '제품_후기_무':
      URL =
        'https://www.iherb.com/pr/aurora-nutrascience-mega-liposomal-b-complex-organic-fruit-16-fl-oz-480-ml/109325';

      break;

    case '제품_단종':
      URL = 'https://kr.iherb.com/pr/nature-s-way-alive-men-s-energy-complete-multivitamin-50-tablets/24292';
      break;

    case '제품_할인_무':
      URL = 'https://www.iherb.com/pr/artnaturals-vitamin-c-serum-1-fl-oz-30-ml/81776';
      break;

    case '제품_성분표_무':
      URL =
        'https://kr.iherb.com/pr/azelique-serumdipity-anti-aging-retinol-vitamin-a-facial-serum-1-fl-oz-30-ml/82842?rec=iherbtest-pdp-related';
      break;

    default:
  }

  const HTML = await 스크랩.페이지_요청(URL);

  return 스크랩.DOM_변환(HTML);
};

describe('페이지_요청', () => {
  it('HTML 반환', async () => {
    const URL = 'https://kr.iherb.com/search?kw=vitamin';
    const HTML = await 스크랩.페이지_요청(URL);

    expect(HTML).toBe(페이지['비타민_검색']);
  });
});

describe('DOM_변환', () => {
  it('HTML 텍스트 DOM 트리로 변환', async () => {
    const 페이지 = await 페이지_찾기('비타민_검색');
    const { nodeName: 노드이름, nodeType: 노드타입 } = 페이지;

    expect(노드이름).toBe('#document');
    expect(노드타입).toBe(9);
  });
});

describe('마지막_페이지_번호_질의', () => {
  it('끝 페이지 번호 반환', async () => {
    const 페이지 = await 페이지_찾기('비타민_검색');
    const 끝_페이지_번호 = 스크랩.마지막_페이지_번호_질의(페이지);

    expect(끝_페이지_번호).toBe(417);
  });

  it('검색결과가 단일 페이지일 경우 1반환', async () => {
    const 페이지 = await 페이지_찾기('페이지네이션_무');
    const 끝_페이지_번호 = 스크랩.마지막_페이지_번호_질의(페이지);

    expect(끝_페이지_번호).toBe(1);
  });
});

describe('제품_URL_질의', () => {
  it('제품들 URL 반환', async () => {
    const 페이지 = await 페이지_찾기('비타민_검색');
    const URLs = 스크랩.제품_URL_질의(페이지);

    expect(URLs[0]).toBe(
      'https://kr.iherb.com/pr/california-gold-nutrition-vitamin-c-gummies-natural-orange-flavor-gelatin-free-90-gummies/69569'
    );
    expect(URLs.length).toBe(1);
  });
});

describe('제품_이름_질의', () => {
  it('gets product title', async () => {
    const 페이지 = await 페이지_찾기('제품_상세정보');
    const 제품_이름 = 스크랩.제품_이름_질의(페이지);

    expect(제품_이름).toBe(
      'California Gold Nutrition, Vitamin C Gummies, Natural Orange Flavor, Gelatin Free, 90 Gummies'
    );
  });
});

describe('제품_이미지_URL_질의', () => {
  it('제품 이미지 URL 반환', async () => {
    const 페이지 = await 페이지_찾기('제품_상세정보');
    const 제품_이미지_URL = 스크랩.제품_이미지_URL_질의(페이지);

    expect(제품_이미지_URL.length).toBe(3);
    expect(제품_이미지_URL[0]).toBe('https://s3.images-iherb.com/cgn/cgn01092/y/165.jpg');
  });
});

describe('제품_후기_질의', () => {
  it('제품 별점, 후기 수 반환', async () => {
    const 페이지 = await 페이지_찾기('제품_상세정보');
    const [별점, 후기_수] = 스크랩.제품_후기_질의(페이지);

    expect(별점).toBe('4.8');
    expect(후기_수).toBe('26530');
  });

  it('제품의 후기가 없을 경우 null 반환', async () => {
    const 페이지 = await 페이지_찾기('제품_후기_무');
    const [별점, 후기_수] = 스크랩.제품_후기_질의(페이지);

    expect(별점).toBeNull();
    expect(후기_수).toBeNull();
  });
});

describe('제품_상태_질의', () => {
  it('재고가 있을 경우', async () => {
    const 페이지 = await 페이지_찾기('제품_상세정보');
    const 상태 = 스크랩.제품_상태_질의(페이지);

    expect(상태).toBe('In Stock');
  });
});

describe('제품_가격_질의', () => {
  it('제품 가격이 있을 경우', async () => {
    const 페이지 = await 페이지_찾기('제품_상세정보');
    const 가격 = 스크랩.제품_가격_질의(페이지);

    expect(가격).toBe('$9.00');
  });

  it('제품 가격이 없을 경우(단종)', async () => {
    const 페이지 = await 페이지_찾기('제품_단종');
    const 가격 = 스크랩.제품_가격_질의(페이지);

    expect(가격).toBe('제품의 새 버전이 있습니다.');
  });
});

describe('제품_할인가_질의', () => {
  it('제품 할인가가 있을 경우', async () => {
    const 페이지 = await 페이지_찾기('제품_상세정보');
    const 가격 = 스크랩.제품_할인가_질의(페이지);

    expect(가격).toBe('$4.50');
  });

  it('제품 할인가가 있을 경우  null 반환', async () => {
    const 페이지 = await 페이지_찾기('제품_할인_무');
    const 가격 = 스크랩.제품_할인가_질의(페이지);

    expect(가격).toBeNull();
  });
});

describe('제품_사용법_질의', () => {
  it('제품 사용법', async () => {
    const 페이지 = await 페이지_찾기('제품_상세정보');
    const 결과 = 스크랩.제품_사용법_질의(페이지);
    const 사용법 =
      'Adults and children 4 years of age or older, take 3 gummies daily, with or without food, or as directed by your qualified healthcare professional.Please ensure child chews gummies thoroughly.';

    expect(결과).toBe(사용법);
  });
});

describe('제품_설명_질의', () => {
  it('제품 설명', async () => {
    const 페이지 = await 페이지_찾기('제품_상세정보');
    const 설명 = 스크랩.제품_설명_질의(페이지);

    expect(설명.includes('product overview')).toBeTruthy();
  });
});

describe('제품_성분표_질의', () => {
  it('제품 성분표가 있을 경우', async () => {
    const 페이지 = await 페이지_찾기('제품_상세정보');
    const 성분표 = 스크랩.제품_성분표_질의(페이지);

    expect(성분표.textContent.includes('Supplement Facts')).toBeTruthy();
  });

  it('has no supplement facts table', async () => {
    const 페이지 = await 페이지_찾기('제품_성분표_무');
    const 성분표 = 스크랩.제품_성분표_질의(페이지);

    expect(성분표).toBeNull();
  });
});

describe('금지_성분_유무', () => {
  it('has prohibited ingredients', async () => {
    const 페이지 = await 페이지_찾기('제품_상세정보');
    const 내용 = 스크랩.제품_이름_질의(페이지) + 스크랩.제품_설명_질의(페이지);
    let 결과 = 스크랩.금지_성분_유무(['gummies'], 내용);

    expect(결과).toBeTruthy();

    결과 = 스크랩.금지_성분_유무(['Gummies'], 내용);

    expect(결과).toBeFalsy();
  });
});

describe('범위_페이지_검색', () => {
  it('페이지 범위 내의 제품 URL 배열 반환', async () => {
    const 검색_URL = 'https://kr.iherb.com/search?kw=vitamin&p=';
    const 시작_페이지_번호 = 1;
    const 끝_페이지_번호 = 2;
    const 제품_URL_배열 = await 스크랩.범위_페이지_검색(검색_URL, 시작_페이지_번호, 끝_페이지_번호);
    const 제품_URL =
      'https://kr.iherb.com/pr/california-gold-nutrition-vitamin-c-gummies-natural-orange-flavor-gelatin-free-90-gummies/69569';

    expect(제품_URL_배열.length).toBe(2);
    expect(제품_URL_배열[0][0]).toBe(제품_URL);
  });
});

describe('제품_배열_생성', () => {
  it('제품 URL 배열을 순회하며 제품 객체 배열 생성', async () => {
    const 검색_URL = 'https://kr.iherb.com/search?kw=vitamin&p=';
    const 시작_페이지_번호 = 1;
    const 끝_페이지_번호 = 2;
    const 제품_URL_배열 = await 스크랩.범위_페이지_검색(검색_URL, 시작_페이지_번호, 끝_페이지_번호);

    expect(제품_URL_배열.length).toBe(2);

    const 제품_배열 = await 스크랩.제품_배열_생성(제품_URL_배열);

    expect(제품_배열.length).toBe(2);

    const 제품 = 제품_배열[0];
    const { 이름, 별점, 후기_수, 가격, 상태, 사용법, 이미지_URL_배열, 이미지_파일_이름_배열, 배송비, URL, 브랜드 } =
      제품;

    expect(이름).toBe('California Gold Nutrition, Vitamin C Gummies, Natural Orange Flavor, Gelatin Free, 90 Gummies');
    expect(별점).toBe('4.8');
    expect(후기_수).toBe('26530');
    expect(가격).toBe('$9.00');
    expect(상태).toBe('In Stock');
    expect(사용법).toBe(
      'Adults and children 4 years of age or older, take 3 gummies daily, with or without food, or as directed by your qualified healthcare professional.Please ensure child chews gummies thoroughly.'
    );
    expect(이미지_URL_배열).toEqual([
      'https://s3.images-iherb.com/cgn/cgn01092/y/165.jpg',
      'https://s3.images-iherb.com/cgn/cgn01092/y/170.jpg',
      'https://s3.images-iherb.com/cgn/cgn01092/y/164.jpg',
    ]);
    expect(이미지_파일_이름_배열).toEqual([]);
    expect(배송비).toBe('$5');
    expect(URL).toBe(
      'https://kr.iherb.com/pr/california-gold-nutrition-vitamin-c-gummies-natural-orange-flavor-gelatin-free-90-gummies/69569'
    );
    expect(브랜드).toBe('California Gold Nutrition');
  });
});

describe('캔버스_생성', () => {
  it('캔버스, ctx 반환', () => {
    HTMLCanvasElement.prototype.getContext = () => ({});
    const 사이즈 = 1000;
    const { 캔버스, ctx } = 스크랩.캔버스_생성(사이즈, 사이즈);
    const { width, height } = 캔버스;

    expect(width).toBe(1000);
    expect(height).toBe(1000);
    expect(typeof ctx).toBe('object');
  });
});

describe('이미지_저장', () => {
  it('제품 이미지 파일 저장', async () => {
    const ctx = {
      clearRect: () => {},
      drawImage: () => {},
    };
    Image.prototype.decode = () => Promise.resolve;
    HTMLCanvasElement.prototype.getContext = () => ctx;
    const 데이터_URI =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAADElEQVQImWNgoBMAAABpAAFEI8ARAAAAAElFTkSuQmCC';
    HTMLCanvasElement.prototype.toDataURL = () => 데이터_URI;
    const 파일_경로 = '/C:/temp/img.jpg';
    const 이미지_URL = 'https://s3.images-iherb.com/cgn/cgn01092/y/165.jpg';
    const spyClearRect = jest.spyOn(ctx, 'clearRect');
    const spyDrawImage = jest.spyOn(ctx, 'drawImage');
    const fs = require('fs');
    const spyWriteFileSync = jest.spyOn(fs, 'writeFileSync');
    const spyBuffer = jest.spyOn(Buffer, 'from');

    await 스크랩.이미지_저장(이미지_URL, 파일_경로);
    expect(spyClearRect).toBeCalledWith(0, 0, 1000, 1000);

    const 이미지 = new Image();
    이미지.src = 이미지_URL;

    await 이미지.decode();

    expect(spyDrawImage).toBeCalledWith(이미지, 0, 0, 1000, 1000);

    const 데이터 = 데이터_URI.replace(/^data:image\/\w+;base64,/, '');

    expect(spyBuffer).toBeCalledWith(데이터, 'base64');

    const 버퍼 = Buffer.from(데이터, 'base64');

    expect(spyWriteFileSync).toHaveBeenCalledWith(파일_경로, 버퍼);
  });
});

describe('엑셀_저장', () => {
  it('제품 배열 엑셀로 저장', async () => {
    const 검색_URL = 'https://kr.iherb.com/search?kw=vitamin&p=';
    const 제품_URL_배열 = await 스크랩.범위_페이지_검색(검색_URL, 1, 2);
    const 제품_배열 = await 스크랩.제품_배열_생성(제품_URL_배열);
    const 파일_경로 = '/C:/temp/Products.xlsx';
    const exceljs = require('exceljs');
    const WorkSheet = { columns: [], addRow: () => {} };
    const WorkBook = {
      addWorksheet: () => WorkSheet,
      xlsx: { writeFile: () => {} },
    };
    exceljs.Workbook.mockImplementation(() => WorkBook);

    const spyWorkBook = jest.spyOn(WorkBook, 'addWorksheet');
    const spyAddRow = jest.spyOn(WorkSheet, 'addRow');
    const spyWriteFile = jest.spyOn(WorkBook.xlsx, 'writeFile');

    await 스크랩.엑셀_저장(제품_배열, 파일_경로);

    expect(spyWorkBook).toBeCalledWith('My Products');
    expect(WorkSheet.columns.length).toBe(11);
    expect(WorkSheet.columns).toEqual([
      { header: '대표 이미지 파일명', key: '대표_이미지_파일_이름' },
      { header: '나머지 이미지 파일명', key: '후보_이미지_파일_이름' },
      { header: '브랜드', key: '브랜드' },
      { header: '이름', key: '이름' },
      { header: '링크', key: 'URL' },
      { header: '가격', key: '가격' },
      { header: '배송비', key: '배송비' },
      { header: '사용법', key: '사용법' },
      { header: '별점', key: '별점' },
      { header: '리뷰 수', key: '후기_수' },
      { header: '재고 상태', key: '상태' },
    ]);
    expect(spyAddRow.mock.calls.length).toBe(2);
    expect(spyAddRow.mock.calls[0][0]).toEqual({
      이름: 'California Gold Nutrition, Vitamin C Gummies, Natural Orange Flavor, Gelatin Free, 90 Gummies',
      별점: '4.8',
      후기_수: '26530',
      가격: '$9.00',
      상태: 'In Stock',
      사용법:
        'Adults and children 4 years of age or older, take 3 gummies daily, with or without food, or as directed by your qualified healthcare professional.Please ensure child chews gummies thoroughly.',
      이미지_URL_배열: [
        'https://s3.images-iherb.com/cgn/cgn01092/y/165.jpg',
        'https://s3.images-iherb.com/cgn/cgn01092/y/170.jpg',
        'https://s3.images-iherb.com/cgn/cgn01092/y/164.jpg',
      ],
      이미지_파일_이름_배열: [],
      배송비: '$5',
      URL: 'https://kr.iherb.com/pr/california-gold-nutrition-vitamin-c-gummies-natural-orange-flavor-gelatin-free-90-gummies/69569',
      브랜드: 'California Gold Nutrition',
      대표_이미지_파일_이름: 'https://s3.images-iherb.com/cgn/cgn01092/y/165.jpg',
      후보_이미지_파일_이름:
        'https://s3.images-iherb.com/cgn/cgn01092/y/170.jpg,https://s3.images-iherb.com/cgn/cgn01092/y/164.jpg',
    });
    expect(spyAddRow.mock.calls[1][0]).toEqual({
      이름: 'Garden of Life, Vitamin Code, RAW Vitamin C, 500 mg, 120 Vegan Capsules',
      별점: '4.8',
      후기_수: '2925',
      가격: '$25.84',
      상태: 'Out of Stock',
      사용법:
        'Adults take 2 capsules daily. May be taken with or without food. Capsules may be opened and contents may be added to water or raw juice. Not intended for children.',
      이미지_URL_배열: [
        'https://s3.images-iherb.com/gol/gol11655/y/15.jpg',
        'https://s3.images-iherb.com/gol/gol11655/y/12.jpg',
        'https://s3.images-iherb.com/gol/gol11655/y/16.jpg',
        'https://s3.images-iherb.com/gol/gol11655/y/8.jpg',
      ],
      이미지_파일_이름_배열: [],
      배송비: null,
      URL: 'https://kr.iherb.com/pr/garden-of-life-vitamin-code-raw-vitamin-c-500-mg-120-vegan-capsules/46038',
      브랜드: 'Garden of Life',
      대표_이미지_파일_이름: 'https://s3.images-iherb.com/gol/gol11655/y/15.jpg',
      후보_이미지_파일_이름:
        'https://s3.images-iherb.com/gol/gol11655/y/12.jpg,https://s3.images-iherb.com/gol/gol11655/y/16.jpg,https://s3.images-iherb.com/gol/gol11655/y/8.jpg',
    });
    expect(spyWriteFile).toBeCalledWith(파일_경로);
  });
});
