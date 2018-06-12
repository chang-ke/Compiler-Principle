const webpack = require('webpack');
const path = require('path');
const ManifestPlugin = require('manifest-webpack-plugin');
const webpackConfigBase = require('./webpack.base');
const merge = require('webpack-merge');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webpackConfigProd = {
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                //localIdentName: "[local]__[hash:base64:5]",
                minimize: true
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('static/css/style.[hash:4].css'),
    new webpack.HashedModuleIdsPlugin(),
    new ManifestPlugin(path.join('build', 'manifest.json')),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new ParallelUglifyPlugin({
      workerCount: 4,
      uglifyJS: {
        output: {
          beautify: false, // 不需要格式化
          comments: false // 保留注释
        },
        compress: {
          // 压缩
          warnings: false, // 删除无用代码时不输出警告
          drop_console: true, // 删除console语句
          collapse_vars: true, // 内嵌定义了但是只有用到一次的变量
          reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
        }
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CleanWebpackPlugin(['build'], {
      root: path.join(__dirname, '../')
    })
  ]
};

module.exports = merge(webpackConfigBase, webpackConfigProd);
