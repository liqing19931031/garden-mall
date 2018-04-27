<template>
  <div class="team-group">
    <y-shelf title="我的团队成员">
      <div slot="content">
        <div class="team-message">
          <div class="message-card">
            <div class="message-card__title">
              直接邀请人数
            </div>
            <div class="message-card__content">
              {{teamMessage.children}}<span style='font-size: 24px;'>人</span>
            </div>
          </div>
          <div class="message-card">
            <div class="message-card__title">
              我的团队昨日总业绩（元）
            </div>
            <div class="message-card__content">
              {{+teamMessage.last_day_performance}}
            </div>
          </div>
          <div class="message-card">
            <div class="message-card__title">
              我的团队总业绩（元）
            </div>
            <div class="message-card__content">
              {{+teamMessage.all_performance}}
            </div>
          </div>
        </div>
        <div v-if="teamList.length">
          <el-table
            :data="teamList"
            style="width: 100%">
            <el-table-column
              prop="user_name"
              label="账号名称"
              width="120">
            </el-table-column>
            <el-table-column
              prop="true_name"
              label="姓名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="level"
              label="级别"
              width="90">
              <template scope="scope">
                {{getLevel(scope.row.level)}}
              </template>
            </el-table-column>
            <el-table-column
              prop="pre_code"
              label="推广码"
              width="120">
            </el-table-column>
            <el-table-column
              prop="yes_cost"
              label="昨日消费"
              width="120">
              <template scope="scope">
                {{scope.row.yes_cost === '' ? '0' : scope.row.yes_cost}}
              </template>
            </el-table-column>
            <el-table-column
              prop="team_cost"
              label="该团队消费总业绩">
            </el-table-column>
            <el-table-column
              prop='add_time'
              label="注册时间"
              width="120">
            </el-table-column>
            <el-table-column
              prop="user_id"
              label="查看下属成员"
              width="130">
              <template scope='scope'>
                <router-link :to="{ path: '/user/childTree', query: {userId: scope.row.user_id} }">
                  <img width='40' style="cursor: pointer" src="/static/images/da.png" alt="">
                </router-link>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-else>
          <div style="padding: 80px 0;text-align: center">
            <div style="font-size: 20px">暂无团队信息～请分享您的邀请码</div>
            <div style="margin: 20px ">
              <y-button text="添加地址" @btnClick="update()"></y-button>
            </div>
          </div>
        </div>
      </div>
    </y-shelf>
  </div>
</template>
<script>
  import { getTeamList, getTeamDetail } from '/api/team'
  import YShelf from '/components/shelf'
  export default {
    components: {
      YShelf
    },
    data () {
      return {
        teamList: [
          {
            id: 1,
            user_name: '我是大西瓜',
            true_name: '李二狗',
            level: 1,
            pre_code: 6897,
            yes_cost: 50000,
            all_cost: 100000,
            team_cost: 500000,
            add_time: new Date()
          }
        ],
        teamMessage: {
          children: '',
          last_day_performance: '',
          all_performance: ''
        }
      }
    },
    computed: {
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
      _getTeamDetail () {
        getTeamDetail().then(res => {
          this.teamMessage = res.data
        })
      },
      _getTeamList () {
        getTeamList().then(res => {
          this.teamList = res.data
        })
      }
    },
    created () {
      this._getTeamList()
      this._getTeamDetail()
    }
  }
</script>
<style lang="scss" scoped>
.team-group{
  .team-message{
    display: flex;
    padding: 20px;
    justify-content: space-around;
    .message-card{
      width: 250px;
      height: 160px;
      border: 1px solid #ddd;
      border-radius: 5px;
      cursor: pointer;
      transition: all ease 0.5s;
      &:hover{
        box-shadow: 0px 6px 20.46px 1.54px rgba(4, 0, 0, 0.15);
      }
      .message-card__title{
        text-align: center;
        color: #333;
        line-height: 30px;
        border-bottom: 1px solid #ddd;
      }
      .message-card__content{
        text-align: center;
        line-height: 129px;
        font-size: 40px;
        color: rgb(229, 28, 35);
      }
    }
  }
  .table-title {
    position: relative;
    z-index: 1;
    line-height: 38px;
    height: 38px;
    font-size: 12px;
    background: #eee;
    border-bottom: 1px solid #dbdbdb;
    border-bottom-color: rgba(0, 0, 0, .08);
    .name {
      text-align: center;
    }
    span {
      width: 141px;
      float: left;
      text-align: center;
      color: #838383;
    }
  }

  .address-item {
    display: flex;
    align-items: center;
    height: 115px;
    text-align: center;
    .name {
      width: 106px;
    }
    .address-msg {
      flex: 1;
    }
    .telephone {
      width: 160px;
    }
    .defalut {
      width: 80px;
      > a {
        text-align: center;
        /*display: none;*/
      }
    }
    .operation {
      width: 135px;
      a {
        padding: 10px 5px;
      }
    }
    &:hover {
      .defalut > a {
        display: block;
      }
    }
  }

  .address-item + .address-item {
    border-top: 1px solid #CFCFCF;
  }

  .defalut-address {
    color: #626262;
    display: block;
    pointer-events: none;
    cursor: default;
  }

  .md {
    > div {
      text-align: left;
      margin-bottom: 15px;
      > .el-cascader{
        width: 100%;
        .el-input__inner{
          border-radius: 6px;
        }
      }
      > input{
        width: 100%;
        height: 36px;
        font-size: 14px;
        padding: 10px 20px;
        color: #1f2d3d;
        border: 1px solid #ccc;
        border-radius: 6px;
        box-shadow: 0 3px 5px -4px rgba(0, 0, 0, .4) inset, -1px 0 3px -2px rgba(0, 0, 0, .1) inset;
        line-height: 46px;
      }
    }
  }
}
</style>
