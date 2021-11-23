import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import './ScrollButton.scss';

ScrollButton.propTypes = {
  scrollTo: PropTypes.string,
};

function ScrollButton({ children, scrollTo }) {
  const onClick = useCallback(() => {
    let fn;

    if (scrollTo === 'top') {
      fn = () => {
        window.scroll(0, 0);
      };
    } else {
      fn = () => {
        const y = document.body.scrollHeight - window.innerHeight;

        window.scroll(0, y);
      };
    }

    fn();
  }, [scrollTo]);

  return (
    <button data-testid="scroller" onClick={onClick} className="scroller">
      {children}
    </button>
  );
}

export default ScrollButton;
