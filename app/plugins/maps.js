import * as VueGoogleMaps from 'vue2-google-maps'
import Vue from 'vue'

if (process.BROWSER_BUILD) {
  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyCEmC4e_FLzLcbomTMHBG7Xr65euFTwepc'
    }
  })
}
