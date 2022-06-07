import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'

// import 'normalize.css'
import 'remixicon/fonts/remixicon.css'
import './index.css'
// import 'tailwindcss/tailwind.css'

const app = createApp(App)

app.use(i18n)
app.use(router)
app.mount('#app')