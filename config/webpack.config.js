const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry: './../src/js/main.js',
	output: {
		path: path.resolve(__dirname, './../build/assets/js'),
		filename: 'bundle.js'
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
					presets: ['env']
                }
			}
		]
	},
	devtool: 'source-map'
};
