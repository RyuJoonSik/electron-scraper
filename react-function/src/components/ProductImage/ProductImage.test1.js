import { render, screen } from '@testing-library/react';
import ProductImage from './ProductImage';

describe('<ProductImageLink />', () => {
  it('has URL, img', () => {
    const URL =
      'https://kr.iherb.com/pr/california-gold-nutrition-vitamin-c-gummies-natural-orange-flavor-gelatin-free-90-gummies/69569';
    const imgURL = 'https://s3.images-iherb.com/cgn/cgn01092/y/165.jpg';

    render(<ProductImage imgURL={imgURL} />);

    expect(screen.getByTestId('product-img-link').href).toBe(imgURL);
    expect(screen.getByAltText(imgURL).src).toBe(imgURL);
  });
});
