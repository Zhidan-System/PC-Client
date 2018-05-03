<template>
  <div id="app">
    <router-view v-on:gohome="goHome"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    // TODO: write your methods here.
    goHome: function() {
      console.log('home')
      this.$router.replace({path: '/home'})
    }
  }
}
</script>


<style>
.main-page {

}

#exit-button {
  color: white;
}

.el-menu-item {
  color: white;
}

.menu-title {
  color: white;
  font-weight: bold;
}

.el-header {
  text-align: center
}

#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
