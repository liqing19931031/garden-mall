<template>
  <div class="support">
    <y-shelf title="个人设置">
      <div slot="content">
        <div style="text-align: center">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="园林钱包" name="first">
              <div class="team-message">
                <div class="message-card">
                  <div class="message-card__title">
                    余额
                  </div>
                  <div class="message-card__content">
                    <span><em style="font-size: 24px">￥{{coin.balance}}</em>可用</span>
                    <div class="">
                      <button type="primary" name="button" @click='chongzhi'>充值</button>
                      <router-link to="/home">
                        <button type="default" name="button">去购物</button>
                      </router-link>
                    </div>
                  </div>
                </div>
                <div class="message-card">
                  <div class="message-card__title">
                    园林币
                  </div>
                  <div class="message-card__content">
                    <span><em style="font-size: 24px">{{coin.garden_coin}}</em>可用</span>
                    <div class="">
                      <router-link to="/home">
                        <button type="default" name="button">去购物</button>
                      </router-link>
                    </div>
                  </div>
                </div>
                <div class="message-card">
                  <div class="message-card__title">
                    奖励金
                  </div>
                  <div class="message-card__content">
                    <span><em style="font-size: 24px">￥{{coin.reward}}</em>可用</span>
                    <div class="">
                      <button type="primary" name="button" @click='tixian'>提现</button>
                      <router-link to="/home">
                        <button type="default" name="button">去购物</button>
                      </router-link>
                    </div>
                  </div>
                </div>
                <div class="message-card">
                  <div class="message-card__title">
                    抵用卷
                  </div>
                  <div class="message-card__content">
                    <span><em style="font-size: 24px">￥{{coin.integral}}</em>可用</span>
                    <div class="">
                      <router-link to="/home">
                        <button type="default" name="button">去购物</button>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
              <div style='padding: 15px;' class="check__box">
                <span :class="{'checked-on': checkedOn}" @click='checkedOn = true'>交易明细</span>
                <span :class="{'checked-on': !checkedOn}" @click='checkedOn = false'>分红明细</span>
              </div>
              <div v-if='checkedOn'>
                <div v-if="teamList.length">
                  <el-table
                    :data="teamList"
                    style="width: 100%">
                    <el-table-column
                      prop="add_time"
                      label="日期">
                    </el-table-column>
                    <el-table-column
                      prop="goods_name"
                      label="名称">
                    </el-table-column>
                    <el-table-column
                      prop="order_amount"
                      label="金额">
                      <template scope='scope'>
                        ￥{{scope.row.order_amount}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="order_status"
                      label="状态">
                      <template scope='scope'>
                        {{getState(scope.row.order_status)}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="yes_cost"
                      label="操作">
                      <template scope='scope'>
                        <button type="default" name="button">删除</button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div class='message-content' style="text-align: center" v-else>
                  <img src="/static/images/no-search.png">
                  <br>
                  <span class="no-discount">暂无交易明细~</span>
                </div>
              </div>
              <div v-else>
                <div v-if="rewardList.length">
                  <el-table
                    :data="rewardList"
                    style="width: 100%">
                    <el-table-column
                      prop="add_time"
                      label="日期">
                    </el-table-column>
                    <el-table-column
                      prop="goods_name"
                      label="名称">
                    </el-table-column>
                    <el-table-column
                      prop="order_amount"
                      label="金额">
                      <template scope='scope'>
                        ￥{{scope.row.order_amount}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="order_status"
                      label="状态">
                      <template scope='scope'>
                        {{getState(scope.row.order_status)}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="yes_cost"
                      label="操作">
                      <template scope='scope'>
                        <button type="default" name="button">删除</button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div class='message-content' style="text-align: center" v-else>
                  <img src="/static/images/no-search.png">
                  <br>
                  <span class="no-discount">暂无分红明细~</span>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="产权证" name="second">
              <div style="padding: 15px">
                <div class="cqz">
                  <div class="one-line">
                    <div class="flex1 flex-board">
                      土地拥有权信息展示
                    </div>
                  </div>
                  <div class="one-line">
                    <div class="flex1 flex-board">
                      森林地所有权力人
                    </div>
                    <div class="flex1 flex-board">
                      观音岩村
                    </div>
                    <div class="flex1 flex-board">
                      森林地使用权力人
                    </div>
                    <div class="flex1 flex-board">
                      {{user_name}}
                    </div>
                  </div>
                  <div class="one-line">
                    <div class="flex1 flex-board">
                      森林或林木所有权权利人
                    </div>
                    <div class="flex1 flex-board">
                      {{user_name}}
                    </div>
                    <div class="flex1 flex-board">
                      森林或林木使用权权利人
                    </div>
                    <div class="flex1 flex-board">
                      {{user_name}}
                    </div>
                  </div>
                  <div class="one-line">
                    <div class="flex1 flex-board">
                      坐落
                    </div>
                    <div class="flex3 flex-board">
                      湖北省襄樊市南漳县肖堰镇观音岩1组
                    </div>
                  </div>
                  <div class="one-line">
                    <div class="flex3 flex-board">
                      小地名
                    </div>
                    <div class="flex3 flex-board">
                      漳河
                    </div>
                    <div class="flex1 flex-board">
                      林班
                    </div>
                    <div class="flex2 flex-board">
                      1
                    </div>
                    <div class="flex1 flex-board">
                      小时
                    </div>
                    <div class="flex2 flex-board">
                      0-10
                    </div>
                  </div>
                  <div class="one-line">
                    <div class="flex1 flex-board">
                      面积
                    </div>
                    <div class="flex1 flex-board">
                      {{cqz_mj}}
                    </div>
                    <div class="flex1 flex-board">
                      主要树种
                    </div>
                    <div class="flex1 flex-board">
                      栋类
                    </div>
                  </div>
                  <div class="one-line">
                    <div class="flex1 flex-board">
                      株数
                    </div>
                    <div class="flex1 flex-board">
                      /
                    </div>
                    <div class="flex1 flex-board">
                      林种
                    </div>
                    <div class="flex1 flex-board">
                      防护林（公）
                    </div>
                  </div>
                  <div class="one-line">
                    <div class="flex1 flex-board">
                      林地使用期
                    </div>
                    <div class="flex1 flex-board">
                      30年
                    </div>
                    <div class="flex1 flex-board">
                      终止日期
                    </div>
                    <div class="flex1 flex-board">
                      2037-12-31
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </y-shelf>
    <el-dialog title="提现奖励金" :visible.sync="dialogTableVisible">
      <span class="money">¥</span>
      <el-input v-model="money" auto-complete="off"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="qutixian">确 定</el-button>
    </div>
    </el-dialog>
  </div>
</template>
<script>
  import { getUserCaptial, getTxInfo, getFfInfo, canTixian, applyTixian } from '/api/user'
  import { getCqz } from '/api/team'
  import YShelf from '/components/shelf'
  export default {
    data () {
      return {
        money: 0,
        dialogTableVisible: false,
        activeName: 'first',
        checkedOn: true,
        coin: {
          garden_coin: '0',
          reward: '0',
          balance: '0',
          integral: '0'
        },
        teamList: [
        ],
        rewardList: [
        ],
        user_name: '',
        cqz_mj: '0'
      }
    },
    components: {
      YShelf
    },
    methods: {
      getState (state) {
        if (state === '4') {
          return '失效'
        } else if (state === '1') {
          return '待付款'
        } else if (state === '2') {
          return '待收货'
        } else if (state === '3') {
          return '已完成'
        }
      },
      safeSave () {
      },
      chongzhi () {
        this.$alert('请联系客服！（扫屏幕右下方二维码，或者拨打公司热线）', '充值提示', {
          confirmButtonText: '确定',
          callback: action => {}
        })
      },
      tixian () {
        canTixian().then(res => {
          if (res.data.flag === 1) {
            this.dialogTableVisible = true
          } else {
            this.$message.error(res.message)
          }
        })
      },
      qutixian () {
        if (this.money === 0) {
          this.$message({
            type: 'warning',
            message: '提现金额不能小于0！'
          })
        } else if (this.money > +this.reward) {
          this.$message({
            type: 'warning',
            message: '提现金额不能大于奖励金总额！'
          })
        } else {
          applyTixian({amount: this.money}).then(res => {
            if (res.code === 1) {
              this.$message({
                type: 'success',
                message: '提现成功！'
              })
              this.dialogTableVisible = false
            } else {
              this.$message.error(res.message)
            }
          })
        }
      },
      _getTxInfo () {
        getTxInfo().then(res => {
          if (res.code === 1) {
            this.teamList = res.data
          } else {
            this.$message.error(res.message)
            this.teamList = []
          }
        })
      },
      _getFfInfo () {
        getFfInfo().then(res => {
          if (res.code === 1) {
            this.rewardList = res.data
          } else {
            this.$message.error(res.message)
            this.rewardList = []
          }
        })
      }
    },
    created () {
      getCqz().then(res => {
        let data = res.data
        this.user_name = (data.real_name === '' ? data.user_name : data.real_name)
        this.cqz_mj = data.cqz_mj === '' ? 0 : data.cqz_mj
      })
      this._getTxInfo()
      this._getFfInfo()
      getUserCaptial().then(res => {
        this.coin = res.data
      })
    }
  }
</script>
<style lang="scss" scoped>
  .support {
    color: #999;
    .check__box{
      span{
        cursor: pointer;
        + span{
          margin-left: 15px;
        }
        &.checked-on{
            color: #98AFEE;
        }
      }
    }
    .cqz{
      margin-bottom: 20px;
      border: 1px solid #bbb;
      width: 634px;
      text-align: center;
      line-height: 56px;
      height: 457px;
      .one-line{
        border-bottom: 1px solid;
        border-color: inherit;
        display: flex;
        justify-content: space-between;
        .flex-board{
          + .flex-board{
            border-left: 1px solid;
            border-color: inherit;
          }
        }
        .flex3{
          flex: 3;
        }
        .flex2{
          flex: 2;
        }
        .flex1{
          flex: 1;
        }
      }
    }
    .team-message{
      display: flex;
      padding: 20px;
      justify-content: space-around;
      .message-card{
        width: 200px;
        height: 130px;
        border: 1px solid #ddd;
        border-radius: 5px;
        // cursor: pointer;
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
          line-height: 40px;
          color: rgb(229, 28, 35);
        }
      }
    }
    .el-tabs__content{
      .el-tab-pane{
        min-height: 260px;
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
    button {
      cursor: pointer;
      &[type=primary] {
        background-color: #98AFEE;
      }
    }
    .el-tabs__item{
      &.is-active{
        color: #98AFEE;
      }
    }
  }
</style>
