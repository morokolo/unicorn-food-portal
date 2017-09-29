let webpack = require('webpack');
let extend = require('util')._extend;

let settings = require('./settings.test');

module.exports = extend(require('./webpack.base.config'), {
    entry: {test: './src/test'},
    devtool: 'source-map',
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "_": "underscore"
        }),
        new webpack.DefinePlugin(settings)
    ]
});
