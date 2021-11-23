import { render, screen } from '@testing-library/react';
import PaginationButton from './PaginationButton';
// import { Context } from '../Store/Store';
import userEvent from '@testing-library/user-event';

describe('<PaginationButton />', () => {
  // const state = { curPageNum: 1, lastPageNum: 417 };

  const set = (props = {}) => {
    render(<PaginationButton {...props} />);
  };

  it('has button', () => {
    set();

    screen.getByTestId('pagination-button');
  });

  it('has multiple class', () => {
    const moveTo = 'first';

    set({ moveTo });

    const button = screen.getByTestId('pagination-button');
    const className = 'pagination-button pagination-button--' + moveTo;

    expect(button).toHaveClass(className);
  });

  it('has click event move to first page', () => {
    const moveTo = 'first';
    const onMove = jest.fn();

    set({ moveTo, onMove });

    const button = screen.getByTestId('pagination-button');

    userEvent.click(button);
    expect(onMove).toHaveBeenCalledWith(1);
  });

  it('has click event move to last page', () => {
    const moveTo = 'last';
    const onMove = jest.fn();
    const lastPageNum = 417;

    set({ moveTo, onMove, lastPageNum });

    const button = screen.getByTestId('pagination-button');

    userEvent.click(button);
    expect(onMove).toHaveBeenCalledWith(417);
  });

  it('has click event move to prev page', () => {
    const moveTo = 'prev';
    const onMove = jest.fn();
    const curPageNum = 2;

    set({ moveTo, onMove, curPageNum });

    const button = screen.getByTestId('pagination-button');

    userEvent.click(button);
    expect(onMove).toHaveBeenCalledWith(1);
  });

  it('has click event move to next page', () => {
    const moveTo = 'next';
    const onMove = jest.fn();
    const curPageNum = 2;

    set({ moveTo, onMove, curPageNum });

    const button = screen.getByTestId('pagination-button');

    userEvent.click(button);
    expect(onMove).toHaveBeenCalledWith(3);
  });

  it('has click event move to user input num page', () => {
    const moveTo = 10;
    const onMove = jest.fn();

    set({ moveTo, onMove });

    const button = screen.getByTestId('pagination-button');

    userEvent.click(button);
    expect(onMove).toHaveBeenCalledWith(10);
  });
});
