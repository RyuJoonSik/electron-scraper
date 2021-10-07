import 검색_유형 from './SearchType';
import { getByTestId } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('SearchType', () => {
  function set(props = {}) {
    const { body } = document;
    const component = new 검색_유형(body, props);

    component.렌더();

    const inputBrand = getByTestId(body, 'search-type-brand');
    const inputKeyword = getByTestId(body, 'search-type-keyword');
    const labelBrand = getByTestId(body, 'search-type-brand-label');
    const labelKeyword = getByTestId(body, 'search-type-keyword-label');

    return {
      inputBrand,
      inputKeyword,
      labelBrand,
      labelKeyword,
    };
  }

  it('has inputs', async () => {
    const props = {
      유형_변경: jest.fn(),
      유형: 'keyword',
    };
    const { inputBrand, inputKeyword } = set(props);

    expect(inputBrand).toBeInTheDocument();
    expect(inputKeyword).toBeInTheDocument();
    expect(inputKeyword).toBeChecked();

    userEvent.click(inputBrand);
    expect(inputBrand).toBeChecked();
    expect(inputKeyword).not.toBeChecked();
  });

  it('has labels', () => {
    const props = {
      유형_변경: jest.fn(),
      유형: 'keyword',
    };
    const { inputBrand, inputKeyword, labelBrand, labelKeyword } = set(props);

    expect(labelBrand).toBeInTheDocument();
    expect(labelKeyword).toBeInTheDocument();

    userEvent.click(labelBrand);
    expect(inputBrand).toBeChecked();
    expect(inputKeyword).not.toBeChecked();
  });

  it('has click event', () => {
    const props = {
      유형_변경: jest.fn(),
      유형: 'keyword',
    };
    const { labelBrand, labelKeyword } = set(props);
    const spy = jest.spyOn(props, '유형_변경');

    userEvent.click(labelKeyword);
    expect(spy).toBeCalled();
    userEvent.click(labelBrand);
    expect(spy).toBeCalled();
  });
});
