import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import './index.css'

// layout components
import TheHeader from './components/layout/TheHeader.vue'
import EventFilter from './components/layout/EventFilter.vue'
import EventCard from './components/layout/EventCard.vue'
import WhiteCard from './components/ui/WhiteCard.vue'

// ui components
import BaseCard from './components/ui/BaseCard.vue'
import BaseSpinner from './components/ui/BaseSpinner.vue'
import SkeletonLoader from './components/ui/SkeletonLoader.vue'

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
app.component('event-filter', EventFilter)
app.component('event-card', EventCard)
app.component('base-card', BaseCard)
app.component('base-spinner', BaseSpinner)
app.component('skeleton-loader', SkeletonLoader)
app.component('white-card', WhiteCard)

// register font-awesome-icon component globally
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(store)

app.mount('#app')
