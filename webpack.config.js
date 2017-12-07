var path = require('path');
var sliceArgs = Function.prototype.call.bind(Array.prototype.slice);

function root(args) {
    args = sliceArgs(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}


module.exports = {
    devtool: 'source-map',
    cache: true,
    context: __dirname,

    stats: {
      colors: true,
      reasons: true
    },

    entry: {
      'backend': ['./src/backend/backend'],
      'content-script': ['./src/content-script'],
      'frontend': ['./src/frontend/app'],
      'devtools': ['./src/devtools/devtools'],
      'background': ['./src/background/background']
    },

    output: {
      path: root('build'),
      filename: '[name].js',
      sourceMapFilename: '[name].js.map',
      chunkFilename: '[id].chunk.js'
    },

    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader'
            }
          }
        ]
      }
  };
