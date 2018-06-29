<template>
  <el-container>
    <el-header>知单</el-header>
    <el-main>
      <el-input v-model="manager_number" placeholder="手机号" type="text"/>
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
      manager_number: '',
      password: ''
    }
  },
  methods: {
    signin: function() {
      var that = this
      // 账户密码登录认证
      Auth.signin(this.manager_number, this.password, function (res) {
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
.el-button {
  font-size: 12pt;
  margin: 10px;
  width: 99%;
}

.el-input-number .el-input {
  margin: 0;
}

.el-input {
  margin: 8px;
  text-align: bottom;
}


.el-header {
  padding: 10px;
  text-align: center;
  font-size: 25pt;
  font-weight: 2em;
}
</style>
