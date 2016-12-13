
const webpack = require('webpack');
const path = require('path');

module.exports = {
    devtool: '#source-map',
    entry  : './src/main.js',
    output : {
        path     : __dirname,
        filename : 'dist/duckquest.min.js'
    },
    resolve :{
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0']
                }
            },
            { 
                test: /bower_components\/EaselJS\/.*\.js$/, 
                loader: 'imports?this=>window!exports?window.createjs' 
            },
            { 
                test: /bower_components\/PreloadJS\/.*\.js$/, 
                loader: 'imports?this=>window!exports?window.createjs' 
            }        ]
    },
    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
        )    
    ],

    resolve: {
        // Add bower_components as a modules root
        modulesDirectories: ['node_modules', 'bower_components']
    }
};


