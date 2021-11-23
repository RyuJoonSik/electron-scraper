import { render, screen } from '@testing-library/react';
import ProductSpecialPrice from './ProductSpecialPrice';

describe('<ProductSpecialPrice />', () => {
  it('has no special price', () => {
    render(<ProductSpecialPrice />);

    const price = screen.queryByTitle('special-price');

    expect(price).toBeNull();
  });

  // it('has special price', () => {
  //   const specialPrice = '$9.36';

  //   render(<ProductSpecialPrice specialPrice={specialPrice} />);

  //   const price = screen.getByTitle('special-price');

  //   expect(price.textContent).toBe(specialPrice);
  //   expect(price).toHaveStyle({ color: 'red' });
  // });
});
