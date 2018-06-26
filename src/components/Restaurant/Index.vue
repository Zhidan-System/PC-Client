<template>
  <div id="index_container">
    <div id="index">
      <router-view v-on:signin="signin"></router-view>
    </div>
  </div>
</template>

<script>
import Auth from '../../services/auth'
export default {
  name: 'index',
  data () {
    return {
      name: '知单'
    }
  },
  methods: {
    signin: function() {
      this.$emit('gohome')
    }
  },
  beforeMount: function() {
    // 测试是否已登录
    var that = this
    Auth.isSignined(function(res) {
      that.$router.push({path: '/home'})
    }, function(err) {
      that.$router.push({path: '/restaurant/signin'})
    })
  }
}
</script>

<style scoped>
#index_container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: auto;
  background-image: url('../../assets/index_bg.jpg');
  background-color: black;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center; 
  background-size: 100%;
}


#index {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-left: auto;
  margin-right: auto;
  width: 300px;
  padding: 10px;
  background-color: white;
  border-radius: 1px;
}
</style>