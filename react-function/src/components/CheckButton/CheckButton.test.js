import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CheckButton from './CheckButton';
import { Context } from '../Store/Store';

describe('<CheckButton />', () => {
  it('renders text', () => {
    render(<CheckButton>All check</CheckButton>);

    const button = screen.getByText('All check');
  });

  it('has click event', async () => {
    const dispatch = jest.fn();
    const checkState = true;

    render(
      <CheckButton checkState={checkState} dispatch={dispatch}>
        All check
      </CheckButton>
    );

    const button = screen.getByText('All check');

    userEvent.click(button);
    expect(dispatch).toHaveBeenCalledWith({ type: 'CHECK_ALL_PRODUCTS', payload: checkState });
    // const onExportExcel = jest.fn(() => alert('엑셀 출력 완료'));
    // render(
    //   <Context.Provider value={{ onExportExcel }}>
    //     <CheckButton onExportExcel={onExportExcel} />
    //   </Context.Provider>
    // );
    // const button = screen.getByTitle('Excel export');
    // const spy = jest.spyOn(window, 'alert');
    // userEvent.click(button);
    // await waitFor(() => expect(spy).toHaveBeenCalledWith('엑셀 출력 완료'));
  });
});
