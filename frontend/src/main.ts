import { createApp, h, provide } from 'vue';
import App from './App.vue'
import router from './router'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createI18n } from 'vue-i18n'

import { messages } from './translation/message'

import apolloClient from './apolloClient';



const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'zh',
    messages
})


const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient)
    },
    render: () => h(App),
})

app.use(i18n).use(router).mount('#app');
