module.exports = {
    devServer: {
        disableHostCheck: true,
        proxy: {
            '/api': {
              target: 'http://localhost:3000',
              changeOrigin: true,
              ws: true,
              pathRewrite: {
                  '^/api': '/api'
              }
            }
        }
    }
}
