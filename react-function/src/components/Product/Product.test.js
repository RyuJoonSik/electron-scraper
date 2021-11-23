import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Product from './Product';

describe('<Product />', () => {
  it('has product title and contents', async () => {
    const product = {
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
    };

    render(<Product product={product} />);

    const title = screen.getByTitle(product.title);

    expect(title.textContent).toBe(product.title);

    const spy = jest.spyOn(window, 'alert');
    navigator.clipboard = { writeText: jest.fn() };

    userEvent.click(title);
    await waitFor(() => expect(spy).toHaveBeenCalledWith('제품명 복사 성공'));

    const content = screen.getByTestId('product-content');

    expect(content).toBeTruthy();
  });
});
