<template>
  <div class="container">
    <div class="header">
      <router-link to="/">DogPlace</router-link>
    </div>
    <nuxt/>
    <my-footer/>
  </div>
</template>

<script>
import MyFooter from '~components/Footer.vue'

export default {
  components: {
    MyFooter
  }
}
</script>

<style>
.container
{
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  padding: 40px 0;
}

</style>
