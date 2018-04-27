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
            prop="true_name"
            label="真实姓名"
            >
          </el-table-column>
          <el-table-column
            prop="add_time"
            label="时间"
            width="170">
          </el-table-column>
          <el-table-column
            prop="pre_code"
            label="金额"
            >
          </el-table-column>
          <el-table-column
            prop="yes_cost"
            label="状态"
            >
            <template scope="scope">
              {{scope.row.yes_cost === '' ? '0' : scope.row.yes_cost}}
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
