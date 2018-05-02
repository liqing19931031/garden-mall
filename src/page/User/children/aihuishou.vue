<template>
  <div class="support">
    <y-shelf title="个人设置">
      <div slot="content">
        <div style="text-align: center">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="完善个人信息" name="first">
              <div class="form-group">
                <div class="input-title">
                  账号名称
                </div>
                <div class="input-content">
                  {{form.user_name}}
                </div>
              </div>
              <div class="form-group">
                <div class="input-title">
                  真实姓名
                </div>
                <input type="text" placeholder="真实姓名" v-model="form.real_name">
              </div>
              <div class="form-group">
                <div class="input-title">
                  身份证号码
                </div>
                <input type="text" placeholder="身份证号码" v-model="form.id_card_number">
              </div>
              <div class="form-group">
                <div class="input-title">
                  手机号码
                </div>
                <div class="input-content">
                  {{form.mobile_phone}}
                </div>
              </div>
              <div class="form-group">
                <div class="input-title">
                  邀请码
                </div>
                <div class="input-content">
                  {{form.can_invite === '1' ? form.issue_invite_code : '你暂未购买林权证，无法拥有邀请码'}}
                </div>
              </div>
              <button type="primary" name="button" style="margin-top: 20px" @click='_updateMyInfo'>保存</button>
            </el-tab-pane>
            <el-tab-pane label="财产安全" name="second">
              <div class="form-group">
                <div class="input-title">
                  银行卡账号
                </div>
                <input type="text" placeholder="银行卡账号" v-model="property.bank_card_no">
              </div>
              <div class="form-group">
                <div class="input-title">
                  开户行
                </div>
                <input type="text" placeholder="开户行" v-model="property.bank_name">
              </div>
              <div class="form-group">
                <div class="input-title">
                  开户人姓名
                </div>
                <input type="text" placeholder="开户人姓名" v-model="property.bank_user_name">
              </div>
              <div class="form-group">
                <div class="input-title">
                  联系方式
                </div>
                <input type="text" placeholder="开户人联系方式" v-model="property.bank_user_mobile">
              </div>
              <div class="form-group">
                <div class="input-title">
                  电子钱包
                </div>
                <input type="text" placeholder="imtoken钱包地址" v-model="property.imtoken">
              </div>
              <button type="primary" name="button" style="margin-top: 20px" @click='_updateCcInfo'>保存</button>
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="third">
              <div class="form-group">
                <div class="input-title">
                  您的密码
                </div>
                <input type="text" placeholder="旧密码" v-model="safe.old_pwd">
              </div>
              <div class="form-group">
                <div class="input-title">
                  新密码
                </div>
                <input type="text" placeholder="新密码" v-model="safe.new_pwd">
              </div>
              <div class="form-group">
                <div class="input-title">
                  确认密码
                </div>
                <input type="text" placeholder="确认密码" v-model="safe.new2_pwd">
              </div>
              <button type="primary" name="button" style="margin-top: 20px" @click='safeSave()'>保存</button>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </y-shelf>
  </div>
</template>
<script>
  import { updateMyInfo, getUserInfo, getCcInfo, updateCcInfo, updatePw } from '/api/user'
  import YShelf from '/components/shelf'
  export default {
    data () {
      return {
        activeName: 'first',
        form: {
          user_name: '游客',
          real_name: '',
          id_card_number: '',
          issue_invite_code: 'test',
          mobile_phone: 'test',
          can_invite: '0'
        },
        property: {
          imtoken: '',
          bank_user_mobile: '',
          bank_user_name: '',
          bank_name: '',
          bank_card_no: ''
        },
        safe: {
          old_pwd: '',
          new_pwd: '',
          new2_pwd: ''
        }
      }
    },
    components: {
      YShelf
    },
    methods: {
      safeSave () {
        if ((this.safe.new_pwd === this.safe.new2_pwd) && (this.safe.new_pwd !== '')) {
          updatePw({
            old_pwd: this.safe.old_pwd,
            new_pwd: this.safe.new_pwd
          }).then(res => {
            if (res.code === 1) {
              this.$message({
                type: 'success',
                message: '密码修改成功！'
              })
              this.safe.old_pwd === ''
              this.safe.new_pwd === ''
              this.safe.new2_pwd === ''
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          this.$message({
            type: 'warning',
            message: '两次输入密码必须一致！'
          })
        }
      },
      _updateMyInfo () {
        updateMyInfo({
          real_name: this.form.real_name,
          id_card_number: this.form.id_card_number
        }).then(res => {
          if (res.code === 1) {
            this.$message({
              type: 'success',
              message: '修改成功！'
            })
          }
        })
      },
      _updateCcInfo () {
        updateCcInfo({...this.property}).then(res => {
          if (res.code === 1) {
            this.$message({
              type: 'success',
              message: '修改成功！'
            })
          }
        })
      },
      _getUserInfo () {
        getUserInfo().then(res => {
          this.form.user_name = res.data.user_name
          this.form.real_name = res.data.real_name
          this.form.can_invite = res.data.can_invite
          this.form.id_card_number = res.data.id_card_number
          this.form.issue_invite_code = res.data.issue_invite_code
          this.form.mobile_phone = res.data.mobile_phone === '' ? '123456789' : res.data.mobile_phone
        })
      },
      _getCcInfo () {
        getCcInfo().then(res => {
          if (res.code === 1) {
            this.property = res.data
          } else {

          }
        })
      }
    },
    created () {
      this._getUserInfo()
      this._getCcInfo()
    }
  }
</script>
<style lang="scss" scoped>
  .support {
    color: #999;
    .el-tabs__content{
      .el-tab-pane{
        min-height: 260px;
        padding: 0 20px;
        text-align: left;
        .form-group{
          .input-title{
            float: left;
            line-height: 30px;
            width: 75px;
            color: #333;
          }
          .input-content{
            line-height: 30px;
          }
          input{
            display: block;
            width: 250px;
            height: 30px;
            font-size: 14px;
            padding: 4px 20px;
            color: #1f2d3d;
            border: 1px solid #ccc;
            border-radius: 6px;
            box-shadow: 0 3px 5px -4px rgba(0, 0, 0, .4) inset, -1px 0 3px -2px rgba(0, 0, 0, .1) inset;
            line-height: 46px;
          }
          + .form-group{
            margin-top: 10px;
          }
        }
      }
    }
    button {
      cursor: pointer;
      &[type=primary] {
        background-color: #98AFEE;
      }
    }
    .el-tabs__item{
      &.is-active{
        color: #98AFEE;
      }
    }
  }
</style>
