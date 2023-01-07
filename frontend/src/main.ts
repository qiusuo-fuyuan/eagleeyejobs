import { createApp, h, provide } from 'vue';
import App from './App.vue'
import router from './router'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { createI18n } from 'vue-i18n'

import { messages } from './translation/message'
import { authLink } from './services/auth';
import { onError } from '@apollo/client/link/error'


const cache = new InMemoryCache()

// graphql setup
const httpLink = createHttpLink({
    uri: `${import.meta.env.VITE_API_ENDPOINT}/graphql`
});

// Handle errors
const errorLink = onError(error => {
    if (process.env.NODE_ENV !== 'production') {
        logErrorMessages(error)
    }
})


const apolloClient = new ApolloClient({
    cache,
    link: authLink.concat(httpLink),
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
