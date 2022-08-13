import { createApp } from 'vue'
import App from './App.vue'
import vue3GoogleLogin from 'vue3-google-login'
import router from './router'
import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'

//.................
//font awesome
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faPencil } from '@fortawesome/free-solid-svg-icons'
/* import specific icons */

/* add icons to the library */
library.add(faPencil)
//..................

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.provide('vapidKey', 'BGn2nGKMiDpzUK2pqdsaikMyw4Hn5c7zVQlGcKPCe8qrlrNtT4hTxWoTgF0urVNa3yj5913JA17plEMABE7sBHs')

app.use(vue3GoogleLogin, {
  clientId: '114812492797-8blqglcqk8ph7ndl75u68ufcq40t6ip8.apps.googleusercontent.com'
})

app.config.globalProperties.url = 'http://192.168.43.79:8000/';
app.provide('url', 'http://192.168.43.79:8000/')

app.use(router)
app.use(CoreuiVue)
app.provide('icons', icons)
app.component('CIcon', CIcon)
app.mount('#app')


