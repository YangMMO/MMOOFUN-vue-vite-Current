import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import PrerenderSPAPlugin from 'prerender-spa-plugin/es6'
import routes from './src/router/path.js'
import Markdown from 'vite-plugin-md'



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // isCustomElement: tag => tag.startsWith("perfect-srollbar")
        }
      },
      include: [/\.vue$/, /\.md$/],
    }),

    /* 引入markdown */
    // Markdown(),
    // mdPlugin.plugin({
    //   mode: ['html'],
    // }),

    /* 把src/icons 下的所有svg 自动加载到body下，供组件使用 */
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹，地址可改
      iconDirs: [path.resolve(process.cwd(), './src/assets/svg')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    }),

  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/scss/global.scss";'
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 1600,
  },
  publicPath: './',
  configureWebpack: {
    plugins: [
      new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, 'dist'),
        routes: routes  // 需要预渲染的路由地址(需要打包成几个页面就配置几个路由)
      }),
    ],
  },
})
