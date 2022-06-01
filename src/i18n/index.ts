import { createI18n } from 'vue3-i18n'  //引⼊vue-i18n组件
import messages from './getMessage'

//注册i8n实例并引⼊语⾔⽂件
const i18n = createI18n({
    locale: 'cn',
    messages
})

export default i18n