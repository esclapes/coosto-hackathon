import api from '../lib/api'

export const state = {
  mainLoadDone: true,
  locations: []
}

export const mutations = {
  addLocations (state, locations) {
    state.locations = locations
    state.mainLoadDone = true
  }
}

export const actions = {
  getLocations ({ commit }) {
    return api
      .fetchLocations()
      .then(locations => commit('addLocations', locations))
      .catch(error => console.log('Action error', error))
  }
}
