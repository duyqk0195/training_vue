import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// import './assets/styles/global.scss'
import './assets/styles/tailwind.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import RestaurantItem from '@/components/RestaurantItem.vue'

const vuetify = createVuetify({
  components,
  directives
})

const app = createApp(App)
app.component('restaurant-item', RestaurantItem)
app.provide('carts', [])

app.use(vuetify)

app.use(createPinia())
app.use(router)

app.mount('#app')

export default app
