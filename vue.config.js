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
    },
    chainWebpack: config => {
        config
        .plugin('html')
        .tap(args => {
            args[0].title = 'ZhShare'
            return args
        })
    }
}
