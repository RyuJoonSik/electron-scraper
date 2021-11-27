module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.js'],
  roots: [
    '컴포넌트들/컴포넌트',
    '컴포넌트들/검색_결과',
    '컴포넌트들/검색_유형',
    '컴포넌트들/검색_버튼',
    '컴포넌트들/브랜드_검색바',
    '컴포넌트들/키워드_검색바',
    '컴포넌트들/다운로드바',
    // '컴포넌트들/헤더',
    'js/domUtility'
  ]
};
