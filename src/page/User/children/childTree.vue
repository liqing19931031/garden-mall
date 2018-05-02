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

import { getTeamList, getTeamHead } from '/api/team'
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
    this.myChart.on('click', params => {
      this._getTeamList(params)
    })
    getTeamHead({user_id: this.user_id}).then(res => {
      let that = this
      if (res.code === 1) {
        this.data.name = res.data[0].true_name !== '' ? res.data[0].true_name : res.data[0].user_name
        this.data.dataIndex = 0
        this.data.user_id = res.data[0].user_id
        this.data.value = res.data[0].team_cost
        this.data.level = res.data[0].level
        this.data.children = []
        this.treeList.push({
          dataIndex: 0,
          pid: 0,
          name: res.data[0].true_name !== '' ? res.data[0].true_name : res.data[0].user_name,
          user_id: res.data[0].user_id,
          value: res.data[0].team_cost,
          level: res.data[0].level,
          children: []
        })
      }
      this.myChart.setOption(that.setOptions(that.data))
    })
  },
  methods: {
    chushi (arys, pid = 0) {
      let list = []
      arys.forEach((item, index) => {
        if (item.pid === pid) {
          item.children = this.chushi(arys, item.user_id)
          list.push(item)
        }
      })
      return list
    },
    getLevel (state) {
      if (state === '0') {
        return '普通代理'
      } else if (state === '1') {
        return '区代理'
      } else if (state === '2') {
        return '市代理'
      } else if (state === '3') {
        return '省代理'
      } else {
        return '普通代理'
      }
    },
    _getTeamList (params) {
      let that = this
      getTeamList({pid: params.data.user_id}).then(res => {
        if (res.code === 1) {
          if (res.data.length === 0) {
            this.$message({
              type: 'warning',
              message: '该用户暂无下线'
            })
          } else {
            let arys = []
            res.data.forEach((item, index) => {
              arys.push({
                pid: params.data.user_id,
                user_id: item.user_id,
                value: item.team_cost,
                dataIndex: params.data.dataIndex + 1,
                name: item.true_name === '' ? item.user_name : item.true_name,
                level: item.level,
                children: []
              })
            })
            let userids = []
            this.treeList.forEach((item, index) => {
              userids.push(item.user_id)
            })
            this.treeList = userids.includes(arys[0].user_id) ? this.treeList : [...this.treeList, ...arys]
            this.myChart.setOption(that.setOptions(this.chushi(this.treeList, 0)[0]))
          }
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      })
    },
    setOptions (data) {
      let that = this
      let obj = {
        series: [
          {
            type: 'tree',
            data: [data],
            left: '2%',
            right: '2%',
            top: '12%',
            effectType: 'ripple',
            bottom: '20%',
            symbol: 'circle',
            symbolSize: function (value, params) {
              if (params.data.dataIndex < 3) {
                return (4 - params.data.dataIndex) * 30
              } else {
                return 60
              }
            },
            orient: 'vertical',
            expandAndCollapse: false,
            itemStyle: {
              borderColor: 'white',
              shadowBlur: 0,
              color: function (params) {
                if (params.data.dataIndex === 0) {
                  return {
                    type: 'radial',
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [
                      {
                        offset: 0, color: 'rgba(11, 138, 253, 1)'
                      },
                      {
                        offset: 0.6, color: 'rgba(11, 138, 253, 1)'
                      },
                      {
                        offset: 0.61, color: 'rgba(11, 138, 253, 0.5)'
                      },
                      {
                        offset: 0.8, color: 'rgba(11, 138, 253, 0.5)'
                      },
                      {
                        offset: 0.81, color: 'rgba(11, 138, 253, 0.2)'
                      },
                      {
                        offset: 1, color: 'rgba(11, 138, 253, 0.2)'
                      }
                    ],
                    globalCoord: true
                  }
                } else if (params.data.dataIndex === 1) {
                  return {
                    type: 'radial',
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [
                      {
                        offset: 0, color: 'rgba(250, 191, 55, 1)'
                      },
                      {
                        offset: 0.7, color: 'rgba(250, 191, 55, 1)'
                      },
                      {
                        offset: 0.71, color: 'rgba(250, 191, 55, 0.3)'
                      },
                      {
                        offset: 1, color: 'rgba(250, 191, 55, 0.3)'
                      }
                    ]
                  }
                } else {
                  return {
                    type: 'radial',
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [
                      {
                        offset: 0, color: 'rgba(241, 99, 85, 1)'
                      },
                      {
                        offset: 0.7, color: 'rgba(241, 99, 85, 1)'
                      },
                      {
                        offset: 0.71, color: 'rgba(241, 99, 85, 0.3)'
                      },
                      {
                        offset: 1, color: 'rgba(241, 99, 85, 0.3)'
                      }
                    ]
                  }
                }
              },
              borderWidth: 1
            },
            label: {
              normal: {
                position: 'inside',
                verticalAlign: 'middle',
                align: 'center',
                fontSize: 16,
                lineHeight: 24,
                formatter: function (params) {
                  return [
                    `{a| ${params.data.name}}`,
                    `{a| ${that.getLevel(params.data.level)}}`,
                    `{a| ¥${params.data.value === '' ? '0.00' : params.data.value}}`
                  ].join('\n')
                },
                rich: {
                  a: {
                    fontSize: 14,
                    color: '#333',
                    lineHeight: 20
                  }
                }
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
