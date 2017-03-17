const { merge } = require('lodash')

module.exports = {
  unwrapData(raw) {
    let data = raw.data.records
    data = data.map(obj => {
      return merge(
        { id: obj.recordid },
        obj.fields
      )
    })

    return data
  }
}
