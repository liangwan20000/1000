<template>
  <div class="login">
    <div class="login-box">
      <div class="box-trans">
        <img src="./logo_index.png" alt="">
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
          <el-form-item prop="mobile">
            <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop='code'>
            <el-input v-model="loginForm.code" placeholder="请输入验证码"></el-input>
          </el-form-item>
          <el-form-item class='checkbox' prop='xieyi'>
            <el-checkbox v-model="loginForm.xieyi"></el-checkbox>
            <span>我已阅读并同意</span>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%" type="primary" @click="login()">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data: function () {
    let mobileRules = function (rule, value, callback) {
      let reg = /^1[356789]\d{9}$/;
      if (!reg.test(value)) {
        return callback(new Error('手机号码格式错误'));
      };
      callback();
    };
    let xieyiRules = function (rule, value, callback) {
      if (!value) {
        return callback(new Error('请遵守协议'));
      };
      callback();
    };
    return {
      loginForm: {
        mobile: null,
        code: null,
        xieyi: false
      },
      loginFormRules: {
        mobile: [
          { required: true, message: '手机号码必填', trigger: 'blur' },
          { validator: mobileRules, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码必填', trigger: 'blur' }
        ],
        xieyi: [
          { validator: xieyiRules }
        ]
      }
    }
  },
  methods: {
    login: function () {
      this.$refs.loginFormRef.validate(vali => {
        if (vali) {
          this.$router.push({ path: 'home' })
        }
      })
    }
  }
};
</script>
<style lang="less">
  .login {
    height: 100%;
    background-color: lime;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-box {
      width: 410px;
      height: 345px;
      background-color: #ccc;
      display: flex;
      justify-content: center;
      .box-trans {
        width: 75%;
        text-align: center;
        .el-form {
          width: 100%;
          .el-form-item {
            .el-form-item__content {
              display: flex;
              justify-content: space-around;
            }
          }
        }
        img {
          width: 60%;
          margin: 20px 0;
        }
      }
    }
  }
</style>
