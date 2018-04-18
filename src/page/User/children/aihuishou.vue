<template>
  <div class="support">
    <y-shelf title="个人设置">
      <div slot="content">
        <div style="text-align: center">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="完善个人信息" name="first">
              
            </el-tab-pane>
            <el-tab-pane label="财产安全" name="second">配置管理</el-tab-pane>
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
        activeName: 'first'
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
      }
    }
  }
</style>
