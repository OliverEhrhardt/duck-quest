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
      }
    ]
    }
};
 

