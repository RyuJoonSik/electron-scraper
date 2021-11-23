import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import * as scrap from '../../js/scrap';

describe('<App />', () => {
  it('renders Header', () => {
    render(<App />);

    screen.getByTestId('header');

    const main = screen.queryByTestId('main');

    expect(main).toBeNull();
  });

  it('searches keyword', async () => {
    render(<App />);

    const input = screen.getByTitle('input keyword');
    userEvent.type(input, 'vitamin');

    const searchBtn = screen.getByTitle('search');
    userEvent.click(searchBtn);

    await screen.findByText('😎vitamin｜📄417');

    const products = screen.getAllByTestId('product');

    expect(products.length).toBe(1);

    const title = screen.getByTestId('product-title');

    expect(title.textContent).toBe(
      'California Gold Nutrition, Vitamin C Gummies, Natural Orange Flavor, Gelatin Free, 90 Gummies'
    );

    const spy = jest.spyOn(window, 'alert');
    navigator.clipboard = { writeText: jest.fn() };

    userEvent.click(title);
    await waitFor(() => expect(spy).toHaveBeenCalledWith('제품명 복사 성공'));

    expect(screen.getByTestId('product-img-link').href).toBe('https://s3.images-iherb.com/cgn/cgn01092/y/165.jpg');
    expect(screen.getByTitle('product-star').textContent).toBe('⭐4.8');
    expect(screen.getByTitle('review-count').textContent).toBe('👨‍👩‍👦‍👦27417');
    expect(screen.getByTitle('product-state').textContent).toBe('✔️');
    expect(screen.getByTitle('original-price').textContent).toBe('$9.00');
    expect(screen.getByTitle('special-price').textContent).toBe('$4.50');

    const imgDownBtn = screen.getByTitle('download-product-imgs');
    scrap.downloadIMGs = jest.fn();

    userEvent.click(imgDownBtn);
    expect(scrap.downloadIMGs).toHaveBeenCalled();

    const supDownBtn = screen.getByTitle('export-product-supplement-table');
    scrap.downloadSupplement = jest.fn();

    userEvent.click(supDownBtn);
    expect(scrap.downloadSupplement).toHaveBeenCalled();

    const checkBtn = screen.getByTitle('product-check');

    userEvent.click(checkBtn);
    await waitFor(() => expect(checkBtn.textContent).toBe('☑️'));
  });

  it('uses controller', async () => {
    render(<App />);

    const input = screen.getByTitle('input keyword');

    userEvent.type(input, 'vitamin');

    const searchBtn = screen.getByTitle('search');

    userEvent.click(searchBtn);

    const paginationBtns = await screen.findAllByTestId('pagination-button');
    const numPageBtn = paginationBtns[paginationBtns.length - 1];
    const inputNum = screen.getByTitle('current page number');

    expect(inputNum.value).toBe('1');
    userEvent.type(inputNum, '{backspace}417');
    userEvent.click(numPageBtn);
    await waitFor(() => expect(inputNum.value).toBe('417'));

    const fisrtPageBtn = screen.getAllByTestId('pagination-button')[0];
    userEvent.click(fisrtPageBtn);

    await waitFor(async () =>
      expect(await screen.findByDisplayValue('1')).toHaveAttribute('data-testid', 'currentPageNumber')
    );

    const nextPageBtn = screen.getAllByTestId('pagination-button')[2];
    userEvent.click(nextPageBtn);

    await waitFor(async () =>
      expect(await screen.findByDisplayValue('2')).toHaveAttribute('data-testid', 'currentPageNumber')
    );

    const prevPageBtn = screen.getAllByTestId('pagination-button')[1];
    userEvent.click(prevPageBtn);

    await waitFor(async () =>
      expect(await screen.findByDisplayValue('1')).toHaveAttribute('data-testid', 'currentPageNumber')
    );

    const lastPageBtn = screen.getAllByTestId('pagination-button')[3];
    userEvent.click(lastPageBtn);

    await waitFor(async () =>
      expect(await screen.findByDisplayValue('417')).toHaveAttribute('data-testid', 'currentPageNumber')
    );

    const scrollTopBtn = screen.getAllByTestId('scroller')[0];
    const scrollBottomBtn = screen.getAllByTestId('scroller')[1];

    global.window.scroll = () => {};
    const spy = jest.spyOn(global.window, 'scroll');

    userEvent.click(scrollTopBtn);
    expect(spy).toHaveBeenCalledWith(0, 0);

    const y = document.body.scrollHeight - window.innerHeight;

    userEvent.click(scrollBottomBtn);
    expect(spy).toHaveBeenCalledWith(0, y);

    const checkBtn = screen.getAllByTestId('check-button')[0];
    const unCheckBtn = screen.getAllByTestId('check-button')[1];
    const producCheckBtns = screen.getAllByTitle('product-check');

    userEvent.click(checkBtn);

    for (const productCheckBtn of producCheckBtns) {
      expect(productCheckBtn.textContent).toBe('☑️');
    }

    userEvent.click(unCheckBtn);

    for (const productCheckBtn of producCheckBtns) {
      expect(productCheckBtn.textContent).toBe('🟦');
    }

    const excelExportBtn = screen.getByTitle('Excel export');
    const spyExcel = jest.spyOn(scrap, 'downloadExcel').mockImplementation(() => {});

    userEvent.click(excelExportBtn);
    expect(spyExcel).toHaveBeenCalled();
  });
});
