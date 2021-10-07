import 검색바_브랜드 from './SearchBarBrand';
import { getByTestId, getAllByTestId } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('검색바_브랜드', () => {
  function set(props = {}) {
    const { body } = document;
    const component = new 검색바_브랜드(body, props);

    component.렌더();

    const select = getByTestId(body, 'search-bar-select');
    const options = getAllByTestId(body, 'search-bar-option');
    const btn = getByTestId(body, 'search-bar-btn');

    return {
      select,
      options,
      btn,
      body,
    };
  }

  it('has select, options', () => {
    const { select, options } = set();

    expect(select).toBeInTheDocument();
    expect(options.length).toBe(59);

    userEvent.selectOptions(select, '21st-century-health-care');
    expect(select).toHaveDisplayValue('21st Century');

    userEvent.selectOptions(select, 'aura-cacia');
    expect(select).toHaveDisplayValue('Aura Cacia');
  });

  it('has SearchButton', async () => {
    const props = {
      검색: jest.fn(),
    };
    const { select, btn, body } = set(props);

    expect(btn).toBeInTheDocument();

    userEvent.selectOptions(select, 'aura-cacia');

    const newBtn = getByTestId(body, 'search-bar-btn');
    const spy = jest.spyOn(props, '검색');

    userEvent.click(newBtn);

    const word = 'aura-cacia';

    expect(spy).toBeCalledWith(word);
  });
});
