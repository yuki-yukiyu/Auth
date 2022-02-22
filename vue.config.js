const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    https: false,
    port: 8080,
    open: true, // opens browser window automatically
    proxy: {
      "/api/*": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true
      }
    }
  }
})