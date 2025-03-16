import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import MainLayout from "./layouts/MainLayout.vue";
import DriversLayout from "./layouts/DriversLayout.vue";
import BusesLayout from "./layouts/BusesLayout.vue";

import router from './router'
import store from "./store"

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
})

const app = createApp(App)

app.use(router)
app.use(store)
app.use(vuetify)

app.component('MainLayout', MainLayout)
app.component('DriversLayout', DriversLayout)
app.component('BusesLayout', BusesLayout)

app.mount('#app')
