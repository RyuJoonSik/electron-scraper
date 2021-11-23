import { render, screen } from '@testing-library/react';
import SearchResult from './SearchResult';

describe('<SearchResult />', () => {
  it('has h1', () => {
    render(<SearchResult />);

    const title = screen.getByTestId('main-title');

    expect(title.textContent).toBe('😎｜📄');
  });

  it('has result keyword, last page num', () => {
    render(<SearchResult keyword="vitamin" lastPageNum="417" />);

    const title = screen.getByTestId('main-title');

    expect(title.textContent).toBe('😎vitamin｜📄417');
  });
});
