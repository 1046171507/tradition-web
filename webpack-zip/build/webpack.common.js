const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const zipConfig = require('../zip.config.js');

const ROOT_PATH = zipConfig.ROOT_PATH;

module.exports = {
	entry: zipConfig.entry, //压缩入口
	devtool: 'inline-source-map', //追踪源代码中原始位置
	plugins: [
		new CleanWebpackPlugin([zipConfig.path], { //压缩后文件夹
			root: ROOT_PATH,
		}), //清除旧文件
		//new HtmlWebpackPlugin({ //自动替换输出路径名称
		//	title: 'Output Management'
		//}),
		new webpack.optimize.CommonsChunkPlugin(zipConfig.common) //提取公共部分
	],
	output: { //压缩出口
		filename: '[name].js',
		//filename: '[name].[hash:7].js',
		path: path.resolve(ROOT_PATH, zipConfig.path)
	},
	module: {
		loaders: [{
				test: /\.js$/, //解析文件类型
				exclude: /node_modules/, //排除node_modules文件
				loader: 'babel-loader', //使用哪种loader解析
				query: {
					presets: ['es2015', 'stage-2'] //loader的配置项，解析es6
				}
			},
			{
				test: /\.tpl/,
				loader: 'art-template-loader'
			}
		],
	},
};