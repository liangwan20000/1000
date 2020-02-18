<template>
  <el-container>
    <el-aside :style="width">
      <el-menu
        background-color="#545c64"
        text-color="#fff"
        :router="true"
        :collapse="menuCollapse"
        :collapse-transition="false"
        active-text-color="#ffd04b">
        <el-menu-item index="/welcome" :style="width">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="2" :style="width">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>内容管理</span>
          </template>
          <el-menu-item index="/articleadd">发布文章</el-menu-item>
          <el-menu-item index="/article">文章列表</el-menu-item>
          <el-menu-item index="2-3">评论列表</el-menu-item>
          <el-menu-item index="2-4">素材管理</el-menu-item>
        </el-submenu>
        <el-menu-item index="3" :style="width">
          <i class="el-icon-menu"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="4" :style="width">
          <i class="el-icon-setting"></i>
          <span slot="title">账户信息</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="zuobian">
          <i :class="menuCollapse? 'el-icon-s-unfold' : 'el-icon-s-fold'" style="font-size: 25px;cursor: pointer;vertical-align: middle;" @click="change"></i>
          <span>张浩学院</span>
        </div>
        <div class="youbian">
          <el-input placeholder="请输入查询内容"></el-input>
          <span>消息</span>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <img :src="photo" alt="">
              {{ name }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-plus">个人信息</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-plus">git地址</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-plus-outline" @click.native="loginOut">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data: function () {
    return {
      menuCollapse: false,
      width: 'width: 200px',
      icon: 'el-icon-s-fold'
    }
  },
  computed: {
    name: function () {
      return window.sessionStorage.getItem('name');
    },
    photo: function () {
      return window.sessionStorage.getItem('photo');
    }
  },
  methods: {
    loginOut: function () {
      this.$confirm('确定退出系统吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 清除sessionStorage
        window.sessionStorage.clear();
        // 跳转到登录页
        this.$router.push({
          path: '/login'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        });
      });
    },
    change: function () {
      // 控制导航菜单的展开与合并
      this.menuCollapse = !this.menuCollapse;
      // 控制导航菜单的宽度
      this.width = this.menuCollapse ? 'width:65px' : 'width:200px';
      // 控制图标切换
      this.icon = this.menuCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold';
    }
  }
};
</script>

<style lang="less" scoped>
  .el-container {
    height: 100%;
    .el-header {
      height: 60px;
      background-color: gray;
      .zuobian {
        float: left;
        width: 60%;
        height: 60px;
        line-height: 60px;
      }
      .youbian {
        float: right;
        width: 40%;
        height: 60px;
        line-height: 60px;
        .el-input {
          width: 50%;
        }
        span {
          margin: 0 10px;
        }
        .el-dropdown {
          img {
             width: 40px;
             height: 40px;
             vertical-align: middle;
             border-radius: 50%;
          }
        }
      }
    }
    .el-aside {
      background-color: #323745;
    }
    .el-main {
      background-color: #eee;
    }
  }
</style>
