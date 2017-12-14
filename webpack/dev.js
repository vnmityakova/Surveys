const {
  devServer,
  devtool,
  entry,
  modules,
  plugins,
  output,
  watch,
  watchOptions,
} = require('./common');

module.exports = {
  devServer,
  devtool,
  entry,
  module: modules,
  plugins,
  output,
  watch,
  watchOptions,
};
