const path = require('path');

module.exports = {
  entry: './index.js',
  externals: {
    fs: 'commonjs fs',
    path: 'commonjs path'
  },
  target: 'node',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname)
  },
  // mode: 'production'
  mode: 'development'
};
