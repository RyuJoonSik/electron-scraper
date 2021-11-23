import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SearchBar.scss';
// import { searchKeyword } from '../../js';

class SearchBar extends Component {
  // constructor(props) {
  //   super(props);

  //   this.URL = 'https://kr.iherb.com/search';
  //   this.state = {
  //     queryParam: {
  //       noi: 24,
  //       kw: '',
  //       p: 1,
  //     },
  //   };
  // }

  shouldComponentUpdate() {
    return false;
  }

  // onChange(e) {
  //   try {
  //     this.setState((state) => ({
  //       queryParam: { ...state.queryParam, kw: e.target.value },
  //     }));
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  // async onClick() {
  //   try {
  //     if (this.state.queryParam.kw === '') {
  //       alert('키워드를 입력 해 주세요.');

  //       return;
  //     }

  //     const { URL, state } = this;
  //     const PAGE = await searchKeyword(URL, state.queryParam);
  //     const RESULT_SELECTOR = 'FilteredProducts';

  //     if (PAGE.getElementById(RESULT_SELECTOR)) {
  //       console.log('hi');
  //     } else {
  //       alert('검색 결과가 없습니다.');

  //       return;
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  render() {
    console.log('SearchBar rendering');
    const [handleOnChange, handleOnClick] = this.props.handleEvent;

    return (
      <>
        <div className="search-bar">
          <input
            type="text"
            placeholder="키워드"
            name="keyword"
            autoComplete="off"
            onChange={handleOnChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleOnClick();
              }
            }}
            className="search-bar__input"
          ></input>
          <button
            type="button"
            className="search-bar__button"
            onClick={handleOnClick}
          >
            🔍
          </button>
        </div>
      </>
    );
  }
}

// SearchBar.defaultProps = {};
SearchBar.propTypes = {
  handleEvent: PropTypes.arrayOf(PropTypes.func),
};

export default SearchBar;
