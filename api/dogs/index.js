const DogsAPI = require('./model.js')
const PlacesAPI = require('../places/model.js')
const { parseQueryResult } = require('../util.js')

const schema = [`
  enum Terrain {
    openField
    forest
    mixed
  }

  type Location {
    lat: Float!
    lng: Float!
  }

  type Place {
    id: String
    name: String
    location: Location
    icon: String
    types: [String]
  }

  # Dog places where your dog can poop
  type DogPlace {
    id: String!
    name: String
    terrain: String
    image: String
    location: Location
    nearby: [Place]
  }

  type Query {
    dogPlaces(terrain: Terrain): [DogPlace]
    dogPlace(id: String, nearby: String): DogPlace
  }

  schema {
    query: Query
  }
`]

const terrainMap = {
  openField: 'open veld',
  forest: 'bosrijk',
  mixed: 'gemengde beplanting'
}

const resolvers = {
  Query: {
    dogPlaces(obj, args, context) {
      const params = {}

      if (args.terrain) {
        const terrain = terrainMap[args.terrain]
        params['refine.soort_terr'] = terrain
      }

      return DogsAPI.get(params)
        .then(parseQueryResult)
    },
    dogPlace(obj, args) {
      return DogsAPI.get()
        .then(raw => {
          let data = parseQueryResult(raw).filter(obj => obj.id === args.id)
          return data[0]
        })
    }
  },
  DogPlace: {
    nearby(obj, args, context) {
      const {lat, lng} = obj.location
      const keyword = args.nearby
      return PlacesAPI.get({ location: `${lat},${lng}`, keyword })
    }
  }
}


module.exports = {
  schema,
  resolvers
}
