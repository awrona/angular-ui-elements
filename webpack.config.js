var webpack = require('webpack');
var path = require('path');

var config = {
    context: __dirname,
    entry: {
        'angular-ui-elements': ['webpack/hot/dev-server', './src/index.js']
    },
    externals: {
    },
    output: {
        path: path.resolve(__dirname, process.env.NODE_ENV === 'production' ? './dist/' : './build'),
        filename: '[name].js',
        libraryTarget: 'umd',
        library: '[name]'
    },
    resolve: {
        alias: {},
        extensions: ['', '.js', '.scss', '.css']
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }, {
                test: /\.(woff|png|jpg)$/,
                loader: 'url-loader?limit=100000'
            }, {
                test: /\.(scss|sass)$/,
                // Query parameters are passed to node-sass
                loader: "style!css!sass?outputStyle=expanded&" +
                "includePaths[]=" +
                (path.resolve(__dirname, "./build/bower_components")) + "&" +
                "includePaths[]=" +
                (path.resolve(__dirname, "./node_modules")) +
                "includePaths[]=" +
                (path.resolve(__dirname, "./src/css"))
            }
        ]
    },
    plugins: [
        new webpack.dependencies.LabeledModulesPlugin(),
        new webpack.ContextReplacementPlugin(/.*$/, /a^/)
    ]
};

module.exports = config;