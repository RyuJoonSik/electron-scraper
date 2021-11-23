import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExcelExportButton from './ExcelExportButton';
import { Context } from '../Store/Store';

describe('<ExcelExportButton />', () => {
  it('has  button', () => {
    render(<ExcelExportButton />);

    const button = screen.getByText('📗');

    expect(button.textContent).toBe('📗');
  });

  it('has  click event', async () => {
    const onExportExcel = jest.fn(() => alert('엑셀 출력 완료'));

    render(
      <Context.Provider value={{ onExportExcel }}>
        <ExcelExportButton onExportExcel={onExportExcel} />
      </Context.Provider>
    );

    const button = screen.getByText('📗');
    const spy = jest.spyOn(window, 'alert');

    userEvent.click(button);

    await waitFor(() => expect(spy).toHaveBeenCalledWith('엑셀 출력 완료'));
  });
});
