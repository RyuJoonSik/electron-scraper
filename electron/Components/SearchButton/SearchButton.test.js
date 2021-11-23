import 검색_버튼 from './SearchButton';
import { getByTestId } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('SearchButton', () => {
  function set(props = {}) {
    const { body } = document;
    const component = new 검색_버튼(body, props);

    component.렌더();

    const btn = getByTestId(body, 'search-bar-btn');

    return {
      btn,
    };
  }

  it('has button', () => {
    const { btn } = set();

    expect(btn).toBeInTheDocument();
  });

  it('has click event', () => {
    const 검색어 = 'vitamin';
    const props = {
      검색: jest.fn(),
      검색어,
    };
    const { btn } = set(props);
    const spy = jest.spyOn(props, '검색');

    userEvent.click(btn);
    expect(spy).toBeCalledWith(검색어);
  });
});
