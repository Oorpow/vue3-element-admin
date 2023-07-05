import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { setupStore } from './stores'
import '@/permission'

import '@unocss/reset/normalize.css'
import 'uno.css'
import "element-plus/dist/index.css";
import '@/styles/main.css'

const app = createApp(App)

setupStore(app)
app.use(router)

app.mount('#app')
