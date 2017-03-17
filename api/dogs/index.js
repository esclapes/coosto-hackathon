const DogsAPI = require('./model.js')
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

  # Dog places where your dog can poop
  type DogPlace {
    id: String!
    name: String
    terrain: String
    image: String
    location: Location
  }

  type Query {
    dogPlaces(terrain: Terrain): [DogPlace]
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
