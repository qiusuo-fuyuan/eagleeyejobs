import { ApolloServer } from '@apollo/server';
import { addMocksToSchema, mockServer } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { TypeDefs } from './schema';
import { resolvers } from './resolvers';

// Make a GraphQL schema with no resolvers
const schema = makeExecutableSchema({ typeDefs: TypeDefs })


// Mock object
const mocks = {
  Int: () => 6,
  Float: () => 22.1,
  String: () => 'Hello',
  DateTime: () => casual.date(/* format = 'YYYY-MM-DDTHH:mm:ss.SSSZZ' */)
}
const preserveResolvers = false
 
// Mock the server passing the schema, mocks object and preserveResolvers arguments
const server = mockServer(schema, mocks, preserveResolvers)
 
// Alternatively, you can call addMocksToSchema with the same arguments
const schemaWithMocks = addMocksToSchema({
  schema,
  mocks,
  preserveResolvers
})