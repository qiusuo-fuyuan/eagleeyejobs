import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { authLink } from './links/auth'
import { errorLink } from './links/errorLink'


const cache = new InMemoryCache()

// graphql setup
const httpLink = createHttpLink({
    uri: `${import.meta.env.VITE_API_ENDPOINT}/graphql`
});


const apolloClient = new ApolloClient({
    cache,
    link: authLink.concat(errorLink).concat(httpLink),
})

export default apolloClient