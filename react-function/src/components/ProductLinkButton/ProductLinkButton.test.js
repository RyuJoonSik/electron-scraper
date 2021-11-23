import { render, screen } from '@testing-library/react';
import ProductLinkButton from './ProductLinkButton';
import { Context } from '../Store/Store';

describe('<ProductLinkButton />', () => {
  it('has link button', () => {
    render(<ProductLinkButton />);

    const button = screen.getByTitle('product-link');

    expect(button.textContent).toBe('🔗');
  });

  it('has URL', () => {
    const URL = 'http://localhost:3000';

    render(<ProductLinkButton URL={URL} />);

    const button = screen.getByTitle('product-link');

    expect(button.href).toBe(`${URL}/`);
    expect(button.target).toBe('_blank');
    expect(button.rel).toBe('noreferrer');
  });
});
