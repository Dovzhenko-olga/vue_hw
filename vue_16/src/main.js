import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import MainLayout from "./layouts/MainLayout.vue";
import ProductsLayout from '@/layouts/ProductsLayout.vue'

import router from './router'
import store from './store'
import i18n from './plugins/i18n'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(i18n)

app.component("MainLayout", MainLayout);
app.component("ProductsLayout", ProductsLayout);

app.mount('#app')
