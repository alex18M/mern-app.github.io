module.exports = {// Exporta el modulo
  entry: './src/app/index.js',// Path: src\app\index.js
  output: {
    path: __dirname + '/src/public/js',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
};
