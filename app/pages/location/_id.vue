<template>
  <article>
    <h1>{{ dogPlace.name }}</h1>
    <small>Id: {{ dogPlace.id }} | Location {{ dogPlace.location.lat }}, {{ dogPlace.location.lat }}</small>

    <div>
      <p>Type: {{ dogPlace.terrain }}</p>
      <img :src="dogPlace.image" alt="">
    </div>
  </article>
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

        return {
          dogPlace: {
            id: record.recordid,
            name: record.fields.locatie,
            location: {
              lat: record.fields.locatie2[0],
              lng: record.fields.locatie2[1]
            },
            image: record.fields.afbeelding,
            terrain: record.fields.soort_terr
          }
        }
      })
      .catch(error => {
        console.warn(error)
      })
  }
}
</script>

<style lang="css">
</style>
