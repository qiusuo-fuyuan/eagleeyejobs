import { createApp } from 'vue';
import App from './App.vue'
import router from './router'
import { DefaultApolloClient } from '@vue/apollo-composable'


createApp(App).use(router).mount('#app');
