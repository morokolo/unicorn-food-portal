let path = require("path");

module.exports = {
    output: {
        path: path.join(__dirname, '/..', '/dist/'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loaders: ['ng-annotate', 'babel-loader']},
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.(scss|sass)$/, exclude: /node_modules/, loader: 'style-loader!css-loader!sass-loader'},
            // {test: /\.html$/, exclude: /node_modules/, loader: 'raw-loader'},
            {test: /\.html$/, loader: 'html-loader' },
            {test: /\.eot(\?.*)?$/, loader: 'file'},
            {test: /\.(woff|woff2)(\?.*)?$/, loader: 'url?prefix=font/&limit=5000'},
            {test: /\.ttf(\?.*)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
            {test: /\.svg(\?.*)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
            {test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader?name=/vendor_assets/[name].[ext]'}
        ]
    },
    htmlLoader: {
        ignoreCustomFragments: [/\{\{.*?}}/],
        root: path.resolve(__dirname, 'assets')
    }
};
