import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './assets/css/reset.css'

axios.defaults.withCredentials = true

const app = createApp(App).use(router)
app.use(ElementPlus)
app.mount('#app')