<template>
<form>
  <el-input v-model="name" placeholder="name"/>
  <el-input v-model="password" placeholder="password" :type="type"/>
  <el-radio v-on:click="swithcType" type="radio">hide/show</el-radio>
  <el-button type="primary" v-on:click="signin">Sign In</el-button>
  <router-link to="signup">Go to sign up</router-link>
  <router-view></router-view>
</form>
</template>

<script>
export default {
  name: 'sign-in',
  props: ['initialName', 'initialPassword'],
  // data: () => ({
  //   name: this.initialName,
  //   password: this.initialPassword
  // })
  data () {
    return {
      name: this.initialName,
      password: this.initialPassword,
      type: 'password'
    }
  },
  methods: {
    swithcType: function () {
      if (this.type === 'password') {
        this.type = 'text'
      } else {
        this.type = 'password'
      }
    },
    signin: function() {
      this.$emit('signin')
    }
  }
}
</script>
<style scoped>
.el-header {
    text-align: center
}

</style>
