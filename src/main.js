import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import TheHeader from './components/layout/TheHeader.vue'
import BaseCard from './components/ui/BaseCard.vue'

//font-awesome config
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

// font awesome icons
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

// add icons to library
library.add(fas)

const app = createApp(App)

app.use(router)
app.component('the-header', TheHeader)
app.component('base-card', BaseCard)

// register font-awesome-icon component globally
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
