const axios = require('axios')

class PlacesAPI {
  constructor() {
    this.url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
    this.baseParams = {
      key: 'AIzaSyCEmC4e_FLzLcbomTMHBG7Xr65euFTwepc',
      rankby: 'distance'
    }
  }

  get(params) {
    params = Object.assign({}, this.baseParams, params)
    return axios.get(this.url, {
      params
    }).then(raw => {
      return raw.data.results.map(place => ({
        id: place.place_id,
        name: place.name,
        location: place.geometry.location,
        icon: place.icon,
        types: place.types
      }))
    })
  }
}


module.exports = new PlacesAPI()
