import { render, screen } from '@testing-library/react';
import ProductState from './ProductState';

describe('<ProductState />', () => {
  it('has stock', () => {
    const state = 'In Stock';

    render(<ProductState state={state} />);

    const productState = screen.getByTitle('product-state');

    expect(productState.textContent).toBe('✔️');
  });

  it('has out of stock', () => {
    const state = 'Out of Stock';

    render(<ProductState state={state} />);

    const productState = screen.getByTitle('product-state');

    expect(productState.textContent).toBe('❌');
  });
});
