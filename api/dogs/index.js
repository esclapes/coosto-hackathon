const DogsAPI = require('./model.js')
const { unwrapData } = require('../util.js')

const schema = [`
  type Location {
    lat: Float!
    lng: Float!
  }

  # Dog places where your dog can poop
  type DogPlace {
    id: String!
    name: String
    terrain: String
    image: String
    location: Location
  }

  type Query {
    dogPlaces: [DogPlace]
  }

  schema {
    query: Query
  }
`]

const resolvers = {
  Query: {
    dogPlaces(obj, args, context) {
      // console.log(obj)
      // console.log(args)
      // console.log(context)

      return DogsAPI.get()
        .then(data => {
          return unwrapData(data).map(obj => ({
            id: obj.id,
            name: obj.locatie,
            image: obj.afbeelding,
            terrain: obj.soort_terr,
            location: {
              lat: obj.locatie2[0],
              lng: obj.locatie2[1]
            }
          }))
        })

    }
  }
}


module.exports = {
  schema,
  resolvers
}
