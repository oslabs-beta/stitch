const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/client/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devtool: 'source-map',
  mode: process.env.NODE_ENV,
  devServer: {
    host: 'localhost',
    port: '8080',
    hot: true,
    open: false,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'dist'),
      publicPath: '/dist',
    },
    headers: { 'Allow-Control-Allow-Origin': '*' },
    proxy: {
      '/': { target: 'http://localhost:3000', timeout: 500000 },
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { targets: 'defaults' }],
            [
              '@babel/preset-react',
              { targets: 'defaults', runtime: 'automatic' },
            ],
          ],
        },
      },
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: { loader: 'ts-loader' },
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'source-map-loader',
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/index.html',
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};
