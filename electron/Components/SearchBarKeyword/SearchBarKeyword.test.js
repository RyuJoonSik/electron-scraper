import 검색바_키워드 from './SearchBarKeyword';
import { getByDisplayValue, getByTestId } from '@testing-library/dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('SearchBarKeyword', () => {
  function set(props = {}) {
    const { body } = document;
    const component = new 검색바_키워드(body, props);

    component.렌더();

    const input = getByTestId(body, 'search-bar-input');
    const btn = getByTestId(body, 'search-bar-btn');

    return {
      body,
      input,
      btn,
    };
  }

  it('has input', async () => {
    const { input, body } = set();

    expect(input).toBeInTheDocument();

    const word = 'vitamin';

    userEvent.type(input, word);

    const newInput = getByDisplayValue(body, word);

    expect(newInput).toHaveValue(word);
  });

  it('has SearchButton', async () => {
    const props = {
      검색: jest.fn(),
    };
    const { input, btn, body } = set(props);

    expect(btn).toBeInTheDocument();

    const word = 'vitamin';

    userEvent.type(input, word);

    const newBtn = getByTestId(body, 'search-bar-btn');

    userEvent.click(newBtn);

    const spy = jest.spyOn(props, '검색');

    expect(spy).toBeCalledWith(word);
  });
});
