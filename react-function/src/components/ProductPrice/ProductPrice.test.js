import { render, screen } from '@testing-library/react';
import ProductPrice from './ProductPrice';

describe('<ProductPrice />', () => {
  it('has price', () => {
    const originalPrice = '$15.60';

    render(<ProductPrice originalPrice={originalPrice} />);

    const price = screen.getByTitle('original-price');

    expect(price.textContent).toBe(originalPrice);
  });
});
