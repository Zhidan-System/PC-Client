<template>
  <div id="homepage">
    <el-container>
        <el-aside width="200px" height="550px">
          <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"  background-color="#303133" :collapse=false>
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
                <router-link to="/home/employees"><el-menu-item index="3-1">店员管理</el-menu-item></router-link>
                <router-link to="/home/profile"><el-menu-item index="3-2">餐厅信息</el-menu-item></router-link>
              </el-menu-item-group>
            </el-submenu>


            <a><el-button icon="el-icon-back" type="text" id="exit-button">退出</el-button></a>

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
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
        // Do something here
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
        // Do something here
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

#homepage {
  font-family: Helvetica, sans-serif;
  text-align: center;
}

.el-main {
  padding: 0px;
  padding-left: 5px;
  background-color:#EDEDED;
}
</style>
