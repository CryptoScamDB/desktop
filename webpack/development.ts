import * as webpack from 'webpack';
import * as merge from 'webpack-merge';
import { main, renderer } from './common';

const development: webpack.Configuration = {
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
      }
    ]
  },
  devServer: {
    host: 'localhost',
    port: 3000,
    historyApiFallback: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.ELECTRON_ENV': JSON.stringify('development')
    })
  ]
} as any;

export default [merge.smart(main, development), merge.smart(renderer, development)];
