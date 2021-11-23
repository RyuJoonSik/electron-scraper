import React from 'react';

function App(props) {
  return (
    <div>
      
    </div>
  );
}

export default App;


// import React, { Component } from 'react';
// import './App.scss';
// import Header from './components/Header/Header';
// import SearchBar from './components/Header/SearchBar';
// import Main from './components/Main/Main';
// import Controller from './components/Main/Controller';
// import ProductList from './components/Main/ProductList';
// import { searchKeyword, getProductInfo, searchPage } from './js';

// class App extends Component {
//   constructor(props) {
//     super(props);

//     this.URL = 'https://kr.iherb.com/search';
//     this.state = {
//       curInput: '',
//       lastPageNum: 0,
//       curPageNum: 0,
//       page: {},
//       queryParam: {
//         noi: 24,
//         kw: null,
//         p: 1,
//       },
//     };
//   }

//   resetKeyword(keyword) {
//     try {
//       return new Promise((resolve) => {
//         this.setState(
//           (state) => ({
//             lastPageNum: 0,
//             curPageNum: 0,
//             page: {},
//             queryParam: {
//               ...state.queryParam,
//               kw: keyword,
//             },
//           }),
//           () => {
//             resolve();
//           },
//         );
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   setPage(lastPageNum, curPageNum) {
//     try {
//       return new Promise((resolve) => {
//         this.setState(
//           {
//             lastPageNum: lastPageNum,
//             curPageNum: curPageNum,
//           },
//           resolve,
//         );
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   handleOnChange(e) {
//     try {
//       const { value: NEW_VAL } = e.target;

//       this.setState({ curInput: NEW_VAL });
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   addProduct(pageNum, product) {
//     try {
//       return new Promise((resolve) => {
//         this.setState((state) => {
//           return {
//             page: {
//               ...state.page,
//               [pageNum]: state.page[pageNum].concat(product),
//             },
//           };
//         }, resolve);
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   setPageArray(pageNum) {
//     try {
//       return new Promise((resolve) => {
//         this.setState((state) => {
//           return {
//             page: {
//               ...state.page,
//               [pageNum]: [],
//             },
//           };
//         }, resolve);
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   async handleOnClickSearch() {
//     try {
//       const { curInput: CUR_INPUT } = this.state;

//       if (CUR_INPUT === '') {
//         alert('검색어를 입력 해 주세요.');

//         return;
//       }

//       await this.resetKeyword(CUR_INPUT);

//       const RESULT = await searchKeyword(this.URL, this.state.queryParam);
//       if (RESULT) {
//         const { LAST_PAGE_NUM, PRODUCT_URLS } = RESULT;
//         const CUR_PAGE_NUM = 1;

//         await this.setPage(LAST_PAGE_NUM, CUR_PAGE_NUM);
//         await this.setPageArray(CUR_PAGE_NUM);

//         for (const URL of PRODUCT_URLS) {
//           const PRODUCT = await getProductInfo(URL);

//           await this.addProduct(CUR_PAGE_NUM, PRODUCT);
//         }
//       } else {
//         alert('검색된 결과가 없습니다.');
//         return;
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   setQueryParam(num) {
//     try {
//       return new Promise((resolve) => {
//         this.setState((state) => {
//           return {
//             queryParam: {
//               ...state.queryParam,
//               p: num,
//             },
//           };
//         }, resolve);
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   async handleOnClickNext(pageNum) {
//     try {
//       if (
//         pageNum < 1 ||
//         pageNum > this.state.lastPageNum ||
//         pageNum === this.state.curPageNum
//       ) {
//         return;
//       }

//       const PAGE = this.state.page;
//       const NEXT_PAGE_NUM = pageNum;

//       if (!PAGE[NEXT_PAGE_NUM]) {
//         await this.setQueryParam(NEXT_PAGE_NUM);

//         const PRODUCT_URLS = await searchPage(this.URL, this.state.queryParam);

//         this.setState((state) => ({
//           curPageNum: NEXT_PAGE_NUM,
//         }));

//         await this.setPageArray(NEXT_PAGE_NUM);

//         for (const URL of PRODUCT_URLS) {
//           const PRODUCT = await getProductInfo(URL);

//           await this.addProduct(NEXT_PAGE_NUM, PRODUCT);
//         }
//       } else {
//         this.setState((state) => ({
//           curPageNum: NEXT_PAGE_NUM,
//         }));
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   onClickProduct(index) {
//     const { curPageNum: CUR_PAGE_NUM } = this.state;

//     this.setState((state) => ({
//       ...state,
//       page: {
//         ...state.page,
//         [CUR_PAGE_NUM]: [...state.page[CUR_PAGE_NUM]].map((val, idx) =>
//           idx === index
//             ? {
//                 ...val,
//                 isChecked: !state.page[CUR_PAGE_NUM][idx].isChecked,
//               }
//             : val,
//         ),
//       },
//     }));
//   }

//   onClickAllProductsCheck(toggleState) {
//     const { curPageNum: CUR_PAGE_NUM } = this.state;

//     this.setState((state) => ({
//       ...state,
//       page: {
//         ...state.page,
//         [CUR_PAGE_NUM]: [...state.page[CUR_PAGE_NUM]].map((val) => ({
//           ...val,
//           isChecked: toggleState,
//         })),
//       },
//     }));
//   }

//   shouldComponentUpdate(nextProps, nextState) {
//     let result = false;

//     if (
//       nextState.queryParam.kw !== this.state.queryParam.kw ||
//       nextState.lastPageNum !== this.state.lastPageNum ||
//       nextState.curPageNum !== this.state.curPageNum ||
//       nextState.page !== this.state.page
//     ) {
//       result = true;
//     }

//     return result;
//   }

//   render() {
//     console.log('App rendering');
//     const { queryParam, lastPageNum, page, curPageNum } = this.state;

//     return (
//       <>
//         <Header>
//           <SearchBar
//             handleEvent={[
//               this.handleOnChange.bind(this),
//               this.handleOnClickSearch.bind(this),
//             ]}
//           />
//         </Header>
//         <Main KEYWORD={queryParam.kw} PAGE_TOTAL_NUM={lastPageNum}>
//           {page[curPageNum] && (
//             <>
//               <ProductList
//                 PRODUCTS={page[curPageNum]}
//                 onClickProduct={this.onClickProduct.bind(this)}
//               />
//               <Controller
//                 PAGE={this.state.page}
//                 CUR_PAGE_NUM={curPageNum}
//                 LAST_PAGE_NUM={lastPageNum}
//                 KEYWORD={queryParam.kw}
//                 handleEvent={[
//                   this.handleOnClickNext.bind(this),
//                   this.onClickAllProductsCheck.bind(this),
//                 ]}
//               />
//             </>
//           )}
//         </Main>
//       </>
//     );
//   }
// }

// export default App;
