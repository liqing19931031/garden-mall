<template lang="html">
  <y-shelf title="我的充值记录">
    <div slot="content">
      <div v-if="teamList.length">
        <el-table
          :data="teamList"
          style="width: 100%">
          <el-table-column
            prop="user_name"
            label="账号名称"
            >
          </el-table-column>
          <el-table-column
            prop="real_name"
            label="真实姓名"
            >
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="时间"
            width="175">
          </el-table-column>
          <el-table-column
            prop="change"
            label="金额"
            >
            <template scope="scope">
              {{scope.row.change}}¥
            </template>
          </el-table-column>
          <el-table-column
            label="状态">
            <template scope="scope">
              交易成功
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-else>
        <div style="padding: 80px 0;text-align: center">
          <div style="font-size: 20px">暂无任何充值信息！</div>
        </div>
      </div>
    </div>
  </y-shelf>
</template>

<script>
import { getCzjl } from '/api/team'
import YShelf from '/components/shelf'

export default {
  components: {
    YShelf
  },
  data () {
    return {
      teamList: []
    }
  },
  methods: {
    _getCzjl () {
      getCzjl().then(res => {
        this.teamList = res.data
      })
    }
  },
  created () {
    this._getCzjl()
  }
}
</script>

<style lang="scss">
</style>
