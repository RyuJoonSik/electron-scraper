import { render, screen } from '@testing-library/react';
import PaginationBar from './PaginationBar';
import userEvent from '@testing-library/user-event';

describe('<PaginationBar />', () => {
  const set = (props = {}) => {
    render(<PaginationBar {...props} />);

    const input = screen.getByTitle('current page number');
    const b = screen.getByTitle('last page num');
    const button = screen.getByTestId('pagination-button');

    return {
      input,
      b,
      button,
    };
  };

  it('has input, last page num, Pagination button', () => {
    const { input, b, button } = set({});

    expect(input).toBeTruthy();
    expect(b).toBeTruthy();
    expect(button).toBeTruthy();
  });

  it('has input change event', () => {
    const { input } = set({});

    userEvent.type(input, '10');

    expect(input.value).toBe('10');
  });

  it('has current page number and last page number', () => {
    const curPageNum = 1;
    const lastPageNum = 417;

    const { input, b } = set({ curPageNum, lastPageNum });

    expect(input.value).toBe('1');
    expect(b.textContent).toBe('/417');
  });

  it('has PaginationButton', () => {
    const onMove = jest.fn();
    const curPageNum = 2;
    const lastPageNum = 417;

    set({ curPageNum, lastPageNum, onMove });

    userEvent.click(screen.getByTestId('pagination-button'));

    expect(onMove).toHaveBeenCalledWith(2);
  });
});
