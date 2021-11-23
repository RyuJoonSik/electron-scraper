import { render, screen } from '@testing-library/react';
import ProductSUPButton from './ProductSUPButton';
import * as scrap from '../../js/scrap';
import userEvent from '@testing-library/user-event';

describe('<ProductSUPButton />', () => {
  it('has no button', () => {
    render(<ProductSUPButton />);

    const button = screen.queryByTitle('export-product-supplement-table');

    expect(button).toBeNull();
  });

  it('has supplement button', () => {
    render(<ProductSUPButton supplementTable={{}} />);

    const button = screen.getByTitle('export-product-supplement-table');

    expect(button.textContent).toBe('💊');
  });

  it('has click event', () => {
    const title = 'supplement';
    const table = {};

    render(<ProductSUPButton title={title} supplementTable={table} />);

    const spy = jest.spyOn(scrap, 'downloadSupplement').mockImplementation(() => {});
    const button = screen.getByTitle('export-product-supplement-table');

    userEvent.click(button);
    expect(spy).toHaveBeenCalledWith(title, table);
  });
});
