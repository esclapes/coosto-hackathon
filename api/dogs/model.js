const axios = require('axios')

class DogsAPI {
  constructor() {
    this.url = 'https://data.eindhoven.nl/api/records/1.0/search'
    this.baseParams = {
      dataset: 'hondenlosloopterreinen',
      rows: 100
    }
  }

  get(params) {
    params = Object.assign({}, this.baseParams, params)
    return axios.get(this.url, {
      params
    })
  }
}


module.exports = new DogsAPI()
