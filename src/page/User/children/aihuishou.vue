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
              <button type="primary" name="button">保存</button>
            </el-tab-pane>
            <el-tab-pane label="财产安全" name="second">

            </el-tab-pane>
            <el-tab-pane label="修改密码" name="third">角色管理</el-tab-pane>
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
        }
      }
    },
    components: {
      YShelf
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
  }
</style>
