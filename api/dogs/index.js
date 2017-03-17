

const schema = [`
  # Dog dogPlaces where your dog can poop
  type DogPlace {
    id: String!

    # The name of the user, e.g. apollostack
    street: String!

    # Type of terrain
    type: DogPlaceType

    # The URL to a directly embeddable image for this user's avatar
    location: [Float]
  }

  enum DogPlaceType {
    grass
    sand
  }

  type Query {
    dogPlaces(
      # Type of terrain
      type: DogPlaceType
    ): [DogPlace]
  }

  schema {
    query: Query
  }
`]

const resolvers = {
  Query: {
    dogPlaces(root, { type }, context) {
      const fakeData = [
        { id: 'pepe', stree: 'pepe street', location: [12.21, 343.1] },
        { id: 'paco', stree: 'paco street', location: [56.51, 67.1] },
      ]

      return fakeData;
    }
  }
}


module.exports = {
  schema,
  resolvers
}
