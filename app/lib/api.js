import 'isomorphic-fetch'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import gql from 'graphql-tag'

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3002/graphql'
})

const apollo = new ApolloClient({ networkInterface })

export default {
  fetchLocations () {
    return apollo.query({
      query: gql`{
        dogPlaces {
          id,
          name,
          location {
            lat,
            lng
          }
        }
      }`
    })
    .then(({data}) => data.dogPlaces)
    .catch(error => console.log('Api error', error))
  }
}
