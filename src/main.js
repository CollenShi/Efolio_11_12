import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import { db } from './firebase/init.js';
// import { initializeApp } from "firebase/app";

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

const app =createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})
app.use(router)

app.mount('#app')
