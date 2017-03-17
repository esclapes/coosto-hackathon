import ApolloClient, { createNetworkInterface } from 'apollo-client'

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3002/graphql'
})

export default new ApolloClient({ networkInterface })
