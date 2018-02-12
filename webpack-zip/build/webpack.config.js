const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: {
		app: ['./src/index.js', './src/c.js', './src/b.js', './src/a.js'],
		print: './src/print.js'
	},
	//devtool: 'inline-source-map', //追踪源代码中原始位置
	plugins: [
		new CleanWebpackPlugin(['dist']), //清除旧文件
		new HtmlWebpackPlugin({ //自动替换输出路径名称
			title: 'Output Management'
		}),
		new UglifyJSPlugin(), //精简输出(压缩混杂)
	],
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, './dist')
	},
	module: {
		loaders: [{
			test: /\.js$/, //解析文件类型
			exclude: /node_modules/, //排除node_modules文件
			loader: 'babel-loader', //使用哪种loader解析
			query: {
				presets: ['es2015', 'stage-2'] //loader的配置项，解析es6
			}
		}],
		rules: [{
			test: /\.(png|svg|jpg|gif)$/,
			use: [
				'file-loader'
			]
		}]
	},
};