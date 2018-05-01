<template>
  <div id="app">
    <el-container>

      <el-col :span="3">
        <h5>Zhidan-System</h5>
        <el-aside width="200px" height="550px">
          <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"  background-color="#303133">

            <el-submenu index="1">
              <template slot="title">
                <span class="menu-title">菜单管理</span>
              </template>
              <el-menu-item-group>
                <router-link to="/types"><el-menu-item index="1-1">品类</el-menu-item></router-link>
                <router-link to="/dishes"><el-menu-item index="1-2">单品</el-menu-item></router-link>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">
                <span class="menu-title">数据管理</span>
              </template>
              <el-menu-item-group>
                <router-link to="/orders"><el-menu-item index="2-1">流水订单</el-menu-item></router-link>
                <router-link to="/dataStatistics"><el-menu-item index="2-2">数据统计</el-menu-item></router-link>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <span class="menu-title">餐厅管理</span>
              </template>
              <el-menu-item-group>
                <router-link to="/employeesManagement"><el-menu-item index="3-1">店员管理</el-menu-item></router-link>
                <router-link to="/restInfo"><el-menu-item index="3-2">餐厅信息</el-menu-item></router-link>
              </el-menu-item-group>
            </el-submenu>


            <a><el-button icon="el-icon-back" type="text" id="exit-button">退出</el-button></a>

          </el-menu>
        </el-aside>
      </el-col>
      

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

#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
