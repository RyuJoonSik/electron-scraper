import { render, screen } from '@testing-library/react';
import ProductStar from './ProductStar';

describe('<ProductStar />', () => {
  it('has star', () => {
    const star = '4.9';

    render(<ProductStar star={star} />);

    const productStar = screen.getByTitle('product-star');

    expect(productStar.textContent).toBe(`⭐${star}`);
  });

  it('has no star', () => {
    const star = null;

    render(<ProductStar star={star} />);

    const productStar = screen.getByTitle('product-star');

    expect(productStar.textContent).toBe(`⭐${0}`);
  });
});
