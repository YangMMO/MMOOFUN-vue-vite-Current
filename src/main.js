import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'

// 加载remixicon图标
import 'remixicon/fonts/remixicon.css'

// 加载tailwindcss样式
// import 'tailwindcss/tailwind.css'
import './index.css'

// 加载SVG图标
import 'virtual:svg-icons-register'

// 加载feather图标
// import 'feather-icons/dist/feather.js';
import VueFeather from 'vue-feather';


const app = createApp(App)

app.use(i18n)
app.use(router)

app.component(VueFeather.name, VueFeather);

app.mount('#app')
