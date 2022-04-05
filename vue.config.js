const { defineConfig } = require('@vue/cli-service');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    // resolve: {
    //   alias: {
    //       path: require.resolve("path-browserify")
    //   }
    // },
    plugins: [
      new NodePolyfillPlugin()
    ]
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/assets/styles/variables.scss";`
      }
    }
  }
})
