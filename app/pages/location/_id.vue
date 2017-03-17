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
import apollo from '../../lib/apollo'
import gql from 'graphql-tag'

export default {
  data ({ params }) {
    return apollo.query({
      query: gql`{
        dogPlaces(id:"${params.id}") {
          id, name, location { lat, lng }, terrain, image
        }
      }`})
    .then(({ data }) => {
      console.log(data)
      return {
        dogPlace: data.dogPlaces[0]
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
