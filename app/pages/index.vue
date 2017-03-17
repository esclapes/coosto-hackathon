<template>
  <section class="container">

    <gmap-map
      :center="center"
      :zoom="12"
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
        <router-link :to="{ name: 'location-id', params: { id: infoWindowLocation.id }}">
          {{ infoWindowLocation.name }}
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
import { mapState } from 'vuex'

export default {
  data () {
    const mapDefaults = {
      center: { lat: 51.4416, lng: 5.4697 },
      shouldRender: false,
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

    return {
      ...mapDefaults
    }
  },

  computed: {
    ...mapState({
      places: state => state.locations
    })
  },

  fetch ({ store }) {
    if (!store.mainLoadDone) {
      return store.dispatch('getLocations')
    }
  },

  methods: {
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
    }
  },

  mounted () {
    this.shouldRender = true
  }
}
</script>


<style scoped>
.title {
  margin: 50px 0;
}
</style>
