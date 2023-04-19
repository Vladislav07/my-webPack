const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')



module.exports = {
  resolve: {
    fallback: {
      fs: false
    }

  },
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
    valid: path.resolve(__dirname, './src/validateCard.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: '[name].bundle.js',
  },
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'assets/images'),
    },
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|svg|jpeg|gif|ttf)$/i,
        type: 'asset/resource',
        generator: {
          filename: './assets/images/[name][ext]',
      },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      
      // {
      //   test: /\.(js)$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: [
      //         ['@babel/preset-env', { targets: "defaults" }]
      //       ],
      //       plugins: ['@babel/plugin-proposal-class-properties']
      //     }
      //   }
      // },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Форма оплаты',
      template: path.resolve(__dirname, './src/template.html'), // шаблон
      filename: 'index.html', // название выходного файла
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),

  ],
}
