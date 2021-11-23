import { render, screen } from '@testing-library/react';
import Header from './Header';
import { Context } from '../Store/Store';

describe('<Header />', () => {
  it('renders SearchBar', () => {
    const onSearch = jest.fn();

    render(
      // <Context.Provider value={{ onSearch }}>
      <Header />
      // </Context.Provider>
    );

    screen.getByTestId('search-bar');
  });
});
