import './style.css'
import App from './App.vue'
import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App)

app.use(stores)
app.use(router)
app.use(VueQueryPlugin)

// await router.isReady()
app.mount('#app')
