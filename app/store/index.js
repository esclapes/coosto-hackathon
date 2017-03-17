import api from '../lib/api'

export const state = {
  locations: []
}

export const mutations = {
  addLocations (state, locations) {
    state.locations = locations
  }
}

export const actions = {
  getLocations ({ commit }) {
    api
      .fetchLocations()
      .then(locations => commit('addLocations', locations))
      .catch(error => console.log('Action error', error))
  }
}
