import { createApp, h, provide } from 'vue';
import App from './App.vue'
import router from './router'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { createI18n } from 'vue-i18n'

import { messages } from './translation/message'
import { authLink } from './services/auth';
import { onError } from '@apollo/client/link/error'

// websocket
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from "@apollo/client/utilities"
import { split } from "@apollo/client/core"
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';


const cache = new InMemoryCache()

// graphql setup
const httpLink = createHttpLink({
    uri: `${import.meta.env.VITE_API_ENDPOINT}/graphql`
});

// Create a WebSocket link:
// const wsLink = new WebSocketLink({
//     uri: 'ws://localhost:4000/graphql',
//     options: {
//       reconnect: true
//     }
// })
const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://localhost:4000/subscription',
  }));

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      )
    },
    wsLink,
    httpLink
)

// Handle errors
const errorLink = onError(error => {
    if (process.env.NODE_ENV !== 'production') {
        logErrorMessages(error)
    }
})


const apolloClient = new ApolloClient({
    cache,
    link: authLink.concat(link),
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
