import { render, screen } from '@testing-library/react';
import PageController from './PageController';
import { Context } from '../Store/Store';
import userEvent from '@testing-library/user-event';

describe('<PageController />', () => {
  const state = { keyword: 'vitamin', curPageNum: 1, lastPageNum: 417 };

  const set = (value = {}) => {
    render(
      <Context.Provider value={{ ...value }}>
        <PageController />
      </Context.Provider>
    );
  };

  it('has title, content', () => {
    set({ state });

    const title = screen.getByTestId('controller-title');
    const content = screen.getByTestId('controller-content');

    expect(title.textContent).toBe('Controller');
    expect(content).toBeTruthy();
  });

  it('has keyword', () => {
    set({ state });
    const keyword = screen.getByTestId('controller-keyword');

    expect(keyword.textContent).toBe('vitamin');
  });

  it('has content rows', () => {
    set({ state });
    const rows = screen.getAllByTestId('content-row');

    expect(rows.length).toBe(4);
  });

  it('has pagination buttons in first row', () => {
    const onMove = jest.fn();

    set({ state, onMove });

    const paginationBtns = screen.getAllByTestId('pagination-button');
    const [first, prev, next, last] = paginationBtns;

    userEvent.click(first);
    expect(onMove).toHaveBeenCalledWith(1);
    userEvent.click(next);
    expect(onMove).toHaveBeenCalledWith(2);
    userEvent.click(prev);
    expect(onMove).toHaveBeenCalledWith(1);
    userEvent.click(last);
    expect(onMove).toHaveBeenCalledWith(417);
  });

  it('has pagination bar in second row', async () => {
    const onMove = jest.fn();
    set({ state, onMove });
    const paginationBar = screen.getByTestId('pagination-bar');

    expect(paginationBar).toBeTruthy();

    const input = screen.getByTestId('currentPageNumber');

    expect(input.value).toBe('1');

    const lastPageNum = screen.getByTestId('lastPageNumber');

    expect(lastPageNum.textContent).toBe('/417');
    userEvent.type(input, '{backspace}2');
    expect(input).toHaveAttribute('value', '2');

    const paginationBtns = screen.getAllByTestId('pagination-button');

    userEvent.click(paginationBtns[paginationBtns.length - 1]);
    expect(onMove).toHaveBeenCalledWith(2);
  });

  it('has scroll buttons', () => {
    set({ state });

    const scrollBtns = screen.getAllByTestId('scroller');
    global.window.scroll = () => {};
    const spy = jest.spyOn(global.window, 'scroll');

    userEvent.click(scrollBtns[0]);
    expect(spy).toHaveBeenCalledWith(0, 0);

    const y = document.body.scrollHeight - window.innerHeight;

    userEvent.click(scrollBtns[1]);
    expect(spy).toHaveBeenCalledWith(0, y);
  });

  it('has check buttons', () => {
    const dispatch = jest.fn();

    set({ state, dispatch });

    const checkBtns = screen.getAllByTestId('check-button');

    userEvent.click(checkBtns[0]);
    expect(dispatch).toHaveBeenCalledWith({ type: 'CHECK_ALL_PRODUCTS', payload: true });

    userEvent.click(checkBtns[1]);
    expect(dispatch).toHaveBeenCalledWith({ type: 'CHECK_ALL_PRODUCTS', payload: false });
  });

  it('has excel export button', () => {
    set({ state });

    const button = screen.getByTitle('Excel export');

    expect(button).toBeTruthy();
  });
});
