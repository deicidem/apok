const { defineConfig } = require('@vue/cli-service');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.1.104/apok_backend_php/public/api/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
        onProxyReq: function(request) {
          request.setHeader("origin", "http://192.168.1.104");
        },
      }
    }
  },
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
  chainWebpack: config => {
		config.module
			.rule("vue")
			.use("vue-svg-inline-loader")
				.loader("vue-svg-inline-loader")
	},
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/assets/styles/variables.scss";`
      }
    }
  }
})
