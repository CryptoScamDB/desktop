import { join } from 'path';
import { Configuration } from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as merge from 'webpack-merge';

const rootPath = join(__dirname, '..');

const config: Configuration = {
  output: {
    path: join(rootPath, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.scss', '.graphql']
  },
  node: {
    __dirname: false,
    __filename: false
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              useCache: true,
              useBabel: true,
              babelCore: '@babel/core',
              babelOptions: {
                babelrc: true
              }
            }
          }
        ],
        exclude: /node_modules/,
        include: [join(rootPath, 'src')]
      },
      {
        test: /\.graphql$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/fonts/[name].[ext]'
        }
      },
      {
        test: /\.(png|svg|jpe?g)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/images/[name].[ext]'
        }
      }
    ]
  }
};

export const main = merge.smart(config, {
  target: 'electron-main',
  entry: {
    main: join(rootPath, 'src/main')
  }
});

export const renderer = merge.smart(config, {
  target: 'electron-renderer',
  entry: {
    renderer: join(rootPath, 'src/renderer')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: join(rootPath, 'src/renderer/index.html')
    })
  ]
});
