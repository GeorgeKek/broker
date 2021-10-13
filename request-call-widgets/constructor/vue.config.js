module.exports = {
  lintOnSave: false,
  configureWebpack: {
    optimization: {
      splitChunks: false
    }
  },
  filenameHashing: false,
  pages: {
    widgetConstructor: {
      entry: 'src/main.js',
      filename: 'index.html'
    }
  }
}