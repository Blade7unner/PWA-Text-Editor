const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
      }),
      new WebpackPwaManifest({
        filename: 'manifest.json',
        name: 'Just Another Text Editor',
        short_name: 'JATE', 
        description: 'The PWA-Text-Editor is a progressive web application providing an intuitive text editor experience with seamless offline functionality.', // Add description
        icons: [
          {
            src: path.resolve('src/assets/icons/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            type: 'image/png', 
            destination: path.join('assets', 'icons'),
          },
        ],
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js',
        exclude: [/\.map$/, /manifest\.json$/, /index\.html$/],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
