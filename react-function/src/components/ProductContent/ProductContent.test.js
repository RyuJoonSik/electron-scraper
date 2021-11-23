import { render, screen } from '@testing-library/react';
import ProductContent from './ProductContent';

describe('<ProductContent />', () => {
  it('has product contents', () => {
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

    render(<ProductContent product={product} />);

    const content = screen.getByTestId('product-content');

    const productStar = screen.getByTitle('product-star');

    expect(productStar.textContent).toBe('⭐4.8');

    const productReview = screen.getByTitle('review-count');

    expect(productReview.textContent).toBe('👨‍👩‍👦‍👦27225');

    const productState = screen.getByTitle('product-state');

    expect(productState.textContent).toBe('✔️');

    const price = screen.getByTitle('original-price');

    expect(price.textContent).toBe('$9.00');

    const specialPrice = screen.queryByTitle('special-price');

    expect(specialPrice.textContent).toBe('$4.50');

    const linkButton = screen.getByTitle('product-link');

    expect(linkButton.textContent).toBe('🔗');

    const imgButton = screen.getByTitle('download-product-imgs');

    expect(imgButton.textContent).toBe('📷');

    const supButton = screen.getByTitle('export-product-supplement-table');

    expect(supButton.textContent).toBe('💊');

    const checkButton = screen.getByTitle('product-check');

    expect(checkButton.textContent).toBe('🟦');
  });
});
