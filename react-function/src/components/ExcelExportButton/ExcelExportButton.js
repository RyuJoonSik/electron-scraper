import React, { useContext } from 'react';
import './ExcelExportButton.scss';
import { Context } from '../Store/Store';

function ExcelExportButton() {
  const { onExportExcel } = useContext(Context);

  return (
    <button title="Excel export" onClick={onExportExcel} className="excel-export">
      📗
    </button>
  );
}

export default React.memo(ExcelExportButton);
