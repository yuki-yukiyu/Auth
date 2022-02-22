import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { icons } from './assets/icons.js'
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

const axiosInstance = axios.create({
    baseURL: '/api'
})

const app = createApp(App)
app.use(router)
app.use(CoreuiVue)
app.provide('icons', icons)
app.config.globalProperties.$axios = axiosInstance;
app.component('CIcon', CIcon)
app.component('CLoading', Loading)

app.mount('#app')

