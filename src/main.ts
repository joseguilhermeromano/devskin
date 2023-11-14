import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { pinia, setupStore } from './store/useApiStore'

const app = createApp(App);

app.use(router)
app.use(pinia)

setupStore();
app.mount('#app')