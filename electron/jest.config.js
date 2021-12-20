module.exports = {
  testEnvironment: 'jsdom',
  // setupFilesAfterEnv: ['./jest.setup.js'],
  roots: [/* 'src/components/Component',  */ 'src/ts/observer', 'src/components/ObserverComponent'],
  testMatch: ['**/?(*.)+(spec|test).ts']
};
