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
                <input type="text" placeholder="真实姓名" v-model="form.true_name">
              </div>
              <div class="form-group">
                <div class="input-title">
                  身份证号码
                </div>
                <input type="text" placeholder="身份证号码" v-model="form.id_card">
              </div>
              <div class="form-group">
                <div class="input-title">
                  手机号码
                </div>
                <div class="input-content">
                  {{form.user_name}}
                </div>
              </div>
              <div class="form-group">
                <div class="input-title">
                  邀请码
                </div>
                <div class="input-content">
                  {{form.user_name}}
                </div>
              </div>
              <button type="primary" name="button" style="margin-top: 20px">保存</button>
            </el-tab-pane>
            <el-tab-pane label="财产安全" name="second">
              <div class="form-group">
                <div class="input-title">
                  银行卡账号
                </div>
                <input type="text" placeholder="银行卡账号" v-model="property.bank_id">
              </div>
              <div class="form-group">
                <div class="input-title">
                  开户行
                </div>
                <input type="text" placeholder="开户行" v-model="property.bank">
              </div>
              <div class="form-group">
                <div class="input-title">
                  开户人姓名
                </div>
                <input type="text" placeholder="开户人姓名" v-model="property.bank_name">
              </div>
              <div class="form-group">
                <div class="input-title">
                  联系方式
                </div>
                <input type="text" placeholder="开户人联系方式" v-model="property.tel">
              </div>
              <div class="form-group">
                <div class="input-title">
                  电子钱包
                </div>
                <input type="text" placeholder="imtoken钱包地址" v-model="property.wallet">
              </div>
              <button type="primary" name="button" style="margin-top: 20px">保存</button>
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="third">
              <div class="form-group">
                <div class="input-title">
                  您的密码
                </div>
                <input type="text" placeholder="旧密码" v-model="property.old_password">
              </div>
              <div class="form-group">
                <div class="input-title">
                  新密码
                </div>
                <input type="text" placeholder="新密码" v-model="property.new_password">
              </div>
              <div class="form-group">
                <div class="input-title">
                  确认密码
                </div>
                <input type="text" placeholder="确认密码" v-model="property.new2_password">
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
  import YShelf from '/components/shelf'
  export default {
    data () {
      return {
        activeName: 'first',
        form: {
          user_name: '游客',
          true_name: '',
          id_card: ''
        },
        property: {
          wallet: '',
          tel: '',
          bank_name: '',
          bank: '',
          bank_id: ''
        },
        safe: {
          old_password: '',
          new_password: '',
          new2_password: ''
        }
      }
    },
    components: {
      YShelf
    },
    methods: {
      safeSave () {
        if ((this.safe.new_password === this.safe.new2_password) && (this.safe.new_password !== '')) {
        } else {
          this.$message({
            type: 'warning',
            message: '两次输入密码必须一致！'
          })
        }
      }
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
