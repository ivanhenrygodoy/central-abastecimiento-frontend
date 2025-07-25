import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import PrimeVue from 'primevue/config'
import { createPinia } from 'pinia'
import Aura from '@primevue/themes/lara'
import { ToastService } from 'primevue'

import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: false || 'none',
    },
  },
})
app.use(createPinia())
app.use(ToastService)

app.mount('#app')
