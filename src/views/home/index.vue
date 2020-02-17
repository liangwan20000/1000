<template>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>
        <div class="zuobian">
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
        Main
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "home",
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
          path: "/login"
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        });          
      });
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
