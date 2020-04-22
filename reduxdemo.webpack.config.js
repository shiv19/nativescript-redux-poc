// const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

module.exports = env => {
  // Here you can modify env before passing them to the default config
  env = env || {};
  const config = webpackConfig(env);

  // const customDefineInstance = new webpack.DefinePlugin({
  //   'process': {}
  // });

  // config.plugins.unshift(customDefineInstance);

  // babel-rules
  config.module.rules.unshift({
    test: /\.m?js$/,
    exclude: /(node_modules)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: { node: '10' }
            }
          ]
        ],
        plugins: [
          ['@babel/plugin-proposal-decorators', { legacy: true }],
          ['@babel/plugin-proposal-class-properties', { loose: true }]
        ]
      }
    }
  });

  return config;
};
