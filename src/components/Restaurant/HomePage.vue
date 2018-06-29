  <template>
  <div id="homepage">
    <el-container>
        <el-aside width="200px" height="550px">
          <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"  background-color="#303133">
            <el-submenu index="1">
              <template slot="title">
                <span class="menu-title">菜单管理</span>
              </template>
              <el-menu-item-group>
                <router-link to="/home/types"><el-menu-item index="1-1">品类</el-menu-item></router-link>
                <router-link to="/home/dishes"><el-menu-item index="1-2">单品</el-menu-item></router-link>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">
                <span class="menu-title">数据管理</span>
              </template>
              <el-menu-item-group>
                <router-link to="/home/orders"><el-menu-item index="2-1">流水订单</el-menu-item></router-link>
                <router-link to="/home/statistics"><el-menu-item index="2-2">数据统计</el-menu-item></router-link>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <span class="menu-title">餐厅管理</span>
              </template>
              <el-menu-item-group>
                <router-link to="/home/profile"><el-menu-item index="3-1">餐厅信息</el-menu-item></router-link>
                <router-link to="/home/desks"><el-menu-item index="3-2">餐桌管理</el-menu-item></router-link>
              </el-menu-item-group>
            </el-submenu>


            <el-button icon="el-icon-back" type="text" id="exit-button" v-on:click="signout">退出</el-button>

          </el-menu>
        </el-aside>
      

      <el-main>
        <div class="main-page">
          <div class="panel">
            <div class="panel-body">
              <!--用于渲染匹配的组件-->
              <router-view></router-view>
            </div>
          </div>
        </div>
      </el-main>

    </el-container>
  </div>
</template>

<script>
  import Auth from '../../services/auth'
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
        // Do something here
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
        // Do something here
      },
      signout() {
        // 退出登录
        var that = this
        Auth.signout(function(res) {
          that.$message('退出成功')
          that.$router.push({path: '/restaurant/signin'})
        }, function(err) {
          that.$message.error('服务器错误')
          that.$router.push({path: '/restaurant/signin'})
        })
      }
    }
  }
</script>


<style scoped>

.main-page {
  margin: 0;
  padding: 0;
}


#homepage, .el-container, .el-aside, .el-main, .el-menu, .main-page, .panel {
  height: 100%;
}

.panel-body {
  min-height: 95%;
  padding: 10px;
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

#homepage {
  font-family: Helvetica, sans-serif;
  text-align: center;
}

.el-main {
  padding: 0px;
/*  padding-left: 5px;
*/  background-color:#EDEDED;
}
</style>
