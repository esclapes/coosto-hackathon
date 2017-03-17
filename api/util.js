const { merge } = require('lodash')

const util = {
  unwrapData(raw) {
    let data = raw.data.records
    data = data.map(obj => {
      return merge(
        { id: obj.recordid },
        obj.fields
      )
    })

    return data
  },

  parseQueryResult(data) {
    let returnData = util.unwrapData(data).map(obj => ({
      id: obj.id,
      name: obj.locatie,
      image: obj.afbeelding,
      terrain: obj.soort_terr,
      location: {
        lat: obj.locatie2[0],
        lng: obj.locatie2[1]
      }
    }))

    return returnData
  }
}

module.exports = util
