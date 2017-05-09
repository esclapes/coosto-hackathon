<template>
  <div class="container">
    <div class="header">
      <h1 class="page-title">
        <router-link to="/">
          <i class="em em-dog"></i>
          <i class="em em-poop"></i>
          DogPlace
        </router-link>
      </h1>
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

.page-title {
  margin: 0 25px;
}

.page-title a {
  color: #7b481e;
  text-decoration: none;
}

.page-title i {
  vertical-align: bottom;
}

</style>
