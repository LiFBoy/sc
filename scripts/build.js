// 线上构建脚本
// @author Pluto <huarse@gmail.com>
// @create 2020/06/01 00:01

// const ora = require('ora');
const webpack = require('webpack');
// const { print } = require('@irim/bin-tool');
const prodConfig = require('../config/webpack.config.prod');

// const { ANALYZER } = process.env;

// process.on('unhandledRejection', (err) => {
//   print('error', `unhandledRejection: ${err}`);
//   throw err;
// });

// if (ANALYZER) {
//   const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
//   prodConfig.plugins.push(new BundleAnalyzerPlugin());
// }

// const spinner = ora('项目构建中...').start();
webpack(prodConfig, (err, stats) => {
  // spinner.stop();
  // if (err) {
  //   console.error(err.stack || err);
  //   if (err.details) {
  //     console.error(err.details);
  //   }
  //   return;
  // }
  // const info = stats.toJson();
  // if (stats.hasErrors()) {
  //   print('error', '项目构建失败！');
  //   process.exit(1);
  // }
  // if (stats.hasWarnings()) {
  //   print('warn', info.warnings);
  // }
  // print('success', '项目构建完成！');
});
