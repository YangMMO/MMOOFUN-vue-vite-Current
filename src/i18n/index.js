import { createI18n } from 'vue3-i18n'  //引⼊vue-i18n组件
import messages from './getMessage'
import as from './as'
import time from './time'

messages.cn = Object.assign(messages.cn, as.cn, time.cn)
messages.en = Object.assign(messages.en, as.en, time.en)

//注册i8n实例并引⼊语⾔⽂件
const i18n = createI18n({
    locale: 'cn',
    messages,
})

export default i18n