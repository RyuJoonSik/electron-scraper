import { render, screen } from '@testing-library/react';
import Pagination from './Pagination';

describe('<Pagination />', () => {
  it('has prev, next, move to first page, move to last page button', () => {
    const section = 'pagination';

    render(<Pagination />);

    const buttons = screen.getAllByTestId('pagination-button');

    expect(buttons.length).toBe(5);
    expect(buttons[0].classList.contains('pagination-button--first')).toBeTruthy();
    expect(buttons[1].classList.contains('pagination-button--prev')).toBeTruthy();
    expect(buttons[2].classList.contains('pagination-button--next')).toBeTruthy();
    expect(buttons[3].classList.contains('pagination-button--last')).toBeTruthy();
    expect(buttons[4].classList.contains('pagination-button--num')).toBeTruthy();
  });

  it('has current page num input, last page num text, moving button', () => {
    const currentPageNum = '1';
    const lastPageNum = '417';

    render(<Pagination currentPageNum={currentPageNum} lastPageNum={lastPageNum} />);

    screen.getByTitle('current page number');
    screen.getByText('/417');
    screen.getByText('GO');
  });
});
