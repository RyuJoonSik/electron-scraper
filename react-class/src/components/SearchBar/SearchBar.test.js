import {render, screen} from '@testing-library/react'
import SearchBar from './SearchBar'

describe('<SearchBar />', () => {
  it('has input and button', () => {
    render(<SearchBar/>);
    
    screen.getByPlaceholderText('Keyword');
    screen.getByText('Search');
  })
})