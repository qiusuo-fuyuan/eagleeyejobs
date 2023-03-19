import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { authLink } from './links/auth'
import { errorLink } from './links/errorLink'
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



const apolloClient = new ApolloClient({
    cache,
    link: authLink.concat(errorLink).concat(link),
})

export default apolloClient