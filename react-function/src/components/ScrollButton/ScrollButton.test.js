import { render, screen } from '@testing-library/react';
import ScrollButton from './ScrollButton';
import userEvent from '@testing-library/user-event';

describe('<ScrollButton />', () => {
  it('has top button', () => {
    render(<ScrollButton>TOP</ScrollButton>);

    screen.getByText('TOP');
  });

  it('has bottom button', () => {
    render(<ScrollButton>BOTTOM</ScrollButton>);

    screen.getByText('BOTTOM');
  });

  it('scrolls to top', () => {
    const scrollTo = 'top';

    render(<ScrollButton scrollTo={scrollTo}>TOP</ScrollButton>);

    global.window.scroll = () => {};
    const spy = jest.spyOn(global.window, 'scroll');
    const button = screen.getByText('TOP');

    userEvent.click(button);
    expect(spy).toHaveBeenCalledWith(0, 0);
  });

  it('scrolls to bottom', () => {
    const scrollTo = 'bottom';

    render(<ScrollButton scrollTo={scrollTo}>BOTTOM</ScrollButton>);

    global.window.scroll = () => {};
    const spy = jest.spyOn(global.window, 'scroll');
    const button = screen.getByText('BOTTOM');
    const y = document.body.scrollHeight - window.innerHeight;

    userEvent.click(button);
    expect(spy).toHaveBeenCalledWith(0, y);
  });
});
