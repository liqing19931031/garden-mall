<template>
  <div class="login v2">
    <div class="wrapper">
      <div class="dialog dialog-shadow" style="display: block; margin-top: -362px;">
        <div class="ruleForm">
          <h4>注册 园林链 账号</h4>
          <div class="content" style="margin-top: 20px;">
            <ul class="common-form">
              <li class="username border-1p">
                <div style="margin-top: 40px;" class="input">
                  <input type="text"
                         v-model="ruleForm.username" placeholder="手机号码"
                         @keyup="ruleForm.username=ruleForm.username.replace(/[^\w\.\/]/ig,'')">
                </div>
              </li>
              <li>
                <div class="input">
                  <input type="password"
                         v-model="ruleForm.password"
                         placeholder="密码">
                </div>
              </li>
              <li>
                <div class="input">
                  <input type="text" style="width: 70%" v-model="ruleForm.captcha" placeholder="图片验证码">
                  <div style="width: 30%" @click='relaodImg()'>
                    <img :src="preImg" alt="">
                  </div>
                </div>
              </li>
              <li>
                <div class="input" style="position: relative">
                  <input type="text" v-model="ruleForm.sms_code" placeholder="手机验证码">
                  <div class="getCode-btn" @click='_getImgCode'>
                    {{sendBtn}}
                  </div>
                </div>
              </li>
              <li>
                <div class="input">
                  <input type="text" v-model="ruleForm.invite_code" placeholder="请输入邀请码">
                </div>
              </li>
            </ul>
            <!-- <el-checkbox class="agree" v-model="agreement">
              我已阅读并同意遵守
              <a @click="open('法律声明','此仅为个人练习开源模仿项目，仅供学习参考，承担不起任何法律问题')">法律声明</a> 和
              <a @click="open('隐私条款','本网站将不会严格遵守有关法律法规和本隐私政策所载明的内容收集、使用您的信息')">隐私条款</a>
            </el-checkbox> -->
            <div style="margin-bottom: 30px;">
              <y-button
                :classStyle="ruleForm.username&&ruleForm.password&&registxt==='注册'?'main-btn':'disabled-btn'"
                :text="registxt"
                style="margin: 0;width: 100%;height: 48px;font-size: 18px;line-height: 48px"
                @btnClick="regist"
              >
              </y-button>
            </div>
            <div class="border" style="margin-bottom: 10px;"></div>
            <ul class="common-form pr">
              <!-- <li class="pa" style="left: 0;top: 0;margin: 0;color: #d44d44">{{ruleForm.errMsg}}</li> -->
              <li style="text-align: center;line-height: 48px;margin-bottom: 0;font-size: 12px;color: #999;">
                <span>如果您已拥有 园林链 账号，则可在此</span>
                <router-link to='/login' href="javascript:;"
                   style="margin: 0 5px"
                >登陆</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import YFooter from '/common/footer'
import YButton from '/components/YButton'
import { register, getCode, getImgCode } from '/api/index.js'
require('../../../static/geetest/gt.js')
export default {
  data () {
    return {
      cart: [],
      loginPage: true,
      preImg: this.$store.state.baseIp + '/index.php?m=default&c=public&a=captcha',
      ruleForm: {
        username: '',
        passwrord: '',
        invite_code: '',
        sms_code: '',
        captcha: ''
      },
      allowSend: true,
      sendBtn: '获取验证码',
      agreement: false,
      registxt: '注册'
    }
  },
  computed: {
    count () {
      return this.$store.state.login
    }
  },
  methods: {
    open (t, m) {
      this.$notify.info({
        title: t,
        message: m
      })
    },
    messageSuccess () {
      this.$message({
        message: '恭喜您，注册成功！赶紧登录体验吧',
        type: 'success'
      })
    },
    message (m) {
      this.$message.error({
        message: m
      })
    },
    changeTime (second) {
      if (second > 0 && second <= 60) {
        this.allowSend = false
        this.sendBtn = `${second}后发送`
        setTimeout(() => {
          this.changeTime(--second)
        }, 1000)
      } else {
        this.allowSend = true
        this.sendBtn = '发送验证码'
      }
    },
    _getImgCode () {
      if (!this.ruleForm.captcha) {
        this.$message.error('请先输入图片验证码！')
        return false
      }
      if (!this.ruleForm.username) {
        this.$message.error('手机号不能为空！')
        return false
      }
      getImgCode({
        captcha: this.ruleForm.captcha,
        mobile: this.ruleForm.username
      }).then((res) => {
        if (res.code === 1) {
          this.changeTime(60)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    relaodImg () {
      this.preImg = this.$store.state.baseIp + '/index.php?m=default&c=public&a=captcha&hash=' + Math.random()
    },
    _getCode () {
      return getCode()
    },
    regist () {
      this.registxt = '注册中...'
      if (!this.ruleForm.invite_code) {
        this.$message.error('邀请码不能为空!')
        this.allowSend = true
        this.registxt = '注册'
        return false
      }
      if (!this.ruleForm.username || !this.ruleForm.password) {
        this.message('账号密码不能为空!')
        this.registxt = '注册'
        this.allowSend = true
        return false
      }
      register(this.ruleForm).then(res => {
        if (res.code === 1) {
          this.messageSuccess()
          this.$router.push('/login')
        } else {
          this.message(res.message)
          this.allowSend = true
          this.registxt = '注册'
          return false
        }
      })
    }
  },
  mounted () {
    this._getCode()
  },
  components: {
    YFooter,
    YButton
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
* {
  box-sizing: content-box;
}

.login {
  overflow-x: hidden;
  overflow-y: hidden;
  img{
    cursor: pointer;
    height: 40px;
    margin-left: 10px;
  }
  .input {
    height: 50px;
    display: flex;
    align-items: center;
    input {
      font-size: 16px;
      width: 100%;
      height: 100%;
      padding: 10px 15px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: 6px;
    }
  }
  .wrapper {
    background: url(/static/images/bg_9b9dcb65ff.png) repeat;
    background-size: 100px;
    min-height: 800px;
    min-width: 630px;
  }
}
.getCode-btn{
  cursor: pointer;
  position: absolute;
  right: 10px;
  height: 30px;
  width: 90px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background-color: #EDEDed;
}
.v2 .dialog {
  width: 450px;
  border: 1px solid #dadada;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  margin-left: -225px;
  position: absolute;
  .title {
    background: linear-gradient(#fff, #f5f5f5);
    height: auto;
    overflow: visible;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
    position: relative;
    background-image: url(/static/images/smartisan_4ada7fecea.png);
    background-size: 140px;
    background-position: top center;
    background-repeat: no-repeat;
    height: 92px;
    margin: 23px 0 50px;
    padding: 75px 0 0;
    box-shadow: none;
    h4 {
      padding: 0;
      text-align: center;
      color: #666;
      border-bottom: 1px solid #dcdcdc;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      font-weight: 700;
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: center;
      margin: 0;
      padding: 0;
      border-bottom: 0;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      line-height: 1em;
      height: auto;
      color: #333;
      font-weight: 400;
    }
  }
  .content {
    padding: 0 40px 22px;
    height: auto;
    .common-form {
      li {
        clear: both;
        margin-bottom: 15px;
        position: relative;
      }
    }
  }
}

.dialog-shadow,
.v2 .bbs .dialog-shadow,
.v2 .dialog-shadow {
  -webkit-box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
  -moz-box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
  box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
}

@media screen and (min-width: 737px),
  screen and (-webkit-max-device-pixel-ratio: 1.9) and (max-width: 736px) and (min-device-width: 737px) {
  .wrapper {
    background: url(/static/images/con-bg_04f25dbf8e.jpg) repeat-x;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .dialog {
    background: url(/static/images/dialog-gray-bg.png) #fff bottom repeat-x;
    border-radius: 12px;
    display: none;
    margin: -163px 0 0 -218px;
    width: 436px;
    position: fixed;
    left: 50%;
    top: 50%;
  }
  .dialog .title h4 {
    border-bottom: #d1d1d1 solid 1px;
    box-shadow: 0 2px 6px #d1d1d1;
    color: #666;
    font-size: 20px;
    height: 61px;
    line-height: 61px;
    padding: 0 0 0 35px;
  }
  .common-form li {
    clear: both;
    margin-bottom: 15px;
    position: relative;
  }
  .auto-login {
    position: absolute;
    top: 0px;
    left: 2px;
    color: #999;
  }
  .register {
    padding: 1px 10px 0;
    border-right: 1px solid #ccc;
  }
  .border {
    margin-top: 10px;
    border-bottom: 1px solid #ccc;
  }
  .other {
    margin: 20px 5px 0 0;
    width: auto;
    color: #bbb;
    font-size: 12px;
    cursor: default;
    color: #999;
  }
  .footer {
    display: flex;
    flex-direction: row;
  }
  .agree {
    margin-bottom: 30px;
    color: #999;
  }
}

.ruleForm {
  h4 {
    padding: 0;
    text-align: center;
    color: #666;
    border-bottom: 1px solid #dcdcdc;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    font-weight: 700;
    font-size: 20px;
    height: 60px;
    line-height: 60px;
  }
}

#wait {
  text-align: left;
  color: #999;
  margin: 0;
}
</style>
