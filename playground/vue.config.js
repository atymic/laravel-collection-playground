const marked = require("marked");

module.exports = {
  pwa: {
    workboxOptions: {
      skipWaiting: true
    }
  },
  configureWebpack: {
    module: {
      rules: [{
        test: /\.md$/,
        use: [
          {
            loader: "html-loader"
          },
          {
            loader: "markdown-loader",
            options: {
              highlight: function(code) {
                return require('highlight.js').highlightAuto(code).value;
              },
            }
          }
        ]
      }]
    }
  }
}
