const DogsAPI = require('./model.js')
const PlacesAPI = require('../places/model.js')
const { unwrapData } = require('../util.js')

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
    dogPlaces(id: String, terrain: Terrain): [DogPlace]
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
      console.log(args)
      const params = {}

      if (args.terrain) {
        const terrain = terrainMap[args.terrain]
        params['refine.soort_terr'] = terrain
      }

      return DogsAPI.get(params)
        .then(data => {
          let returnData = unwrapData(data).map(obj => ({
            id: obj.id,
            name: obj.locatie,
            image: obj.afbeelding,
            terrain: obj.soort_terr,
            location: {
              lat: obj.locatie2[0],
              lng: obj.locatie2[1]
            }
          }))

          if (args.id) {
            returnData = returnData.filter(obj => obj.id === args.id)
          }

          return returnData
        })
    }
  },
  DogPlace: {
    nearby(obj, args, context) {
      let {lat, lng} = obj.location
      return PlacesAPI.get({ location: `${lat},${lng}` })
    }
  }
}


module.exports = {
  schema,
  resolvers
}
