<template>
  <section class="container">

    <ul>
      <li v-for="record in records">
        <nuxt-link :to="`location/${record.recordid}`">
          {{ record.fields.locatie }}
        </nuxt-link>
      </li>
    </ul>

    <gmap-map
      :center="center"
      :zoom="10"
      style="width: 100%; height: 500px"
      v-if="shouldRender"
    >
      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        :content="infoContent"
        @closeclick="infoWinOpen=false"
      ></gmap-info-window>

      <gmap-marker
        v-for="(m, index) in markers"
        :position="m.position"
        :draggable="true"
        :clickable="true"
        @click="toggleInfoWindow(m, index)"
      ></gmap-marker>
    </gmap-map>

  </section>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    const data = {
      shouldRender: false,

      infoContent: '',
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

    const api = 'https://data.eindhoven.nl/api/records/1.0/search/?dataset=hondenlosloopterreinen&facet=locatie&facet=soort_terr'
    return axios.get(api)
      .then((res) => {
        return {
          ...data,
          records: res.data.records,
          center: { lat: 51.4416, lng: 5.4697 },
          markers: res.data.records.map(record => {
            return {
              infoText: record.fields.locatie,
              position: {
                lng: record.fields.locatie2[1],
                lat: record.fields.locatie2[0]
              }
            }
          })
        }
      })
  },

  methods: {
    toggleInfoWindow: function (marker, idx) {
      this.infoWindowPos = marker.position
      this.infoContent = marker.infoText
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
