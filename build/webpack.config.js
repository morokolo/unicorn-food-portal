let webpack = require('webpack');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let extend = require('util')._extend;

let settings = require('./settings.' + process.env.NODE_ENV);

module.exports = extend(require('./webpack.base.config'), {
    entry: {index: './src/index', vendor: './src/vendor'},
    devtool: 'source-map',
    plugins: process.env.NODE_ENV === 'production' ? [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "_": "underscore",
            // Popper: ['popper.js', 'default'],
        }),
        new CopyWebpackPlugin([
            { from: './src/assets', to: 'assets' }
        ]),
        new webpack.DefinePlugin(settings)
    ] : [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "_": "underscore",
            // Popper: ['popper.js', 'default'],
        }),
        new CopyWebpackPlugin([{ from: './src/assets', to: 'assets' }]),
        new webpack.DefinePlugin(settings)
    ]
});
