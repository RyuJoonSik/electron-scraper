const path = require('path');

module.exports = {
  entry: './src/ts/index.js',
  externals: {
    fs: 'commonjs fs',
    path: 'commonjs path'
  },
  target: 'node',
  output: {
    filename: 'app.js',
    path: path.resolve(`${__dirname}/public`)
  },
  // mode: 'production'
  mode: 'development'
};
