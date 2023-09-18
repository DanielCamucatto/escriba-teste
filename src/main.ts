import { createApp } from 'vue'; 
import 'font-awesome/css/font-awesome.css'
import './style.scss'

import App from './App.vue';
import router from './router';
import Home from './views/Home.vue'
import Navbar from './components/Navbar.vue';


const app = createApp(App);


app.component('Navbar', Navbar);
app.component('Home', Home)

app.use(router);

app.mount('#app');