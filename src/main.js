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
import VueFeather from 'vue-feather'

// 加载滚动条方案
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'

// 加载mate seo方案
import MetaInfo from 'vue-meta-info'

// // 加载markdown编辑器
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
// import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';
VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});

// // 加载markdown预览组件
import VMdPreview from '@kangc/v-md-editor/lib/preview';
// import '@kangc/v-md-editor/lib/style/preview.css';
// import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';    // github主题
// import '@kangc/v-md-editor/lib/theme/style/github.css';
// // highlightjs
import hljs from 'highlight.js';
// // emoji
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';
// // 代码行数显示
import createLineNumberPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
// // 复制功能
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';

// // 内容定位
import createAlignPlugin from '@kangc/v-md-editor/lib/plugins/align';

VMdPreview.use(vuepressTheme, {
  Hljs: hljs,
});
VMdPreview.use(createEmojiPlugin());
VMdPreview.use(createLineNumberPlugin());
VMdPreview.use(createCopyCodePlugin());
VMdPreview.use(createAlignPlugin());


const app = createApp(App)

app.use(i18n)
app.use(router)
app.use(PerfectScrollbar)
app.use(MetaInfo)
app.use(VueMarkdownEditor)
app.use(VMdPreview)

app.component(VueFeather.name, VueFeather);



app.mount('#app')