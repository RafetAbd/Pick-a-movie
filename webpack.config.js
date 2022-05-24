var webpack = require('webpack');
var dotenv = require("dotenv").config({ path: __dirname + "/.env" });
const path = require('path');

module.exports = {
  // plugins: [
  //   new webpack.DefinePlugin({
  //     'process.env.REACT_APP_API_KEY': JSON.stringify(process.env.REACT_APP_API_KEY)
  //   })
  // ],
  // plugins: [
  //   new Dotenv()
  // ],
  mode: "development",
  plugins: [
    new webpack.DefinePlugin({
      "process.env.DOTENV": JSON.stringify(dotenv.parsed),
    }),
  ],
  entry: [
    './client/index.js'
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-react'
          ]
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        // Load all files with a 'mp4' extension as a video/mp4 media type
        test: /\.mp4$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'public/assets/',
            publicPath: 'assets/'
          }
        }
      },
    ]
  }
};

