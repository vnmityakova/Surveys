const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const appDir = path.join(__dirname, '..');
const buildDir = path.join(__dirname, '../../web/src/main/webapp');
const cssDir = 'css/';
const fontsDir = 'fonts/';
const imagesDir = 'img/';

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    survey: [
      'whatwg-fetch',
      path.join(appDir, 'src', 'index'),
    ],
  },
  output: {
    path: buildDir,
    publicPath: '/survey/',
    filename: '[name].[chunkhash].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(appDir, 'src', 'tpl', 'index.html'),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        // This prevents stylesheet resources with the .css or .scss extension
        // from being moved from their original chunk to the vendor chunk
        if (module.resource && (/^.*\.(css|scss)$/).test(module.resource)) {
          return false;
        }
        return module.context && module.context.indexOf('node_modules') !== -1;
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        NODE_HOST: JSON.stringify(process.env.NODE_HOST),
      },
    }),
    new webpack.LoaderOptionsPlugin({
      debug: false,
      minimize: true,
    }),
    new ExtractTextPlugin({
      filename: `${cssDir}bundle.[contenthash].css`,
      allChunks: true,
    }),
    new webpack.ContextReplacementPlugin(/node_modules\/moment\/locale/, /en|ru|zh-cn|zh-hk/),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        include: [path.resolve(appDir, 'src')],
        exclude: [path.resolve(appDir, 'node_modules')],
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
        include: [path.resolve(appDir, 'src')],
        exclude: [path.resolve(appDir, 'node_modules')],
      }, {
        test: /\.css$/,
        exclude: path.resolve(appDir, 'node_modules/react-toolbox'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: true,
                import: false,
              },
            }, {
              loader: 'postcss-loader',
              options: { sourceMap: true },
            },
          ],
        }),
      }, {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: true,
                import: false,
              },
            }, {
              loader: 'sass-loader',
              options: { sourceMap: true },
            },
          ],
        }),
      }, {
        test: /\.css$/,
        include: path.resolve(appDir, 'node_modules/react-toolbox'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 2,
                sourceMap: true,
                localIdentName: '[name]--[local]',
              },
            },
            {
              loader: 'postcss-loader',
              options: { sourceMap: true },
            }, {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                data: `@import "${path.resolve(appDir, './src/assets/css/theme.scss').replace(/\\/g, '/')}";`,
              },
            },
          ],
        }),
      }, {
        test: /\.(eot|svg|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `${fontsDir}[name].[ext]`,
            },
          },
        ],
      }, {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              name: `${imagesDir}[name].[ext]`,
            },
          },
        ],
      }, {
        test: /\.properties$/,
        use: [
          'json-loader',
          'java-properties-loader',
        ],
      },
    ],
  },
};
