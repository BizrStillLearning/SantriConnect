import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './style.css'


import App from './App.vue'
import router from './router'

import * as lucide from 'lucide-vue-next'

const pinia = createPinia()
const app = createApp(App)

Object.entries(lucide).forEach(([name, component]) => {
    app.component(name, component)
})

app.use(router)
app.use(pinia)
app.mount('#app')
