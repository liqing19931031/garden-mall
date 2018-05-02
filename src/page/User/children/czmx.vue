<template lang="html">
  <y-shelf title="我的提现明细">
    <div slot="content">
      <div v-if="teamList.length">
        <el-table
          :data="teamList"
          height='400'
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
            prop="add_time"
            label="时间"
            width="175">
          </el-table-column>
          <el-table-column
            prop="change"
            label="提现金额(¥)">
            <template scope="scope">
              {{scope.row.amount}}
            </template>
          </el-table-column>
          <el-table-column
            label="状态">
            <template scope="scope">
              <span :class='scope.row.is_del === "1" ? "reject" : "resolve"'>
                {{returnState(scope.row.is_del, scope.row.is_paid)}}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-else>
        <div style="padding: 80px 0;text-align: center">
          <div style="font-size: 20px">暂无任何交易信息！</div>
        </div>
      </div>
    </div>
  </y-shelf>
</template>

<script>
import { getJymx } from '/api/team'
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
    _getJymx () {
      getJymx().then(res => {
        this.teamList = res.data
      })
    },
    returnState (isdel, ispaid) {
      if (isdel === '1') {
        return '已拒绝'
      } else if (ispaid === '0') {
        return '未支付'
      } else {
        return '已支付'
      }
    }
  },
  created () {
    this._getJymx()
  }
}
</script>

<style lang="scss">
.reject{
  color: #ff4949;
}
.resolve{
  color: #20a0ff;
}
</style>
