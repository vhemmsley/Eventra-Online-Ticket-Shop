import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import TheHeader from './components/layout/TheHeader.vue'

const app = createApp(App)

app.use(router)
app.component('the-header', TheHeader)

app.mount('#app')
