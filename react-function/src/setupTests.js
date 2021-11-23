// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import {
  searchPage,
  productPage,
  noSpecialPriceProductPage,
  noReviewProductPage,
  noSupplementProductPage,
  onePage,
  discontinuedProduct,
} from './js/page';

jest.mock('html2canvas', () => {
  const originalModule = jest.requireActual('html2canvas');

  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn().mockImplementation(() => {
      return { toDataURL: jest.fn() };
    }),
  };
});

jest.mock('exceljs', () => {
  const originalModule = jest.requireActual('exceljs');

  return {
    __esModule: true,
    ...originalModule,
    Workbook: jest.fn(() => ({ addWorksheet: jest.fn(() => ({})), xlsx: { writeBuffer: jest.fn() } })),
  };
});

const mockFetch = (url) => {
  try {
    switch (url) {
      /* 비타민 검색 페이지 */
      case 'https://kr.iherb.com/search?kw=vitamin': {
        return Promise.resolve({
          text: () => Promise.resolve(searchPage),
        });
      }

      /* 1페이지로 */
      case 'https://kr.iherb.com/search?kw=vitamin&p=1': {
        return Promise.resolve({
          text: () => Promise.resolve(searchPage),
        });
      }

      /* 2페이지로 */
      case 'https://kr.iherb.com/search?kw=vitamin&p=2': {
        return Promise.resolve({
          text: () => Promise.resolve(searchPage),
        });
      }

      /* 마지막 페이지로 */
      case 'https://kr.iherb.com/search?kw=vitamin&p=417': {
        return Promise.resolve({
          text: () => Promise.resolve(searchPage),
        });
      }

      /* 제품 상세 페이지 */
      case 'https://kr.iherb.com/pr/california-gold-nutrition-vitamin-c-gummies-natural-orange-flavor-gelatin-free-90-gummies/69569': {
        return Promise.resolve({
          text: () => Promise.resolve(productPage),
        });
      }

      /* 할인 없는 제품 상세 페이지 */
      case 'https://www.iherb.com/pr/artnaturals-vitamin-c-serum-1-fl-oz-30-ml/81776': {
        return Promise.resolve({
          text: () => Promise.resolve(noSpecialPriceProductPage),
        });
      }

      /* 후기 없는 제품 상세 페이지 */
      case 'https://www.iherb.com/pr/aurora-nutrascience-mega-liposomal-b-complex-organic-fruit-16-fl-oz-480-ml/109325': {
        return Promise.resolve({
          text: () => Promise.resolve(noReviewProductPage),
        });
      }

      /* 영양 성분 정보 없는 제품 상세 페이지 */
      case 'https://kr.iherb.com/pr/azelique-serumdipity-anti-aging-retinol-vitamin-a-facial-serum-1-fl-oz-30-ml/82842?rec=iherbtest-pdp-related': {
        return Promise.resolve({
          text: () => Promise.resolve(noSupplementProductPage),
        });
      }

      /* 파파고 번역 요청 */
      case 'https://openapi.naver.com/v1/papago/n2mt':
        return Promise.resolve({
          json: () => Promise.resolve({ message: { result: { translatedText: '만나서 반갑습니다.' } } }),
        });

      /* 검색 결과 1페이지(페이지네이션 버튼이 없을 경우) */
      case 'https://kr.iherb.com/search?kw=Advanced%20Clinicals%2C%20Collagen%2C%20Instant%20Plumping%20Serum%2C%201.75%20f':
        return Promise.resolve({
          text: () => Promise.resolve(onePage),
        });

      /* 단종 제품(가격이 없을 경우) */
      case 'https://kr.iherb.com/pr/nature-s-way-alive-men-s-energy-complete-multivitamin-50-tablets/24292':
        return Promise.resolve({
          text: () => Promise.resolve(discontinuedProduct),
        });

      default: {
      }
    }
  } catch (err) {
    console.error(err);
  }
};

const alert = global.window.alert;

beforeAll(() => {
  jest.spyOn(global, 'fetch');
  global.window.alert = () => {};
});
beforeEach(() => global.fetch.mockImplementation(mockFetch));
afterAll(() => {
  global.fetch.mockRestore();
  global.window.alert = alert;
});
