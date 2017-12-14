const path = require('path');
const webpack = require('webpack');
const appDir = path.join(__dirname, '..');
const buildDir = path.join(__dirname, '../../web/src/main/webapp');

module.exports = {
  entry: {
    vendor: [path.join(appDir, 'src', 'vendor')],
  },
  output: {
    path: buildDir,
    filename: '[name].js',
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(buildDir, '[name]-manifest.json'),
      name: '[name]',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: false,
      minimize: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.ContextReplacementPlugin(/node_modules\/moment\/locale/, /en|ru|zh-cn|zh-hk/),
  ],
};
