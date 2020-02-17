<template>
  <div class="login">
    <div class="login-box">
      <div class="box-trans">
        <img src="./logo_index.png" alt="">
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
          <el-form-item prop="mobile">
            <el-input v-model="loginForm.mobile" placeholder="请输入手机号">
              <i slot="prefix" class="iconfont icon-mobile"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop='code'>
            <el-input v-model="loginForm.code" placeholder="请输入验证码">
              <i slot="prefix" class="iconfont icon-yanzhengma"></i>
            </el-input>
          </el-form-item>
          <el-form-item class='checkbox' prop='xieyi'>
            <el-checkbox v-model="loginForm.xieyi"></el-checkbox>
            <span>我已阅读并同意</span>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%" v-loading="btnLoading" type="primary" @click="login()">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import '@/assets/js/gt.js'
import '@/assets/font/iconfont.css'
export default {
  name: 'login',
  data: function () {
    var mobileRules = function (rule, value, callback) {
      var reg = /^1[356789]\d{9}$/;
      if (!reg.test(value)) {
        return callback(new Error('手机号码格式错误'));
      };
      callback();
    };
    var xieyiRules = function (rule, value, callback) {
      if (!value) {
        return callback(new Error('请遵守协议'));
      };
      callback();
    };
    return {
      // 保存生成好的人机交互窗口
      catDom: null,
      // 登录按钮开关
      btnLoading: false,
      // 表单对象
      loginForm: {
        mobile: '13111111111',
        code: '246810',
        xieyi: true
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
      // 判断之前是否做过人机验证
      if (this.catDom) {
        return this.catDom.verify();
      };
      this.btnLoading = true;
      // 登录校验
      this.$refs.loginFormRef.validate(async vali => {
        if (vali) {
          // 人机交互验证
          // 获得验证的密匙信息
          var result = await this.$axios.get(`/captchas/${this.loginForm.mobile}`).catch(err => { return new Error(err) });
          // 解构出相关信息
          var { data } = result.data;
          // 请检测data的数据结构， 保证data.gt, data.challenge, data.success有值
          window.initGeetest({
            // 以下配置参数来自服务端 SDK
            gt: data.gt,
            challenge: data.challenge,
            offline: !data.success,
            new_captcha: data.new_captcha,
            product: 'bind'
          }, (captchaObj) => {
            // 这里可以调用验证实例 captchaObj 的实例方法
            captchaObj.onReady(() => {
              // 验证码ready之后才能调用verify方法   显示验证码
              captchaObj.verify(); // 显示验证码
              this.btnLoading = false; // 关闭按钮的loading状态
              this.catDom = captchaObj; // 保存生成的人机交互窗口
            }).onSuccess(() => {
              // your code 验证成功
              this.loginAct();
            }).onError(() => {
              // your code 验证失败
              this.$message.error('验证失败');
            })
          })
        }
      })
    },
    loginAct: async function () {
      // 与后端做账号验证
      var result = await this.$axios.post('/authorizations', this.loginForm).catch((error) => {
        this.$message.error('登录失败');
        return new Error(error);
      });
      var { status } = result;
      if (status === 201) {
        // 登陆成功跳转页面
        this.$router.push({ path: 'home' })
      };
      var { name, token, photo } = result.data.data;
      window.sessionStorage.setItem('name', name);
      window.sessionStorage.setItem('token', token);
      window.sessionStorage.setItem('photo', photo);
    }
  }
};
</script>
<style lang="less" scoped>
  .login {
    height: 100%;
    background-color: lime;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('./login_bg.jpg');
    background-size: cover;
    .login-box {
      width: 410px;
      height: 345px;
      background-color: #fff;
      display: flex;
      justify-content: center;
      .box-trans {
        width: 75%;
        text-align: center;
        .el-form {
          width: 100%;
          .checkbox /deep/ .el-form-item__content {
            display: flex;
            justify-content: space-around;
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
