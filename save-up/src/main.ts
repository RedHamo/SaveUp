import { createApp } from 'vue'
import { createPinia } from 'pinia'
import dayjs from 'dayjs'
import App from './App.vue'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
app.config.globalProperties.dayjs=dayjs;
