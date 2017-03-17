<template>
  <article>
    <h1>{{ dogPlace.name }}</h1>
    <small class="location-id">Id: {{ dogPlace.id }}</small>
    <div>
      <p>Location {{ dogPlace.location.lat }}, {{ dogPlace.location.lng }}</p>
      <p>Type: {{ dogPlace.terrain }}</p>
      <img :src="dogPlace.image" :alt="dogPlace.name">
    </div>

    <gmap-street-view-panorama
      class="pano"
      :position="{ lat: dogPlace.location.lat, lng: dogPlace.location.lng }"
      :pov="{heading: 0, pitch: 10}"
      :zoom="1"
      @pano_changed="updatePano"
      @pov_changed="updatePov">
    </gmap-street-view-panorama>
  </article>
</template>

<script>
import axios from 'axios'

export default {
  data ({ params }) {
    const api = 'https://data.eindhoven.nl/api/records/1.0/search/?dataset=hondenlosloopterreinen&facet=locatie&facet=soort_terr&rows=999'
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
  },

  methods: {
    updatePov (pov) {
      this.pov = pov
    },

    updatePano (pano) {
      this.pano = pano
    }
  }
}
</script>

<style lang="css">
h1 {
  margin-bottom: 0.1em;
}
.location-id {
  margin-bottom: 2em;
}

.pano {
  width: 100%;
  height: 300px;
}
</style>
