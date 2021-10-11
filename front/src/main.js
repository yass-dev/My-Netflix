import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import RouterBack from './plugins/router-back';

createApp(App).use(store).use(router).use(RouterBack).mount('#app')
