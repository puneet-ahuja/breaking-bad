var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    app : './src/index.js'
  },
  
  devServer: {
     contentBase: './dist',
      historyApiFallback:true
   },
    
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module:{
    rules:[
       {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
{ test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }
    ]
    
  },
   plugins: [
     new CleanWebpackPlugin(['dist']),
     new HtmlWebpackPlugin({
       template : './src/index.html',
       title: 'Breaking Bad'
     })
    //  ,
    //  new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: options.devtool && (options.devtool.indexOf("sourcemap") >= 0 || options.devtool.indexOf("source-map") >= 0)
    // })
   ]

};






