'use strict';

const path = require('path');
// const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const TerserPlugin = require('terser-webpack-plugin');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const ManifestPlugin = require('webpack-manifest-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const InlineSourcePlugin = require('html-webpack-inline-source-plugin');
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
// const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const { version, name } = require('../package.json');

module.exports = {
  mode: 'production',
  entry: {
    'main-container': './src/main.js',
  },
  output: {
    // filename: '[name].js',
    // chunkFilename: '[name].chunk.js',
    // path: path.resolve('dist2'),
    // publicPath: '/a/b/',
  },
  // devtool: 'false',
  // resolve: {
  //   extensions: ['.js', '.json', '.jsx'],
  //   alias: {
  //     '@': path.resolve('src'),
  //   },
  // },
  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM',
  //   ReactDOM: 'ReactDOM',
  //   'react-addons-transition-group': 'React.addons.TransitionGroup',
  //   'react-addons-pure-render-mixin': 'React.addons.PureRenderMixin',
  // },
  // module: {
  //   rules: [
  //     {
  //       test: /\.(js|jsx)/,
  //       include: path.resolve('src'),
  //       exclude: /node_modules/,
  //       use: {
  //         loader: 'babel-loader',
  //         options: {
  //           cacheDirectory: true,
  //         },
  //       },
  //     },
  //     {
  //       test: /\.html$/,
  //       use: [
  //         {
  //           loader: 'html-loader',
  //           options: { minimize: { removeAttributeQuotes: false } },
  //         },
  //       ],
  //     },
  //     {
  //       test: /\.(css|less)$/,
  //       include: /node_modules/,
  //       use: [
  //         // {
  //         //   loader: MiniCssExtractPlugin.loader,
  //         //   options: {
  //         //     publicPath: '../',
  //         //   },
  //         // },
  //         {
  //           loader: 'style-loader',
  //         },
  //         {
  //           loader: 'css-loader',
  //           options: {
  //             importLoaders: 2,
  //             modules: {
  //               mode: 'global',
  //               localIdentName: '[local]',
  //             },
  //           },
  //         },
  //         {
  //           loader: 'postcss-loader',
  //           options: require('./postcss.config'),
  //         },
  //         {
  //           loader: 'less-loader',
  //           options: require('./less.config'),
  //         },
  //       ],
  //     },
  //     {
  //       test: /\.(css|less)$/,
  //       exclude: /node_modules/,
  //       use: [
  //         // {
  //         //   loader: MiniCssExtractPlugin.loader,
  //         //   options: {
  //         //     publicPath: '../',
  //         //   },
  //         // },
  //         {
  //           loader: 'style-loader',
  //         },
  //         {
  //           loader: 'css-loader',
  //           options: {
  //             importLoaders: 2,
  //             modules: {
  //               mode: 'global',
  //               localIdentName: '[local]',
  //             },
  //           },
  //         },
  //         {
  //           loader: 'postcss-loader',
  //           options: require('./postcss.config'),
  //         },
  //         {
  //           loader: 'less-loader',
  //           options: { javascriptEnabled: true },
  //         },
  //       ],
  //     },
  //     {
  //       test: /\.svg$/,
  //       loader: 'svg-url-loader',
  //       options: {
  //         limit: 10000,
  //         noquotes: true,
  //       },
  //     },
  //     {
  //       test: /\.(png|jpe?g|gif)(\?.*)?$/,
  //       loader: 'url-loader',
  //       options: {
  //         limit: 10000,
  //         name: 'img/[name].[ext]',
  //       },
  //     },
  //     {
  //       test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
  //       loader: 'file-loader',
  //       options: {
  //         name: '[name].[ext]',
  //       },
  //     },
  //   ],
  // },
  plugins: [
    // new CleanWebpackPlugin(),
    // // new AntdDayjsWebpackPlugin(),
    // new HardSourceWebpackPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: 'css/[name].css',
    //   chunkFilename: 'css/[name].chunk.css',
    // }),
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
        {
          from: path.join(__dirname, '../public/index.html'),
          to: path.join(__dirname, '../build/'),
        },
        {
          from: path.join(
            __dirname,
            '../public/MP_verify_mKV1KoUbsOX1h1YU.txt'
          ),
          to: path.join(__dirname, '../build/'),
        },
      ],
    }),
    // new HtmlWebpackPlugin({
    //   template: './public/index.html',
    //   filename: 'index.html',
    //   favicon: './public/favicon.ico',
    //   // inject: true,
    //   // inlineSource: 'runtime~.+\\.js',
    //   meta: {
    //     'x-server-env': process.env.BUILD_ENV,
    //   },
    // }),
    // new OptimizeCSSAssetsPlugin(),
    // new ManifestPlugin(),
    // new InlineSourcePlugin(),
    // new webpack.DefinePlugin({
    //   _IS_LOCAL: JSON.stringify(false),
    //   _SERVER_ENV: JSON.stringify(process.env.BUILD_ENV),
    // }),
  ],
  // 优化代码
  // optimization: {
  //   minimize: true,
  //   minimizer: [
  //     new TerserPlugin({
  //       cache: true,
  //       parallel: true,
  //     }),
  //   ],
  //   splitChunks: {
  //     chunks: 'all',
  //     cacheGroups: {
  //       libs: {
  //         name: 'vendor-libs-container',
  //         test: /[\\/]node_modules[\\/]/,
  //         priority: 10,
  //         chunks: 'initial',
  //       },
  //       antdUI: {
  //         name: 'antd-ui-container',
  //         priority: 20,
  //         test: /[\\/]node_modules[\\/]antd[\\/]/,
  //       },
  //       commons: {
  //         name: 'components',
  //         test: /src\/components/,
  //         minChunks: 3,
  //         priority: 2,
  //         reuseExistingChunk: true,
  //       },
  //     },
  //   },
  //   runtimeChunk: true,
  //   concatenateModules: true,
  // },
  // performance: {
  //   hints: false,
  // },
};
