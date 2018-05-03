<template>
  <el-container>
    <el-header>知单</el-header>
    <el-main>
      <el-input v-model="number" placeholder="管理者手机号" type="text"/>
      <el-input v-model="password" placeholder="密码" type="password"/>
      <el-input v-model="password_again" placeholder="重复密码" type="password"/>
      <el-input v-model="restaurant_name" placeholder="餐厅名" type="text"/>
      <el-button type="primary">立即注册</el-button>
      <div>
        <router-link to="signin">返回登录</router-link>
      </div>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      number: '',
      password : '',
      password_again : '',
      restaurant_name : ''
    }
  }
}
</script>
<style scoped>
</style>
