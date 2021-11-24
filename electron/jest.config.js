module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.js'],
  roots: [
    'Components/Component',
    'Components/SearchResult',
    'Components/SearchType',
    'Components/SearchButton',
    'Components/SearchBarBrand',
    // "Components/SearchBarKeyword",
    // "Components/DownloadBar",
    'js/domUtility'
  ]
};
