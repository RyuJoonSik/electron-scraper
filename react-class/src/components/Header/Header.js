import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Header.scss';

class Header extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    console.log('Header rendering');
    return <header className="header">{this.props.children}</header>;
  }
}

// Header.defaultProps = {};
Header.propTypes = {
  children: PropTypes.object,
};

export default Header;
