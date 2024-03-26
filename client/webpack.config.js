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
        template: './src/index.html', // Specify the template HTML file
        filename: 'index.html', // Output HTML filename
      }),
      new WebpackPwaManifest({
        filename: 'manifest.json', // Output manifest filename
        name: 'Just Another Text Editor', // Application name
        short_name: 'JATE', // Short name
        icons: [
          {
            src: path.resolve('src/assets/icons/icon.png'), // Path to the icon file
            sizes: [96, 128, 192, 256, 384, 512], // Icon sizes
            destination: path.join('assets', 'icons'), // Destination directory for icons
          },
        ],
        start_url: '/', // Start URL
        display: 'standalone', // Display mode
        background_color: '#ffffff', // Background color
        theme_color: '#ffffff', // Theme color
      }),
      new InjectManifest({
        swSrc: './src-sw.js', // Path to the service worker file
        swDest: 'service-worker.js', // Output service worker filename
        exclude: [/\.map$/, /manifest\.json$/, /index\.html$/], // Files to exclude from the service worker
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/, // CSS file extension
          use: ['style-loader', 'css-loader'], // Use style-loader and css-loader
        },
        {
          test: /\.js$/, // JavaScript file extension
          exclude: /node_modules/, // Exclude node_modules
          use: {
            loader: 'babel-loader', // Use babel-loader for transpiling
            options: {
              presets: ['@babel/preset-env'], // Use @babel/preset-env for JavaScript compilation
            },
          },
        },
      ],
    },
  };
};
