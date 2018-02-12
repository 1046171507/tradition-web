const path = require('path');

module.exports = {
	ROOT_PATH:path.resolve(__dirname), //path.resolve(__dirname,'./src') //根路径
	path: 'dist', //合并压缩保存路径
	entry: { //压缩配置文件
		vendor: ['./src/print.js'],
		app: ['./src/index.js'],
		abc: ['./src/a.js', './src/b.js', './src/c.js']
	},
	common: { // 指定公共 bundle 的名称
		name: ['vendor', 'common'] //将vendor对应的独立提取出来,将剩下的符合提取条件的提取到common中
	}
};