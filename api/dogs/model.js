const axios = require('axios')


class DogsAPI {
  constructor() {
    this.url = 'https://data.eindhoven.nl/api/records/1.0/search/?dataset=hondenlosloopterreinen'
  }

  get(params) {
    return axios.get(this.url, params)
  }
}


module.exports = new DogsAPI()
