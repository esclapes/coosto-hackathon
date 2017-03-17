<template>
  <section class="container">

    <gmap-map
      :center="center"
      :zoom="12"
      style="width: 100%; height: 500px"
      v-if="shouldRender"
    >
      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false"
      >
        <router-link :to="infoContent.href">
          {{ infoContent.label }}
        </router-link>
      </gmap-info-window>

      <gmap-marker
        v-for="(m, index) in places"
        :position="m.location"
        :draggable="true"
        :clickable="true"
        @click="toggleInfoWindow(m, index)"
      ></gmap-marker>
    </gmap-map>

  </section>
</template>

<script>
import apollo from '../lib/apollo'
import gql from 'graphql-tag'

export default {
  data () {
    const mapDefaults = {
      infoContent: {
        label: '',
        href: ''
      },
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
        dogPlaces {
          id, name, location { lat, lng }
        }
      }`
    }).then(({ data }) => {
      return Object.assign({}, {
        ...mapDefaults,
        shouldRender: false
      }, {
        // records: res.data.records,
        center: { lat: 51.4416, lng: 5.4697 },
        places: data.dogPlaces
      })
    })
  },

  methods: {
    toggleInfoWindow: function (marker, idx) {
      this.infoWindowPos = marker.location
      this.infoContent.label = marker.name
      this.infoContent.href = `location/${marker.id}`

      // check if its the same marker that was selected if yes toggle
      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen
      } else {
        // if different marker set infowindow to open and reset current marker index
        this.infoWinOpen = true
        this.currentMidx = idx
      }
    }
  },

  mounted () {
    this.shouldRender = true
  }
}
</script>


<style scoped>
.title
{
  margin: 50px 0;
}
</style>
