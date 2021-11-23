import React from 'react';
// import './ContentRow.scss';

function ContentRow({ children, margin, justifyContent = 'center' }) {
  // console.log('ContentRow render');
  const style = {
    margin: margin,
    display: 'flex',
    flex: '1 1',
    justifyContent: justifyContent,
    alignItems: 'center',
  };

  return (
    <div data-testid="content-row" style={style} className="content-row">
      {children}
    </div>
  );
}

export default React.memo(ContentRow);
