const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const packageJSON = require('./package.json');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const moduleName = 'flights.search.widget';

// For DEV mode prepend "NODE_ENV=dev" before "webpack" command.
// terminal: NODE_ENV=dev webpack
/* global process */
const isDevMode = process.env.NODE_ENV === 'development';

// Streaming compiled styles to the separate ".css" file.
const extractSass = new ExtractTextPlugin({
	filename: `${moduleName}.min.css`
});

const extractNemoSass = new ExtractTextPlugin({
	filename: `nemo-${moduleName}.min.css`
});

const config = {
	// Root folder for Webpack.
	context: __dirname,

	entry: {
		[moduleName]: ['whatwg-fetch', './src/main.tsx'],
		demo: './src/demo.tsx'
	},

	// Watch for changes in file.
	watch: isDevMode,

	mode: isDevMode ? 'development' : 'production',

	watchOptions: {
		// Do not watch for changes in "node_modules".
		ignored: /node_modules/,

		// Webpack will wait for 300ms before building bundles.
		aggregateTimeout: 300
	},

	output: {
		// Folder to store generated files.
		path: path.resolve(__dirname, 'dist'),

		// Path for loading assets.
		publicPath: '/dist/',

		// Output file name.
		filename: '[name].min.js',
		library: 'FlightsSearchWidget',
		libraryTarget: 'umd'
    },

	performance: {
		hints: false
	},

	optimization: {
		minimizer: !isDevMode ? [new UglifyJsPlugin({
				uglifyOptions: {
					compress: {
						reduce_funcs: false
					}
				}
		})] : []
	},

	resolve: {
		// Where to look for modules.
		modules: [
			'node_modules',
			path.resolve(__dirname, 'src'),
			path.resolve(__dirname, 'dist')
		],
		extensions: ['.ts', '.js', '.json', '.jsx', '.tsx', '.css', '.scss']
	},

	module: {
		// List of loaders ("handlers") for different types of files.
		rules: [
			// Handling ".tsx" and ".ts" files in "/src" folder.
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				include: [
					path.resolve(__dirname, 'src')
				],

				// Do not parse these folders.
				exclude: [
					path.resolve(__dirname, 'node_modules')
				]
			},

			// Handling ".scss" files, converting them to ".css", appending vendor prefixes.
			{
				test: /\.scss$/,
				include: [
					path.resolve(__dirname, 'src/css')
				],
				exclude: [
					path.resolve(__dirname, 'src/css/nemo')
				],
				use: extractSass.extract({
					use: [
						// Allows to import CSS through JavaScript.
						{
							loader: 'css-loader',
							options: {
								minimize: !isDevMode
							}
						},
						'resolve-url-loader', // Resolving relative URL in CSS code.
						'postcss-loader', // Using autoprefixe plugin.
						'sass-loader' // Compiles Sass to CSS.
					],
					fallback: 'style-loader',
					publicPath: path.resolve(__dirname, 'dist')
				})
			},

			// Handling ".scss" files for nemo default theme
			{
				test: /\.scss$/,
				include: [
					path.resolve(__dirname, 'src/css/nemo')
				],
				use: extractNemoSass.extract({
					use: [
						// Allows to import CSS through JavaScript.
						{
							loader: 'css-loader',
							options: {
								minimize: !isDevMode
							}
						},
						'resolve-url-loader', // Resolving relative URL in CSS code.
						'postcss-loader', // Using autoprefixe plugin.
						'sass-loader' // Compiles Sass to CSS.
					],
					fallback: 'style-loader',
					publicPath: path.resolve(__dirname, 'dist')
				})
			},

			// Handling fonts and converting them to base64 format.
			{
				test: /\.woff$/,
				loader: 'url-loader',
				options: {
					limit: 50000,
					mimetype: 'application/font-woff'
				},
				include: [
					path.resolve(__dirname, 'src/css/fonts')
				]
			},

			// Handling SVG images.
			{
				test: /\.svg$/,
				loader: 'url-loader',
				include: [
					path.resolve(__dirname, 'src/css/images'),
					path.resolve(__dirname, 'src/css/nemo/images')
				],
				options: {
					publicPath: '',
					outputPath: '',
					name: '/[name].[ext]'
				}
			}
		]
	},

	plugins: [
		extractSass,
		extractNemoSass,
		new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru|en|de|ro/)
	]
};

if (!isDevMode) {
	config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
}

config.plugins.push(
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify(isDevMode ? 'development' : 'production'),
			VERSION: JSON.stringify(packageJSON.version)
		}
	})
);

module.exports = config;
