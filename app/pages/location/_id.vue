<template>
  <div>
    {{ record }}
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data ({ params }) {
    const api = 'https://data.eindhoven.nl/api/records/1.0/search/?dataset=hondenlosloopterreinen&facet=locatie&facet=soort_terr'
    return axios.get(api)
      .then((res) => {
        const record = res.data.records.find(record => {
          return record.recordid === params.id
        })

        return { record }
      })
      .catch(error => {
        console.warn(error)
      })
  }
}
</script>

<style lang="css">
</style>
