import 페이지 from './데이터/목업_페이지';

const mockFetch = (URL) => {
  try {
    switch (URL) {
      /* 키워드 'vitamin' 검색 페이지 */
      case 'https://kr.iherb.com/search?kw=vitamin': {
        return Promise.resolve({
          text: () => Promise.resolve(페이지['비타민_검색'])
        });
      }

      /* 키워드 'vitamin' 1 페이지 */
      case 'https://kr.iherb.com/search?kw=vitamin&p=1': {
        return Promise.resolve({
          text: () => Promise.resolve(페이지['비타민_검색'])
        });
      }

      /* 키워드 'vitamin' 2 페이지 */
      case 'https://kr.iherb.com/search?kw=vitamin&p=2': {
        return Promise.resolve({
          text: () => Promise.resolve(페이지['비타민_검색2'])
        });
      }

      /* 제품 금지성분 페이지 */
      case 'https://kr.iherb.com/pr/futurebiotics-vitamin-k2-d3-with-vitamin-k2-as-mk-7-120-capsules/99900': {
        return Promise.resolve({
          ok: true,
          text: () => Promise.resolve(페이지['제품_금지성분_유'])
        });
      }

      /* 제품 배송비 무료 페이지 */
      case 'https://kr.iherb.com/pr/garden-of-life-vitamin-code-raw-vitamin-c-500-mg-120-vegan-capsules/46038': {
        return Promise.resolve({
          ok: false,
          text: () => Promise.resolve(페이지['제품_배송비_무'])
        });
      }

      /* 브랜드 '21st Century' 검색 페이지 */
      case 'https://kr.iherb.com/c/21st-century-health-care': {
        return Promise.resolve({
          text: () => Promise.resolve(페이지['_21stCentury_검색'])
        });
      }

      /* 브랜드 '21st Century' 검색 페이지 1 */
      case 'https://kr.iherb.com/c/21st-century-health-care?p=1': {
        return Promise.resolve({
          text: () => Promise.resolve(페이지['_21stCentury_검색1'])
        });
      }

      /* 브랜드 '21st Century' 검색 페이지 1 상세 제품 1 */
      case 'https://www.iherb.com/pr/21st-century-glucosamine-chondroitin-double-strength-500-mg-400-mg-400-easy-to-swallow-capsules/9406': {
        return Promise.resolve({
          ok: true,
          text: () => Promise.resolve(페이지['_21stCentury_제품1'])
        });
      }

      /* 브랜드 '21st Century' 검색 페이지 1  상세 제품 2 */
      case 'https://www.iherb.com/pr/21st-century-glucosamine-chondroitin-plus-hyaluronic-acid-msm-120-tablets/40459': {
        return Promise.resolve({
          ok: true,
          text: () => Promise.resolve(페이지['_21stCentury_제품2'])
        });
      }

      /* 검색 결과 1페이지(페이지네이션 버튼이 없을 경우) */
      case 'https://kr.iherb.com/search?kw=Advanced%20Clinicals%2C%20Collagen%2C%20Instant%20Plumping%20Serum%2C%201.75%20f':
        return Promise.resolve({
          text: () => Promise.resolve(페이지['페이지네이션_무'])
        });

      /* 제품 상세 페이지 */
      case 'https://kr.iherb.com/pr/california-gold-nutrition-vitamin-c-gummies-natural-orange-flavor-gelatin-free-90-gummies/69569': {
        return Promise.resolve({
          ok: true,
          text: () => Promise.resolve(페이지['제품_상세정보'])
        });
      }

      /* 후기 없는 제품 상세 페이지 */
      case 'https://www.iherb.com/pr/aurora-nutrascience-mega-liposomal-b-complex-organic-fruit-16-fl-oz-480-ml/109325': {
        return Promise.resolve({
          text: () => Promise.resolve(페이지['제품_후기_무'])
        });
      }

      /* 단종 제품(가격이 없을 경우) */
      case 'https://kr.iherb.com/pr/nature-s-way-alive-men-s-energy-complete-multivitamin-50-tablets/24292':
        return Promise.resolve({
          text: () => Promise.resolve(페이지['제품_단종'])
        });

      /* 할인 없는 제품 상세 페이지 */
      case 'https://www.iherb.com/pr/artnaturals-vitamin-c-serum-1-fl-oz-30-ml/81776': {
        return Promise.resolve({
          text: () => Promise.resolve(페이지['제품_할인_무'])
        });
      }

      /* 영양 성분 정보 없는 제품 상세 페이지 */
      case 'https://kr.iherb.com/pr/azelique-serumdipity-anti-aging-retinol-vitamin-a-facial-serum-1-fl-oz-30-ml/82842?rec=iherbtest-pdp-related': {
        return Promise.resolve({
          text: () => Promise.resolve(페이지['제품_성분표_무'])
        });
      }
    }
  } catch (err) {
    console.error(err);
  }
};

jest.mock('exceljs');
jest.mock('fs');

require('exceljs').Workbook.mockImplementation(() => ({
  addWorksheet: () => ({columns: [], addRow: () => {}}),
  xlsx: {writeFile: () => {}}
}));

beforeAll(() => {
  global.fetch = mockFetch;
  Image.prototype.decode = () => Promise.resolve;
  // console.log = () => {};
  // console.error = () => {};

  const ctx = {
    clearRect: () => {},
    drawImage: () => {}
  };

  HTMLCanvasElement.prototype.getContext = () => ctx;
  HTMLCanvasElement.prototype.toDataURL = () => 'data:image/png;base64,hello';
});
afterAll(() => {});
