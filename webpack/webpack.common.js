const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require("webpack");
// const CopyPlugin = require('copy-webpack-plugin')
module.exports = {
  entry: path.resolve(__dirname, '../src/index.tsx'),
  devServer: {
    historyApiFallback: {
      rewrites: [
        {
          from: /^\/detail\/index.js$/,
          to: function(context) {
            return 'index.js';
          }
        },
        {
          from: /^\/detail\/.*$/,
          to: function(context) {
            return 'index.html';
          }
        }        
      ]      
    }},
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '..', './build'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Yeni kimi',
      favicon: "public/assets/images/YK Logo.png",
      template: path.resolve(__dirname, '..', './public/index.html'),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'API_URL' : JSON.stringify('https://yenikimi.store/api/'),
      }
    })
  ],
  resolve: {
    alias: {
      components: path.resolve(__dirname, '../src/app/components/'),
      store: path.resolve(__dirname, '../src/app/store/'),
      assets: path.resolve(__dirname, '../src/assets/'),
      constants: path.resolve(__dirname, '../src/constants/'),
      hooks: path.resolve(__dirname, '../src/app/hooks'),
    },
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  stats: 'errors-only',
  performance: {
    hints: false
  }
}
