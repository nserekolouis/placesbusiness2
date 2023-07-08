import { createApp } from 'vue'
import App from './App.vue'
import vue3GoogleLogin from 'vue3-google-login'
import router from './router'
import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/cicons'



//.................
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { 
  faPencil, 
  faImage,
  faPaperPlane,
  faHouse,
  faBell,
  faUser,
  faLongArrowLeft,
  faLocationPin,
  faBars,
  faEllipsis,
  faFaceSmile,
  faCircleNotch
} from '@fortawesome/free-solid-svg-icons'

  import {faMessage,faHeart} from '@fortawesome/free-regular-svg-icons'

/* add icons to the library */
library.add(faPencil)
library.add(faImage)
library.add(faPaperPlane)
library.add(faHouse)
library.add(faBell)
library.add(faUser)
library.add(faMessage)
library.add(faHeart)
library.add(faLongArrowLeft )
library.add(faLocationPin )
library.add(faBars)
library.add(faEllipsis)
library.add(faFaceSmile)
library.add(faCircleNotch)
//..................

import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import EmojiPicker from "vue3-emoji-picker";
import "../node_modules/vue3-emoji-picker/dist/style.css";


const app = createApp(App)

app.use(BootstrapVue3)

app.component('font-awesome-icon', FontAwesomeIcon)

app.component('EmojiPicker', EmojiPicker)

app.provide('vapidKey', 'BGn2nGKMiDpzUK2pqdsaikMyw4Hn5c7zVQlGcKPCe8qrlrNtT4hTxWoTgF0urVNa3yj5913JA17plEMABE7sBHs')

app.use(vue3GoogleLogin, {
  clientId: '114812492797-8blqglcqk8ph7ndl75u68ufcq40t6ip8.apps.googleusercontent.com'
})

app.config.globalProperties.url = 'http://192.168.43.79:8000/';
app.provide('url', 'http://192.168.43.79:8000/');

app.config.globalProperties.url_v1 = 'http://192.168.43.79:8000/api';
app.provide('url_v1', 'http://192.168.43.79:8000/api');

app.config.globalProperties.url_v3 = 'http://192.168.43.79:8000/api/v3';
app.provide('url_v3', 'http://192.168.43.79:8000/api/v3');

// app.config.globalProperties.url_v1 = 'http://localhost:8080/api';
// app.provide('url_v1', 'http://localhost:8080/api');

// app.config.globalProperties.url_v3 = 'http://localhost:8080/api/v3';
// app.provide('url_v3', 'http://localhost:8080/api/v3');

//app.config.globalProperties.url_v1 = 'https://dev.thefavplaces.com/api';
//app.provide('url_v1', 'https://dev.thefavplaces.com/api');

//app.config.globalProperties.url = 'https://dev.thefavplaces.com/api/v3';
//app.provide('url', 'https://dev.thefavplaces.com/api/v3');

app.use(router)
app.use(CoreuiVue)
app.provide('icons', icons)
app.component('CIcon', CIcon)
app.mount('#app')


