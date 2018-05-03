<template>
  <el-container id="index">
    <el-header>{{name}}</el-header>
    <el-main>
      <router-view v-on:signin="signin"></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      name: 'Zhidan System'
    }
  },
  methods: {
    signin: function() {
      this.$emit('gohome')
    }
  },
  beforeMount: function() {
    this.$router.replace({path: '/account/signin'})
  }
}
</script>

<style>
#index {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#index {
  width: 400px
}
</style>