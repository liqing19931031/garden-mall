<template lang="html">
  <div class="child-tree">
    <y-shelf title="我的团队成员">
      <div slot="content">
        <div class="chart-map" id="myChart">

        </div>
      </div>
    </y-shelf>
  </div>
</template>

<script>
import echarts from 'echarts'

import { getTeamList } from '/api/team'
import YShelf from '/components/shelf'
export default {
  components: {
    YShelf
  },
  data () {
    return {
      user_id: '',
      treeList: [],
      data: {
        name: '李先生',
        children: [
          {
            name: '王先生',
            children: [
              {
                name: '黄先森'
              },
              {
                name: '黄先森'
              },
              {
                name: '黄先森'
              }
            ]
          },
          {
            name: '王先生',
            children: [
              {
                name: '黄先森'
              },
              {
                name: '黄先森'
              },
              {
                name: '黄先森'
              }
            ]
          },
          {
            name: '王先生',
            children: [
              {
                name: '黄先森'
              },
              {
                name: '黄先森'
              },
              {
                name: '黄先森'
              }
            ]
          }
        ]
      }
    }
  },
  created () {
    this.user_id = this.$route.query.userId
    this._getTeamList()
  },
  mounted () {
    let that = this
    this.user_id = this.$route.query.userId
    this.myChart = echarts.init(document.getElementById('myChart'))
    this.myChart.setOption(that.setOptions(that.data))
  },
  methods: {
    _getTeamList (index = 1) {
      getTeamList({pid: this.user_id}).then(res => {
        if (res.code === 1) {
          let arys = []
          res.data.forEach(item => {
            arys.push({dataIndex: index + 1, ...item})
          })
          console.log(arys)
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      })
    },
    setOptions (data) {
      let obj = {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [
          {
            type: 'tree',
            data: [data],
            left: '2%',
            right: '2%',
            top: '8%',
            bottom: '20%',
            symbol: 'emptyCircle',
            symbolSize: 30,
            orient: 'vertical',
            expandAndCollapse: true,
            itemStyle: {
              color: function (params) {
                return 'black'
              }
            },
            label: {
              normal: {
                position: 'top',
                verticalAlign: 'middle',
                align: 'center',
                fontSize: 14
              }
            },
            leaves: {
              label: {
                normal: {
                  position: 'bottom',
                  rotate: -90,
                  verticalAlign: 'middle',
                  align: 'left'
                }
              }
            },
            animationDurationUpdate: 750
          }
        ]
      }
      return obj
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-map{
  width: 100%;
  height: 600px;
}
</style>
