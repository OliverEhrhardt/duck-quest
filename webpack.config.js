
const webpack = require('webpack');
const path = require('path');

const BowerWebpackPlugin = require('bower-webpack-plugin')

module.exports = {
    devtool: '#source-map',
    entry  : [
    // "webpack-dev-server/client?http://localhost:8080/",
    'webpack/hot/dev-server',
    './src/main.js',
    ],
    output : {
        path: '/',
        filename : '/dist/duckquest.min.js',
        publicPath: '/'
    },
    module: {
        loaders: [
            
            {
                test: /.*\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0'],
                }
            },
            { 
                test: /bower_components\/EaselJS\/.*\.js$/, 
                loader: 'imports?this=>window!exports?window.createjs' 
            },
            { 
                test: /bower_components\/PreloadJS\/.*\.js$/, 
                loader: 'imports?this=>window!exports?window.createjs' 
            },
            { 
                test: /bower_components\/Collision-Detection-for-EaselJS\/.*\.js$/, 
                loader: 'imports?this=>window!exports?window.ndgmr' 
            },
            {
                test: /src\/json\/maps\.json/,
                loader: 'json-loader'
            },
            {
                test: /src\/json\/manifest\.json/,
                loader: 'json-loader'
            },

        ]
    },
    plugins: [
        // new webpack.ResolverPlugin(
        //     new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
        // ),
        new webpack.HotModuleReplacementPlugin(),
        new BowerWebpackPlugin(),
    ],

    resolve: {
        // Add bower_components as a modules root
        modulesDirectories: ['node_modules', 'bower_components'],
        alias: {
            CollisionJS: path.resolve(__dirname, "./bower_components/Collision-Detection-for-EaselJS/src/ndgmr.Collision.js")
        }
    },

    devServer: {
        hot: true,
    //     contentBase: './',
    //     debug: false,
    //     colors: true,
    }
};


