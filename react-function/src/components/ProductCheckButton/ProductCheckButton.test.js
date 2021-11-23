import { render, screen } from '@testing-library/react';
import ProductCheckButton from './ProductCheckButton';
import { Context } from '../Store/Store';
import userEvent from '@testing-library/user-event';

describe('<ProductCheckButton />', () => {
  it('has check button', () => {
    render(<ProductCheckButton />);

    const button = screen.getByTitle('product-check');

    expect(button.textContent).toBe('🟦');
  });

  it('has checked button', () => {
    render(<ProductCheckButton isChecked={true} />);

    const button = screen.getByTitle('product-check');

    expect(button.textContent).toBe('☑️');
  });

  it('has click event', () => {
    const dispatch = jest.fn();

    render(<ProductCheckButton dispatch={dispatch} />);

    const button = screen.getByTitle('product-check');

    userEvent.click(button);
    expect(dispatch).toHaveBeenCalled();
  });
});
