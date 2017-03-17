<template>
  <section class="container">
    <img src="../assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      Universal Vue.js Application Framework
    </h1>
    <nuxt-link class="button" to="/about">
      About page
    </nuxt-link>

    <ul>
      <li v-for="record in records">
        <router-link :to="`location/${record.recordid}`">
          {{ record.fields.locatie }}
        </router-link>
      </li>
    </ul>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    const api = 'https://data.eindhoven.nl/api/records/1.0/search/?dataset=hondenlosloopterreinen&facet=locatie&facet=soort_terr'
    return axios.get(api)
      .then((res) => {
        return {
          records: res.data.records
        }
      })
  }
}
</script>


<style scoped>
.title
{
  margin: 50px 0;
}
</style>
