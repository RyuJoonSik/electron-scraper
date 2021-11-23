import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';
import { Context } from '../Store/Store';

describe('<SearchBar />', () => {
  const set = (value = {}) => {
    render(
      <Context.Provider value={{ ...value }}>
        <SearchBar />
      </Context.Provider>
    );

    const input = screen.getByTitle('input keyword');
    const button = screen.getByTitle('search');

    return { input, button };
  };

  it('has input, button', () => {
    const { input, button } = set();
    expect(input).toBeTruthy();
    expect(button).toBeTruthy();
  });

  it('has event by click', () => {
    const onChange = jest.fn();
    const onSearch = jest.fn();
    const { input, button } = set({ onChange, onSearch });

    userEvent.type(input, 'vitamin');
    expect(onChange).toHaveBeenCalled();
    userEvent.click(button);
    expect(onSearch).toHaveBeenCalled();
  });

  it('has event by enter', () => {
    const onChange = jest.fn();
    const onSearch = jest.fn();
    const { input } = set({ onChange, onSearch });

    userEvent.type(input, 'vitamin{enter}');
    expect(onSearch).toHaveBeenCalled();
  });
});
