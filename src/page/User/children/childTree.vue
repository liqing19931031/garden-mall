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
        name: '李先生'
      }
    }
  },
  created () {
    this.user_id = this.$route.query.userId
  },
  mounted () {
    this.user_id = this.$route.query.userId
    this.myChart = echarts.init(document.getElementById('myChart'))
    getTeamList().then(res => {
      if (res.code === 1) {
        this.data.name = res.data[0].user_name
        this.data.dataIndex = 0
        this.data.user_id = res.data[0].user_id
        this.data.value = res.data[0].team_cost
        this.data.level = res.data[0].level
      }
      this._getTeamList()
    })
  },
  methods: {
    _getTeamList (level = 1, index = 0) {
      let that = this
      getTeamList({pid: this.user_id}).then(res => {
        if (res.code === 1) {
          let arys = []
          res.data.forEach(item => {
            arys.push({dataIndex: index + 1, name: item.user_name, value: item.all_cost, user_id: item.user_id, level: item.level})
          })
          this.data.children = arys
          this.myChart.setOption(that.setOptions(that.data))
          this.myChart.on('click', params => {
            if (params.data.dataIndex === 1) {
              getTeamList({pid: params.data.user_id}).then(res => {
                if (res.code === 1) {
                  let arys = []
                  res.data.forEach(item => {
                    arys.push({dataIndex: 2, name: item.user_name, value: item.all_cost, user_id: item.user_id, level: item.level})
                  })
                  this.data.children.forEach((item, index) => {
                    if (item.user_id === params.data.user_id) {
                      this.$set(this.data.children, index, {...this.data.children[index], children: arys})
                      this.myChart.setOption(that.setOptions(that.data))
                    }
                  })
                }
              })
            } else if (params.data.dataIndex === 2) {
              this.$router.push({path: '/user/childTree', query: {userId: params.data.user_id}})
              location.reload()
            }
          })
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
            symbol: 'circle',
            symbolSize: 30,
            orient: 'vertical',
            expandAndCollapse: false,
            itemStyle: {
              borderColor: 'white',
              color: function (params) {
                if (params.data.dataIndex === 0) {
                  return '#17b4ff'
                } else if (params.data.dataIndex === 1) {
                  return '#fabf37'
                } else if (params.data.dataIndex === 2) {
                  return '#fc5c4c'
                }
              },
              borderWidth: 1
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
