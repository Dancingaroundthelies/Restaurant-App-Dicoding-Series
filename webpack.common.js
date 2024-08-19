const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');


module.exports = {
    entry: {
      app: path.resolve(__dirname, 'src/scripts/index.js'),
      sw: path.resolve(__dirname, 'src/scripts/sw.js'),
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 70000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        automaticNameDelimiter: '~',
        enforceSizeThreshold: 50000,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, 'src/templates/index.html'),
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src/public/'),
            to: path.resolve(__dirname, 'dist/'),
            globOptions: {
              ignore: ['**/images/**'],
            },
          },
        ],
      }),
      new ImageminWebpackPlugin({
        plugins: [
          ImageminMozjpeg({
            quality: 50,
            progressive: true,
          }),
        ],
        overrideExtension: true,
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
      }),
      new WorkboxWebpackPlugin.GenerateSW({
        swDest: './sw-workbox.bundle.js',
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/list'),
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'restaurant-api-dicoding-list',
            },
          },
          {
            urlPattern: ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/images/'),
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'restaurant-api-dicoding-images',
            },
          },
  
          {
            urlPattern: ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/detail/'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'restaurant-api-dicoding-detail',
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-webfonts',
            },
          },
          {
            urlPattern: ({ url }) => url.href.startsWith('https://kit.fontawesome.com/4d69af1ea6.js'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'fontawesome-kit',
            },
          },
          {
            urlPattern: ({ url }) => url.href.startsWith('https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css'),
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'jsdelivr-cache',
            },
          },
        ],
      }),
    ],
  };
