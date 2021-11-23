import { render, screen } from '@testing-library/react';
import ProductList from './ProductList';
import { Context } from '../Store/Store';

describe('<ProductList />', () => {
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
  };

  it('has product', async () => {
    render(
      <Context.Provider value={{ state }}>
        <ProductList />
      </Context.Provider>
    );

    screen.getByTestId('product-list');
    screen.getAllByTestId('product');
  });
});
