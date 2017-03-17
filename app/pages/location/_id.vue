<template>
  <article>
    <h2>{{ dogPlace.name }}</h2>
    <p>Type: {{ dogPlace.terrain }}</p>

    <div class="block">
      <div class="filters">
        <input type="text" v-model="nearbyType" placeholder="Nearby places">
        <button v-on:click="updateMap">Search</button>
      </div>

      <gmap-map
        :center="dogPlace.location"
        :zoom="16"
        style="width: 100%; height: 500px"
        v-if="shouldRender"
      >
        <gmap-info-window
          v-if="infoWindowLocation"
          :options="infoOptions"
          :position="infoWindowPos"
          :opened="infoWinOpen"
          @closeclick="infoWinOpen=false"
        >
          {{ infoWindowLocation.name }}
        </gmap-info-window>

        <gmap-marker
          v-for="(m, index) in dogPlace.nearby"
          :position="m.location"
          :draggable="true"
          :clickable="true"
          icon="https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png"
          @click="toggleInfoWindow(m, index)"
        ></gmap-marker>

        <gmap-marker
          :position="dogPlace.location"
          @click="toggleInfoWindow(m, index)"
        ></gmap-marker>

      </gmap-map>
    </div>

    <div class="block">
      <div class="block-nested image-container">
        <img class="image" :src="dogPlace.image" :alt="dogPlace.name">
      </div>
      <div class="block-nested">
        <gmap-street-view-panorama
          class="pano"
          :position="{ lat: dogPlace.location.lat, lng: dogPlace.location.lng }"
          :pov="{heading: 0, pitch: 10}"
          :zoom="1"
          @pano_changed="updatePano"
          @pov_changed="updatePov"
          v-if="shouldRender">
        </gmap-street-view-panorama>
      </div>
    </div>

  </article>
</template>

<script>
import apollo from '../../lib/apollo'
import gql from 'graphql-tag'

export default {
  data ({ params }) {
    const mapDefaults = {
      infoWindowLocation: {},
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    }

    return apollo.query({
      query: gql`{
        dogPlace(id:"${params.id}") {
          id,
          name,
          location {
            lat, lng
          },
          terrain,
          image,
          nearby {
            id, name, icon, location {
              lat, lng
            }
          }
        }
      }`})
    .then(({ data }) => {
      return Object.assign({}, {
        ...mapDefaults,
        nearbyType: '',
        shouldRender: false
      }, {
        dogPlace: data.dogPlace
      })
    })
    .catch(error => {
      console.warn(error)
    })
  },

  computed: {
    iconSize () {
      return new window.google.maps.Size(10, 10)
    }
  },

  methods: {
    updatePov (pov) {
      this.pov = pov
    },

    updatePano (pano) {
      this.pano = pano
    },

    toggleInfoWindow: function (marker, idx) {
      this.infoWindowPos = marker.location
      this.infoWindowLocation = marker
      // check if its the same marker that was selected if yes toggle
      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen
      } else {
        // if different marker set infowindow to open and reset current marker index
        this.infoWinOpen = true
        this.currentMidx = idx
      }
    },

    updateMap () {
      const nearbyType = this.nearbyType
      return apollo.query({
        query: gql`{
          dogPlace(id:"${this.$route.params.id}") {
            id,
            name,
            location {
              lat, lng
            },
            terrain,
            image,
            nearby(type:"${nearbyType}") {
              id, name, icon, location {
                lat, lng
              }
            }
          }
        }`})
      .then(({ data }) => {
        this.dogPlace = data.dogPlace
      })
    }
  },

  mounted () {
    this.shouldRender = true
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

.block {
  margin: 20px 0;
}

.block-nested {
  display: inline-block;
  width: 50%;
  height: 300px;
  overflow: hidden;
}

.filters {
  padding: 20px;
  text-align: center;
}

.filters * {
  font-size: 16px;
  border: solid 1px #999;
}


.filters input {
  width: 300px;
  padding: 4px;
}

.filters button {
  padding: 4px 12px;
  margin-left: -1px;
  color: #fff;
  background: #999;
}
</style>
