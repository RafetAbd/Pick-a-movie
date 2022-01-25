var webpack = require('webpack');
var dotenv = require("dotenv").config({ path: __dirname + "/.env" });

module.exports = {
  // plugins: [
  //   new webpack.DefinePlugin({
  //     'process.env.REACT_APP_API_KEY': JSON.stringify(process.env.REACT_APP_API_KEY)
  //   })
  // ],
  // plugins: [
  //   new Dotenv()
  // ],
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
      }
    ]
  },
}
