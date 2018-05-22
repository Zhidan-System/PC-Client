<template>
  <el-container>
    <el-header>知单</el-header>
    <el-main>
      <el-input v-model="number" placeholder="手机号" type="text"/>
      <el-input v-model="password" placeholder="密码" type="password"/>
      <el-button type="primary" v-on:click="signin">登录</el-button>
      <div>
        <router-link to="signup">没有账号？立即注册</router-link>
      </div>
   </el-main>
  </el-container>
</template>

<script>
import Auth from '../../../services/auth'

export default {
  name: 'signin',
  data () {
    return {
      number: '',
      password: ''
    }
  },
  methods: {
    signin: function() {
      var that = this
      // 账户密码登录认证
      Auth.signin(this.number, this.password, function (res) {
        console.log(res)
        that.$message('登录成功')
        that.$emit('signin')
      }, function (err) {
        console.log(err)
        that.$message.error('账号或密码错误')
      })
    }
  }
}
</script>
<style scoped>
</style>
