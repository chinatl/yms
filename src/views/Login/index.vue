<template>
    <div class="login-container">
        <div class="login-content-top">
            <!-- 重复背景元素 -->

            <div class="repreat-bgc" :style="note"></div>
            <div class="login-banner">
              <!-- 登录框 -->
                <img :src="require('@/assets/img/logo.png')" alt="" class="login-logo">
                <div class="login-content">
                  <div class="login-form" v-loading='loading'>
                      <h3>一门式登录入口</h3>
                      <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
                          <el-form-item prop="username">
                              <div class="input-item">
                                  <el-input v-model.trim="loginForm.username" placeholder="请输入用户名" maxlength="30">
                                  </el-input>
                                  <img :src="require('@/assets/img/用户名icon.png')" alt="" class="icon">
                              </div>
                          </el-form-item>
                          <!-- <input type="password" style="position:absolute;z-index:100;opacity:0;width:0;height:0"> -->
                          <el-form-item prop="userCode" >
                              <div class="login-flex">
                                  <div class="input-item">
                                      <el-input v-model.trim="loginForm.userCode" placeholder="请输入验证码" maxlength="6" @keyup.native.enter="handleLogin">
                                      </el-input>
                                      <img :src="require('@/assets/img/密码icon.png')" alt="" class="icon">
                                  </div>
                                  <el-button type="primary" @click="send_code" :disabled="isSend">{{send_message}}</el-button>
                              </div>
                          </el-form-item>
                          <el-form-item>
                              <el-button type="primary" class="login-button" @click.prevent="handleLogin">登录</el-button>
                          </el-form-item>
                      </el-form>
                  </div>
                  <img :src="require('@/assets/img/形状1.png')" alt="" class="login-form-bgc">
                  <img :src="require('@/assets/img/塔.png')" alt="" class="login-form-bgc-hat">
                </div>
              <!--大数据图片-->
                  <img :src="require('@/assets/img/大数据.png')" alt="" class="big-data">
            </div>
        </div>
        <div class="login-content-bottom">
           <p>© 2017-2020 电子政务办 & 神航星云 联合出品</p>
        </div>
    </div>
</template>
<script>
import { SET_USER_INFO } from "@/store/mutations";
import { validatePhone } from "@/utils/validate";
export default {
  data() {
    const validateUserName = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入用户名"));
      } else {
        if (!validatePhone(value)) {
          callback(new Error("用户名不合法"));
        } else {
          callback();
        }
      }
    };
    return {
      note: {
        backgroundImage: "url(" + require("@/assets/img/城市元素.png") + ")"
      },
      loginForm: {
        username: "19802920205",
        userCode: "800185"
      },
      loading: false,
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUserName }
        ],
        userCode: [{ required: true, trigger: "blur", message: "请输入验证码" }]
      },
      timer: null,
      isSend: false,
      send_message: "获取验证码"
    };
  },
  methods: {
    send_code() {
      if (!this.loginForm.username) {
        this.$message({
          message: "请输入用户名",
          type: "warning"
        });
        return;
      }
      if (!validatePhone(this.loginForm.username)) {
        this.$message({
          message: "用户名不合法",
          type: "warning"
        });
        return;
      }
      if (this.isSend) {
        this.$message({
          message: "您已发送验证码，请稍后再发",
          type: "warning"
        });
        return;
      }
      this.loading = true;
      this.$api(`conscription/verify/${this.loginForm.username}`)
        .then(res => {
          this.loading = false;
          this.$message({
            message: "短信发送成功",
            type: "success"
          });
          clearInterval(this.timer);
          this.$message({
            message: "短信验证码已发送，请注意查收",
            type: "success"
          });
          this.isSend = true;
          var isSend = sessionStorage.setItem("login-isSend", "true");
          var a = 0;
          this.send_message = 60 - a + "秒";
          this.timer = setInterval(res => {
            a++;
            this.send_message = 60 - a + "秒";
            sessionStorage.setItem("login-message", this.send_message);
            if (a == 60) {
              this.send_message = "获取验证码";
              this.isSend = false;
              clearInterval(this.timer);
              var isSend = sessionStorage.setItem("login-isSend", "false");
              sessionStorage.setItem("login-message", this.send_message);
            }
          }, 1000);
        })
        .catch(res => {
          console.log(res);
        });
    },
    handleLogin() {
      this.$refs.loginForm.validate(res => {
        if (!res) return;
        this.loading = true;
        this.$api(
          `conscription/land/${this.loginForm.username}/${
            this.loginForm.userCode
          }`
        )
          .then(res => {
            this.loading = false;
            this.$message({
              message: "登录成功！",
              type: "success"
            });
            this.$store.commit(SET_USER_INFO, res.data);
            this.$router.push("/SubsidyDeclaration/index");
          })
          .catch(res => {
            this.loading = false;
            console.log(res);
          });
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login-container {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #ccc;
  .login-content-top {
    background-color: rgb(236, 245, 254);
    height: 60%;
    position: relative;
    .repreat-bgc {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 300px;
    }
    .login-banner {
      height: 100%;
      position: relative;
      width: 1200px;
      margin: 0 auto;
      // logo
      .login-logo {
        position: absolute;
        top: 80px;
        left: -100px;
      }
      // 地球图标
      .big-data {
        position: absolute;
        left: 0;
        bottom: -150px;
        z-index: 5;
        width: 500px;
      }
      .login-content {
        position: absolute;
        right: 0;
        bottom: -120px;
        width: 400px;
        z-index: 5;
        //重复的阴影
        .login-form-bgc-hat {
          position: absolute;
          top: -54px;
          left: -36px;
          z-index: 10;
          width: 120px;
        }
        // 输入框下面阴影
        .login-form-bgc {
          position: absolute;
          bottom: -50px;
          text-align: center;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 8;
          width: 500px;
        }
        .login-form {
          z-index: 9;
          position: relative;
          background-color: #fff;
          padding: 60px 60px;
          border-radius: 8px;
          h3 {
            color: rgb(59, 164, 245);
            font-size: 30px;
            font-weight: normal;
            margin-bottom: 40px;
            margin-top: 20px;
            margin-bottom: 60px;
            line-height: 0;
            text-align: center;
          }
          .input-item {
            position: relative;
            input.el-input__inner {
              padding-left: 40px;
            }
            .icon {
              position: absolute;
              top: 7px;
              left: 12px;
              height: 24px;
            }
          }
          .login-button {
            font-size: 16px;
            width: 100%;
            margin-top: 20px;
          }
          .login-flex {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .code {
              display: inline-block;
              width: 60%;
              height: 40px;
              border-radius: 4px;
              border: solid 1px #e6e6e6;
              margin-left: 12px;
              cursor: pointer;
            }
            .el-button {
              margin-left: 12px;
            }
          }
        }
      }
    }
  }
  .login-content-bottom {
    background-color: rgb(59, 164, 245);
    height: 40%;
    position: relative;
    p {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 10px;
      text-align: center;
      font-size: 14px;
      line-height: 24px;
      color: #fff;
    }
  }
}
</style>