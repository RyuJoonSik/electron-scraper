import React, { useReducer, createContext, useCallback, useMemo, useRef } from 'react';
import {
  getPage,
  getLastPageNum,
  getProductURLs,
  getProductInfo,
  hasResult,
  hasProhibitedIngredients,
  downloadExcel,
} from '../../js/scrap';
import prohibitedIngredients from '../../js/ingredients';
import myReduce from '../../js/myReduce';

const Context = createContext({});

function Store({ children }) {
  // console.log('Store render');
  const [state, dispatch] = useReducer(myReduce, {
    input: '',
    keyword: '',
    curPageNum: 0,
    lastPageNum: 0,
    page: {},
  });

  const ingredients = useRef(prohibitedIngredients);

  const addProduct = useCallback(
    async (page, pageNum) => {
      try {
        const products = [];

        for (let URL of getProductURLs(page)) {
          const product = await getProductInfo(URL);
          const content = product.title + product.overview;

          if (!hasProhibitedIngredients(ingredients.current, content)) {
            products.push(product);
            dispatch({ type: 'SET_PAGE_PRODUCTS', payload: { pageNum, products } });
          }
        }
      } catch (err) {
        console.error(err);
      }
    },
    [ingredients]
  );

  const onExportExcel = useCallback(async () => {
    try {
      await downloadExcel(state.page[state.curPageNum]);
    } catch (err) {
      console.error(err);
    }
  }, [state.page, state.curPageNum]);

  const onMove = useCallback(
    async (to) => {
      if (to < 1 || to > state.lastPageNum) {
        return;
      }

      if (!state.page[to]) {
        const page = await getPage(`https://kr.iherb.com/search?kw=${state.keyword}&p=${to}`);

        addProduct(page, to);
      }

      dispatch({ type: 'SET_CURRENT_PAGE_NUM', payload: to });
    },
    [addProduct, state]
  );

  const onChange = useCallback(({ target: { value } }) => {
    dispatch({ type: 'INPUT_VALUE', payload: value });
  }, []);

  const onSearch = useCallback(
    async ({ type, key }) => {
      if (type !== 'click' && (type !== 'keydown' || key !== 'Enter')) {
        return;
      }

      const { input } = state;

      if (input === '') {
        alert('키워드를 입력 해 주세요.');

        return;
      }

      const page = await getPage(`https://kr.iherb.com/search?kw=${input}`);

      if (!hasResult(page)) {
        alert('결과가 없습니다.');

        return;
      }

      dispatch({ type: 'SET_KEYWORD', payload: input });
      dispatch({ type: 'SET_LAST_PAGE_NUM', payload: getLastPageNum(page) });
      addProduct(page, 1);
      dispatch({ type: 'SET_CURRENT_PAGE_NUM', payload: 1 });
    },
    [state, addProduct]
  );

  return (
    <Context.Provider value={{ state, dispatch, onChange, onSearch, onExportExcel, onMove }}>
      {children}
    </Context.Provider>
  );
}

export { Context };
export default Store;
