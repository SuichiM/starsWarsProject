import path from 'path';
import {Configuration, DefinePlugin, HotModuleReplacementPlugin} from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const DotenvWebpack = require('dotenv-webpack');

const {config: configDotEnv} = require('dotenv');
const dotenv = configDotEnv();

const isDev = process.env.production || !process.env.development;
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8080;

const webpackConfig = (): Configuration => ({
  entry: './src/index.tsx',
  ...(isDev ? {devtool: 'eval-source-map'} : {}),
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsconfigPathsPlugin({configFile: './tsconfig.json'})],
  },
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
        exclude: /build/,
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          //          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  devServer: {
    host: HOST,
    port: PORT,
    open: true,
    historyApiFallback: true,
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      // HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css',
    }),
    /* new DefinePlugin({
      'process.env': `(${JSON.stringify(dotenv.parsed)})`,
    }), */
    new DotenvWebpack(),
    new ForkTsCheckerWebpackPlugin({
      // Speeds up TypeScript type checking and ESLint linting (by moving each to a separate process)
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}',
      },
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      name: 'vendors',
    },
  },
});

export default webpackConfig;
