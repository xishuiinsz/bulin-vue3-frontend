import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import installElementPlus from './plugins/element';
import installElementPlusIcon from './plugins/elementIcon';
import './assets/css/atomic.css';
import './assets/css/icon.css';
import 'highlight.js/styles/atom-one-dark.css';
import App from './App.vue'; // 样式
import lazy from './directives/lazy';
import highlight from './directives/highlight';
import resize from './directives/resize';
const app = createApp(App);
app.use(lazy);
app.use(highlight);
app.use(resize);
app.use(installElementPlus);
app.use(installElementPlusIcon);
app.use(createPinia()).use(router).mount('#app');
