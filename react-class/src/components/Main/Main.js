import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Main.scss';

class Main extends Component {
  render() {
    console.log('Main rendering');
    const { KEYWORD, PAGE_TOTAL_NUM, children } = this.props;

    return (
      <main className="main">
        <h1 className="main__title">
          😎&quot;{KEYWORD}&quot;｜📄{PAGE_TOTAL_NUM}
        </h1>
        {children}
      </main>
    );
  }
}

// Main.defaultProps = {};
Main.propTypes = {
  children: PropTypes.any,
  KEYWORD: PropTypes.string,
  PAGE_TOTAL_NUM: PropTypes.number,
};

export default Main;
