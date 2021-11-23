import { render, screen } from '@testing-library/react';
import ProductIMGButton from './ProductIMGButton';
import * as scrap from '../../js/scrap';
import userEvent from '@testing-library/user-event';

describe('<ProductIMGButton />', () => {
  it('has button', () => {
    render(<ProductIMGButton />);

    const button = screen.getByTitle('download-product-imgs');

    expect(button.textContent).toBe('📷');
  });

  it('has click event', () => {
    const title = 'supplement';
    const imgURLs = [];

    render(<ProductIMGButton title={title} imgURLs={imgURLs} />);

    const spy = jest.spyOn(scrap, 'downloadIMGs').mockImplementation(() => {});
    const button = screen.getByTitle('download-product-imgs');

    userEvent.click(button);
    expect(spy).toHaveBeenCalledWith(title, imgURLs, 1000);
  });
});
