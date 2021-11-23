export default function myReduce(state, { type, payload }) {
  try {
    switch (type) {
      case 'SET_KEYWORD':
        return {
          ...state,
          keyword: payload,
        };

      case 'SET_LAST_PAGE_NUM':
        return {
          ...state,
          lastPageNum: payload,
        };

      case 'SET_CURRENT_PAGE_NUM':
        return {
          ...state,
          curPageNum: payload,
        };

      case 'SET_PAGE_PRODUCTS':
        return {
          ...state,
          page: { ...state.page, [payload.pageNum]: payload.products },
        };

      case 'CHECK_PRODUCT':
        return {
          ...state,
          page: {
            ...state.page,
            [state.curPageNum]: state.page[state.curPageNum].map((v, i) =>
              i === payload
                ? {
                    ...v,
                    isChecked: !v.isChecked,
                  }
                : v
            ),
          },
        };

      case 'CHECK_ALL_PRODUCTS':
        return {
          ...state,
          page: {
            ...state.page,
            [state.curPageNum]: state.page[state.curPageNum].map((v, i) => ({
              ...v,
              isChecked: payload,
            })),
          },
        };

      case 'INPUT_VALUE':
        return {
          ...state,
          input: payload,
        };

      default:
        console.log('nothing occur');
    }
  } catch (err) {
    console.error(err);
  }
}
