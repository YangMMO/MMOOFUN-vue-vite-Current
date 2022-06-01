import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // base: '/mmoofun-vite-vue', //指定github项目文件，用于push
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/scss/global.scss";'
      }
    }
  }

})

