import { render, screen } from '@testing-library/react';
import Main from './Main';
import { Context } from '../Store/Store';

describe('<Main />', () => {
  it('has search resut', () => {
    const state = {
      page: {
        1: [
          {
            title: 'California Gold Nutrition, Vitamin C Gummies, Natural Orange Flavor, Gelatin Free, 90 Gummies',
            imgURLs: [
              'https://s3.images-iherb.com/cgn/cgn01092/y/165.jpg',
              'https://s3.images-iherb.com/cgn/cgn01092/y/170.jpg',
              'https://s3.images-iherb.com/cgn/cgn01092/y/164.jpg',
            ],
            URL: 'https://kr.iherb.com/pr/california-gold-nutrition-vitamin-c-gummies-natural-orange-flavor-gelatin-free-90-gummies/69569',
            star: '4.8',
            review: '27225',
            state: 'In Stock',
            originalPrice: '$9.00',
            specialPrice: '$4.50',
            supplementTable: {},
            isChecked: false,
            id: 'https://kr.iherb.com/pr/california-gold-nutrition-vitamin-c-gummies-natural-orange-flavor-gelatin-free-90-gummies/69569',
          },
        ],
      },
      curPageNum: 1,
      keyword: 'vitamin',
      lastPageNum: 417,
    };

    render(
      <Context.Provider value={{ state }}>
        <Main />
      </Context.Provider>
    );

    const title = screen.getByTitle('result');

    expect(title.textContent).toBe('😎vitamin｜📄417');
  });

  it('has product list', () => {
    const state = {
      page: {
        1: [
          {
            title: 'California Gold Nutrition, Vitamin C Gummies, Natural Orange Flavor, Gelatin Free, 90 Gummies',
            imgURLs: [
              'https://s3.images-iherb.com/cgn/cgn01092/y/165.jpg',
              'https://s3.images-iherb.com/cgn/cgn01092/y/170.jpg',
              'https://s3.images-iherb.com/cgn/cgn01092/y/164.jpg',
            ],
            URL: 'https://kr.iherb.com/pr/california-gold-nutrition-vitamin-c-gummies-natural-orange-flavor-gelatin-free-90-gummies/69569',
            star: '4.8',
            review: '27225',
            state: 'In Stock',
            originalPrice: '$9.00',
            specialPrice: '$4.50',
            supplementTable: {},
            isChecked: false,
            id: 'https://kr.iherb.com/pr/california-gold-nutrition-vitamin-c-gummies-natural-orange-flavor-gelatin-free-90-gummies/69569',
          },
        ],
      },
      curPageNum: 1,
      keyword: 'vitamin',
      lastPageNum: 417,
    };

    render(
      <Context.Provider value={{ state }}>
        <Main />
      </Context.Provider>
    );

    const productList = screen.getByTestId('product-list');

    expect(productList).toBeTruthy();
  });

  it('has page controller', () => {
    const state = {
      page: {
        1: [
          {
            title: 'California Gold Nutrition, Vitamin C Gummies, Natural Orange Flavor, Gelatin Free, 90 Gummies',
            imgURLs: [
              'https://s3.images-iherb.com/cgn/cgn01092/y/165.jpg',
              'https://s3.images-iherb.com/cgn/cgn01092/y/170.jpg',
              'https://s3.images-iherb.com/cgn/cgn01092/y/164.jpg',
            ],
            URL: 'https://kr.iherb.com/pr/california-gold-nutrition-vitamin-c-gummies-natural-orange-flavor-gelatin-free-90-gummies/69569',
            star: '4.8',
            review: '27225',
            state: 'In Stock',
            originalPrice: '$9.00',
            specialPrice: '$4.50',
            supplementTable: {},
            isChecked: false,
            id: 'https://kr.iherb.com/pr/california-gold-nutrition-vitamin-c-gummies-natural-orange-flavor-gelatin-free-90-gummies/69569',
          },
        ],
      },
      curPageNum: 1,
      keyword: 'vitamin',
      lastPageNum: 417,
    };

    render(
      <Context.Provider value={{ state }}>
        <Main />
      </Context.Provider>
    );

    const controller = screen.getByTestId('controller');

    expect(controller).toBeTruthy();
  });
});
