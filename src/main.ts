import './style.css'
import App from './App.vue'

const app = createApp(App)

app.use(stores)
app.use(router)

app.mount('#app')
