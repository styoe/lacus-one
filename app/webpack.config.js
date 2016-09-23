const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');

console.log(process.env.NODE_ENV)

module.exports = {
    target: "atom",
    context:path.join(__dirname, 'client'),
    entry: [
        './main.js',
        'webpack/hot/dev-server'
    ],
    output: {
        path: path.join(__dirname, 'client', 'dist'),
        filename: 'bundle.js',
        publicPath: process.env.NODE_ENV === 'dev' ? 'http://localhost:8080/' : './dist/'

    },
    resolve:{
        root:path.join(__dirname, 'client')
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            },
            'global': {}, // bizarre lodash(?) webpack workaround
            'global.GENTLY': false // superagent client fix
        }),
    ],
    module: {
        noParse: [/\.min\.js$/, /\.min\.css$/],
        loaders: [
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            },
            {
                test: /\.(woff|woff2)$/,
                loader:"url?prefix=font/&limit=5000"
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml"
            },
            {   test: /\.(png|jpg|jpeg|gif)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react'],
                    cacheDirectory:true
                }
            }
        ]
    },
    postcss: [ autoprefixer ],
    externals: [
        (function () {
            var IGNORES = [
                'electron'
            ];
            return function (context, request, callback) {
                if (IGNORES.indexOf(request) >= 0) {
                    return callback(null, "require('" + request + "')");
                }
                return callback();
            };
        })()
    ]

};