const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const eslintFormatter = require('eslint-friendly-formatter');
// const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const { version, name } = require('../package.json');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve('build'),
    publicPath: '/',
  },
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      '@': path.resolve('src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve('src'),
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
              rules: {
                'no-debugger': 0,
              },
            },
            loader: 'eslint-loader',
          },
        ],
      },
      {
        test: /\.(js|jsx)/,
        include: path.resolve('src'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(css|less)$/,
        include: /node_modules/, // 注意两个 loader 的区别，这个只针对 node_modules 中的内容
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                mode: 'global',
                localIdentName: '[local]-[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: require('./postcss.config'),
          },
          {
            loader: 'less-loader',
            options: require('./less.config'),
          },
        ],
      },
      {
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                mode: 'global',
                localIdentName: '[local]-[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: require('./postcss.config'),
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    // new AntdDayjsWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(
            __dirname,
            '../public/WW_verify_tiBXkzfzGplpEvPI.txt'
          ),
          to: path.join(__dirname, '../build/'),
        },
        {
          from: path.join(
            __dirname,
            '../public/WW_verify_z0zLT4BdxCQyUhOW.txt'
          ),
          to: path.join(__dirname, '../build/'),
        },
      ],
    }),
    new HtmlWebPackPlugin({
      filename: 'index.html',
      template: './public/index.html',
      favicon: './public/favicon.ico',
      inject: true,
      meta: {
        'x-server-env': process.env.BUILD_ENV,
      },
    }),
    new webpack.DefinePlugin({
      _IS_LOCAL: JSON.stringify(true),
      _SERVER_ENV: JSON.stringify(process.env.BUILD_ENV),
    }),
  ],
};
