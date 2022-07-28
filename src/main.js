import { createApp } from 'vue'
import App from './App.vue'
import vue3GoogleLogin from 'vue3-google-login'
import router from './router'
import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'


const app = createApp(App)
app.use(vue3GoogleLogin, {
  clientId: '114812492797-8blqglcqk8ph7ndl75u68ufcq40t6ip8.apps.googleusercontent.com'
})
app.config.globalProperties.url = 'http://192.168.43.79:8000/';
app.use(router)
app.use(CoreuiVue)
app.provide('icons', icons)
app.component('CIcon', CIcon)
app.mount('#app')

