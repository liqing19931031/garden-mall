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
                    <!-- <div class="">
                      <router-link to="/home">
                        <button type="default" name="button">去购物</button>
                      </router-link>
                    </div> -->
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
                      <button type="default" name="button" @click='zhuanzhang'>转账</button>
                    </div>
                  </div>
                </div>
                <div class="message-card">
                  <div class="message-card__title">
                    抵用券
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
                <span :class="{'checked-on': !checkedOn}" @click='checkedOn = false'>奖励金明细</span>
              </div>
              <div v-if='checkedOn'>
                <div v-if="teamList.length">
                  <el-table
                    :data="teamList"
                    height="350"
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
                    height="350"
                    style="width: 100%">
                    <el-table-column
                      prop="create_time"
                      label="日期">
                    </el-table-column>
                    <el-table-column
                      prop="event"
                      label="名称">
                    </el-table-column>
                    <el-table-column
                      prop="bonus_detail"
                      label="金额">
                      <template scope='scope'>
                        {{scope.row.bonus_detail}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="order_status"
                      label="状态">
                      <template scope='scope'>
                        到账成功
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
              <el-button type="default" size="small" style="margin-left: 15px" @click='dialog = true'>兑换园林币</el-button>
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
      <div class="">
        提示：提现需缴纳手续费 {{+tx_fee*100}}%
      </div>
      <div class="">
        最小提现金额为100元
      </div>
      <span class="money">¥</span>
      <el-input v-model="money" auto-complete="off"></el-input>
      <div slot="footer" class="dialog-footer">
      <button type="primary" @click="qutixian">确 定</button>
    </div>
    </el-dialog>
    <el-dialog title="转账奖励金" :visible.sync="jljModel" class='jlj'>
      您现在可转账奖励金：<span style='color: red'>{{coin.reward}}</span>
      <div class="input-group">
        <div class="input-title">
          输入转账金额
        </div>
        <el-input v-model="jlj.reward"></el-input>
      </div>
      <div class="input-group">
        <div class="input-title">
          请输入对方手机号
        </div>
        <el-input v-model="jlj.mobile"></el-input>
      </div>
      <div class="input-group">
        <div class="input-title">
          请输入真实姓名
        </div>
        <el-input v-model="jlj.real_name"></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
      <button type="primary" @click="quzhuanzhang">确 定</button>
    </div>
    </el-dialog>
    <el-dialog title="兑换园林币" :visible.sync="dialog">
      <div style="float: left;line-height: 30px">
        兑换比例 0.1 : {{cqz2ylb_rate}}
      </div>
      <el-input v-model="coinMoney" auto-complete="off" placeholder='单位0.1亩'></el-input>
      <div style="float: left;line-height: 30px">
        可兑换{{coinMoney * +cqz2ylb_rate * 10}}个园林币
      </div>
      <div slot="footer" class="dialog-footer">
        <button type="primary" style="margin-top: 5px" @click="quduihuan">兑 换</button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { getUserCaptial, getTxInfo, getFfInfo, canTixian, applyTixian, changeCoin } from '/api/user'
  import { getCqz, zuanzhang } from '/api/team'
  import YShelf from '/components/shelf'
  export default {
    data () {
      return {
        jlj: {
          reward: 0,
          real_name: '',
          mobile: ''
        },
        money: 0,
        cqz2ylb_rate: 0,
        coinMoney: '',
        dialogTableVisible: false,
        dialog: false,
        jljModel: false,
        activeName: 'first',
        checkedOn: true,
        tx_fee: '',
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
      zhuanzhang () {
        this.jljModel = true
      },
      quzhuanzhang () {
        if (this.jlj.reward > +this.coin.reward) {
          this.$message.error('转账金额不能超过您自身的奖励金！')
        } else {
          zuanzhang(this.jlj).then(res => {
            if (res.code === 1) {
              this.$message({
                type: 'success',
                message: '转账成功！'
              })
              this.jljModel = false
            } else {
              this.$message.error(res.message)
            }
          })
        }
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
        if (this.money < 100) {
          this.$message({
            type: 'warning',
            message: '奖励金不足100，不能提现'
          })
        } else if (this.money > +this.reward) {
          this.$message({
            type: 'warning',
            message: '提现金额不能大于奖励金总额！'
          })
        } else {
          this.$confirm('您确定要转账您的奖励金？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(res => {
            applyTixian({amount: this.money}).then(res => {
              if (res.code === 1) {
                this.$message({
                  type: 'success',
                  message: '提现成功！'
                })
                this.dialogTableVisible = false
                this._getUserCaptial()
                this._getCqz()
              } else {
                this.$message.error(res.message)
              }
            })
          })
        }
      },
      quduihuan () {
        if (this.coinMoney <= (10 * +this.cqz_mj)) {
          this.dialog = true
          changeCoin({cqz: this.coinMoney}).then(res => {
            if (res.code === 1) {
              this.$message({
                type: 'success',
                message: '兑换成功！'
              })
              this.dialog = false
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          this.$message({
            type: 'warning',
            message: '兑换数额不能超过您所有的最大值！'
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
      },
      _getUserCaptial () {
        getUserCaptial().then(res => {
          this.coin = res.data
          this.tx_fee = res.data.tx_fee
          this.cqz2ylb_rate = res.data.cqz2ylb_rate
        })
      },
      _getCqz () {
        getCqz().then(res => {
          let data = res.data
          this.user_name = (data.real_name === '' ? data.user_name : data.real_name)
          this.cqz_mj = data.cqz_mj === '' ? 0 : data.cqz_mj
        })
      }
    },
    created () {
      this._getCqz()
      this._getTxInfo()
      this._getFfInfo()
      this._getUserCaptial()
    }
  }
</script>
<style lang="scss" scoped>
  .support {
    color: #999;
    .jlj{
      .input-group{
        overflow: hidden;
        .input-title{
          float: left;
          .el-dialog__body{
            overflow: hidden;
          }
        }
      }
    }
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
