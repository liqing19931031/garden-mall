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
    getTeamHead({user_id: this.user_id}).then(res => {
      if (res.code === 1) {
        this.data.name = res.data[0].true_name !== '' ? res.data[0].true_name : res.data[0].user_name
        this.data.dataIndex = 0
        this.data.user_id = res.data[0].user_id
        this.data.value = res.data[0].team_cost
        this.data.level = res.data[0].level
      }
      this._getTeamList()
    })
  },
  methods: {
    getLevel (state) {
      if (state === '0') {
        return '无等级'
      } else if (state === '1') {
        return '区代理'
      } else if (state === '2') {
        return '市代理'
      } else if (state === '3') {
        return '省代理'
      }
    },
    _getTeamList (level = 1, index = 0) {
      let that = this
      getTeamList({pid: this.user_id}).then(res => {
        if (res.code === 1) {
          let arys = []
          res.data.forEach(item => {
            arys.push({dataIndex: index + 1, name: item.true_name !== '' ? item.true_name : item.user_name, value: item.all_cost, user_id: item.user_id, level: item.level})
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
              return (4 - params.data.dataIndex) * 30
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
                } else if (params.data.dataIndex === 2) {
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
                    `{a| ¥${params.data.value}}`
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
