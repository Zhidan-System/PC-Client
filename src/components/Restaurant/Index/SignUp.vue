<template>
   <el-container>
    <el-header>知单</el-header>
    <el-main>
      <el-input id="num_input" v-model="manager_number" placeholder="管理者手机号" type="text"/>
      <el-alert v-if="number_visiable" :title="number_alert" type="error" :closable="false" show-icon :visiable="false" />

      <el-input v-model="password" placeholder="密码" type="password"/>
      <el-alert v-if="password_visiable" :title="password_alert" type="error" :closable="false" show-icon />

      <el-input v-model="password_again" placeholder="重复密码" type="password"/>
      <el-alert v-if="pass_again_visiable" :title="pass_again_alert" type="error" :closable="false" show-icon />

      <el-input v-model="restaurant_name" placeholder="餐厅名" type="text"/>
      <el-alert v-if="name_visiable" :title="name_alert" type="error" :closable="false" show-icon />

      <el-button type="primary" v-on:click="submitForm">立即注册</el-button>
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
      manager_number: '',
      password : '',
      password_again : '',
      restaurant_name : '',
      valid: false,

      // Alert msg
      number_alert: '请输入正确手机号',
      number_visiable: false,
      number_reg: /^1[34578][0-9]{9}$/,

      password_alert: '密码长度至少为6位',
      password_visiable: false,

      pass_again_alert: '密码不匹配',
      pass_again_visiable: false,

      name_alert: '餐厅名不能为空',
      name_visiable: false
    }
  },
  methods: {
    submitForm: function () {
      this.checkAll()
      if (!this.valid) return this.$message.error('注册信息错误')
      
      var that = this
      this.$axios.post('/api/v1/restaurant', {
        manager_number: this.manager_number,
        password: this.password,
        restaurant_name: this.restaurant_name
      }).then(function (res) {
        console.log(res);
        that.$message('注册成功');
        that.$router.replace({path: '/restaurant/signin'})
      }).catch(function (error) {
        console.log(error);
        that.$message.error('错误');
      })
    },
    // TODO: Check password_again == password
    checkAll: function () {
      this.valid = true
      if (this.checkNumber()) this.valid = false
      if (this.checkPassword()) this.valid = false
      if (this.checkPassAgain()) this.valid = false
      if (this.checkName()) this.valid = false
    },
    checkNumber: function () {
      return this.number_visiable = !this.number_reg.test(this.manager_number)
    },
    checkPassword: function () {
      this.checkPassAgain()
      return this.password_visiable = this.password.length < 6
    },
    checkPassAgain: function () {
      return this.pass_again_visiable = (this.password !== this.password_again)
    },
    checkName: function () {
      this.restaurant_name = this.restaurant_name.replace(/(^\s*)|(\s*$)/g, ''); 
      return this.name_visiable = this.restaurant_name.length === 0
    }
  },
  watch: {
    manager_number: function () {this.checkNumber()},
    password: function () {this.checkPassword()},
    password_again: function () {this.checkPassAgain()},
    restaurant_name: function () {this.checkName()}
  }
}
</script>
<style scoped>
.el-alert {
  margin-left: 6px;
  font-size: 10px;
  padding: 8px;
  height: 25px;
}
</style>
