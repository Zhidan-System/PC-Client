<template>
  <el-container>
    <el-header>知单</el-header>
    <el-main>
      <el-input v-model="number" placeholder="手机号" type="text"/>
      <el-input v-model="password" placeholder="密码" :type="type"/>
      <el-button type="primary" v-on:click="signin">登录</el-button>
      <div>
        <router-link to="signup">没有账号？立即注册</router-link>
      </div>
   </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'signin',
  props: ['initial_number', 'initial_password'],
  // data: () => ({
  //   name: this.initialName,
  //   password: this.initialPassword
  // })
  data () {
    return {
      number: this.initial_pumber,
      password: this.initial_password,
      type: 'password'
    }
  },
  methods: {
    signin: function() {
      this.$emit('signin')
    }
  }
}
</script>
<style scoped>
</style>
