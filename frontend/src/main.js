import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import store  from './store'
import router  from './router'
import { OhVueIcon } from 'oh-vue-icons'
import { HiLogin, HiLogout, FaUserAlt } from 'oh-vue-icons/icons'

const app = createApp(App)
const pinia = createPinia()
// 注册插件
app.component('OhVueIcon', OhVueIcon)

// 注册图标
app.component('HiLogin', HiLogin)
app.component('HiLogout', HiLogout)
app.component('FaUserAlt', FaUserAlt)


app.use(store)
app.use(pinia)
app.use(router)
app.mount('#app')
