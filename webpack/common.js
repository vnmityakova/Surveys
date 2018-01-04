const path = require('path');
const webpack = require('webpack');
const appDir = path.join(__dirname, '..');

const devServer = {
  contentBase: path.join(appDir, 'public'),
  host: '0.0.0.0',
  port: 8888,
  historyApiFallback: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
  hot: true,
};

const modules = {
  rules: [
    {
      test: /\.js$/,
      enforce: 'pre',
      loader: 'eslint-loader',
      include: [path.resolve(appDir, 'src')],
      exclude: [path.resolve(appDir, 'node_modules')],
    },
    {
      test: /\.js(x?)$/,
      exclude: [path.resolve(appDir, 'node_modules')],
      use: [
        {
          loader: 'react-hot-loader/webpack',
        }, {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      ],
      include: [path.resolve(appDir, 'src')],
    }, {
      test: /\.(scss|css)$/,
      exclude: [path.resolve(appDir, 'node_modules/react-toolbox'), path.resolve(appDir, 'node_modules/material-design-icons/iconfont')],
      use: [
        {
          loader: 'style-loader',
          options: { sourceMap: true },
        }, {
          loader: 'css-loader',
        }, /* {
          loader: 'postcss-loader',
          options: { sourceMap: true },
        },*/ {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            includePaths: [
              path.resolve('./node_modules/font-awesome/scss'),
            ],
          },
        },
      ],
    }, {
      test: /\.(css)$/,
      include: path.resolve(appDir, 'node_modules/react-toolbox'),
      exclude: [path.resolve(appDir, 'node_modules/material-design-icons/iconfont')],
      use: [
        {
          loader: 'style-loader',
          options: { sourceMap: true },
        }, {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 2,
            sourceMap: true,
            localIdentName: '[name]--[local]',
          },
        },
        /* {
          loader: 'postcss-loader',
          options: { sourceMap: true },
        }, */ {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            data: `@import "${path.resolve(appDir, './src/assets/css/theme.scss').replace(/\\/g, '/')}";`,
          },
        },
      ],
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader',
    }, {
      test: /\.(png|jpg|gif)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 10240,
            name: 'img/[name].[ext]',
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
};

const plugins = [
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
  new webpack.LoaderOptionsPlugin({ debug: true }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.ContextReplacementPlugin(/node_modules\/moment\/locale/, /en|ru|zh-cn|zh-hk/),
];

const devtool = 'inline-source-map';
const entry = {
  survey: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://0.0.0.0:8888',
    'webpack/hot/only-dev-server',
    'whatwg-fetch',
    'babel-polyfill',
    path.join(appDir, 'src', 'index'),
  ],
};
const output = {
  path: path.join(appDir, 'public'),
  filename: '[name].js',
  publicPath: '/public/',
  hotUpdateChunkFilename: 'hot/hot-update.js',
  hotUpdateMainFilename: 'hot/hot-update.json',
};
const watch = true;
const watchOptions = {
  poll: 1000,
  aggregateTimeout: 100,
};

module.exports = {
  devServer,
  devtool,
  entry,
  modules,
  output,
  plugins,
  watch,
  watchOptions,
};
