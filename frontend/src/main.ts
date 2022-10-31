import { createApp, h, provide } from 'vue';
import App from './App.vue'
import router from './router'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { createI18n } from 'vue-i18n'

import { messages } from './translation/message'

const cache = new InMemoryCache()


const apolloClient = new ApolloClient({
    cache,
    uri: 'http://localhost:4000/graphql',
})


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
