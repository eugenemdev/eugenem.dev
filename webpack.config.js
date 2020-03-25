const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const isDevelopment = process.env.NODE_ENV === 'development'

// copy files from /src to /dist
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/main/client/js/index.tsx',
  output: {
    path: path.resolve(__dirname, 'target/classes/static'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.s(a|c)ss$/,
        // include: /styles/,
        include: [/(.*?)\/(.*?)\/(.*?).scss/],
        // [ path.resolve(__dirname, 'styles') //,
        // path.resolve(__dirname, '/components/*/')
        // ],
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader'
            },
            'sass-loader'
          ]
        })
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true // webpack@2.x and newer
            }
          }
        ]
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.css']
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //  template: './src/main/resources/templates/index.html'
    // }),
    new ExtractTextPlugin('./style.css'),

    /*
    new HtmlWebpackPlugin({
      title: 'Webpack 4 Starter',
      template: './src/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false
      }
    }),
    new ExtractTextPlugin('style.css'),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].css'
    }),
    */

    new CopyWebpackPlugin([{
      from: './src/main/client/fonts',
      to: './fonts'
    },
    {
      from: './src/main/client/favicon',
      to: './favicon'
    },
    {
      from: './src/main/client/images',
      to: './images'
    },
    {
      from: './content/images',
      to: './images'
    },
    {
      from: './content/thumbnails',
      to: './thumbnails'
    }
    ])
  ]
}
