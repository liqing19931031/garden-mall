<template>
  <div>
    <y-shelf title="我的订单">
      <div slot="content">
        <div v-loading="loading" element-loading-text="加载中..." v-if="orderList.length" style="min-height: 10vw;">
          <div v-for="(item,i) in orderList" :key="i">
            <div class="gray-sub-title cart-title">
              <div class="first">
                <div>
                  <span class="date" v-text="item.createDate"></span>
                  <span class="order-id"> 订单号： <a @click="orderDetail(item.orderId)">{{item.order_sn}}</a> </span>
                </div>
                <div class="f-bc">
                  <span class="num">数量</span>
                  <span class="operation">订单状态</span>
                </div>
              </div>
              <div class="last">
                <span class="sub-total">实付金额</span>
                <span class="order-detail">商品操作</span>
              </div>
            </div>
            <div class="pr">
              <div class="cart" v-for="(good,j) in item.goods" :key="j">
                <div class="cart-l" :class="{bt:j>0}">
                  <div class="car-l-l">
                    <div class="img-box"><a @click="goodsDetails(good.goods_id)"><img :src="good.goods_img" alt=""></a></div>
                    <div class="ellipsis"><a style="color: #626262;" @click="goodsDetails(good.goods_id)">{{good.goods_name}}</a></div>
                  </div>
                  <div class="cart-l-r">
                    <div style="line-height: 28px" class="num">{{good.goods_number}}</div>
                    <div class="type">
                       {{getOrderStatus(item.order_status)}}
                    </div>
                  </div>
                </div>
                <div class="cart-r">
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div class="prod-operation pa" style="right: 0;top: 0;">
                <div class="total">¥ {{item.order_amount}}</div>
                <div class="status" v-if="item.order_status !== '0'">
                  <el-button v-if='item.order_status === "3"' @click="_delOrder(item.order_id)" type="danger" size="small" class="del-order">删除此订单</el-button>
                  <el-button v-if='item.order_status === "4"' @click="_delOrder(item.order_id)" type="danger" size="small" class="del-order">删除此订单</el-button>
                  <el-button v-if='item.order_status === "1"' @click="_cancelOrder(item.order_id)" type="danger" size="small" class="del-order">取消订单</el-button>
                  <el-button v-if='item.order_status === "1"' @click="_goPay(item.order_id)" type="primary" size="small" class="del-order">去支付</el-button>
                  <el-button v-if='item.order_status === "2"' @click="_recOrder(item.order_id)" type="warning" size="small" class="del-order">确认收货</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-loading="loading" element-loading-text="加载中..." class="no-info" v-else>
          <div style="padding: 100px 0;text-align: center">
            你还未创建过订单
          </div>
        </div>
      </div>
    </y-shelf>
    <div style="float:right">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, pager"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import { getOrderList, cancelOrder, delOrder } from '/api/order'
  import YShelf from '/components/shelf'
  export default {
    data () {
      return {
        orderList: [0],
        orderStatus: '',
        loading: true,
        currentPage: 1,
        pageSize: 5,
        total: 0
      }
    },
    methods: {
      handleSizeChange (val) {
        this.pageSize = val
        this._orderList()
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this._orderList()
      },
      goodsDetails (id) {
        window.open(window.location.origin + '#/goodsDetails?productId=' + id)
      },
      orderDetail (orderId) {
        this.$router.push({
          path: 'orderDetail',
          query: {
            orderId: orderId
          }
        })
      },
      getOrderStatus (status) {
        if (status === '1') {
          return '待付款'
        } else if (status === '2') {
          return '待收货'
        } else if (status === '3') {
          return '交易成功'
        } else if (status === '4') {
          return '已取消'
        }
      },
      _getOrderList (status = 1) {
        let params = {
          params: {
            page: this.currentPage,
            status: status
          }
        }
        getOrderList(params).then(res => {
          this.orderList = res.data.list
          this.total = +res.data.total
          this.loading = false
        })
      },
      _goPay (orderId) {
        this.$router.push({
          path: '/order/payment',
          query: {
            'orderId': orderId
          }
        })
      },
      _cancelOrder (orderId) {
        cancelOrder({order_id: orderId}).then(res => {
          if (res.code === 1) {
            this.$message({
              type: 'success',
              message: '取消订单成功！'
            })
            this._getOrderList()
          } else {
            this.$message.error(res.message)
          }
        })
      },
      _delOrder (orderId) {
        delOrder({order_id: orderId}).then(res => {
          if (res.code === 1) {
            this.$message({
              type: 'success',
              message: '订单删除成功！'
            })
            this._getOrderList()
          } else {
            this.$message.error(res.message)
          }
        })
      },
      _recOrder (orderId) {

      }
    },
    created () {
      this._getOrderList()
    },
    components: {
      YShelf
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../assets/style/mixin";
  button{
    & + button{
      margin-top: 15px;
    }
  }
  .el-button + .el-button{
    margin-left: 0;
  }
  .gray-sub-title {
    height: 38px;
    padding: 0 24px;
    background: #EEE;
    border-top: 1px solid #DBDBDB;
    border-bottom: 1px solid #DBDBDB;
    line-height: 38px;
    font-size: 12px;
    color: #666;
    display: flex;
    span {
      display: inline-block;
    }
    .first {
      display: flex;
      justify-content: space-between;
      flex: 1;
      .f-bc {
        > span {
          width: 112px;
          text-align: center;
        }
      }
    }
    .last {
      width: 230px;
      text-align: center;
      display: flex;
      border-left: 1px solid #ccc;
      span {
        flex: 1;
      }
    }
  }

  .bt {
    border-top: 1px solid #EFEFEF;
  }

  .date {
    padding-left: 0px;
  }

  .cart {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    .cart-l {
      display: flex;
      align-items: center;
      flex: 1;
      padding: 15px 0;
      justify-content: space-between;
      position: relative;
      &:before {
        position: absolute;
        content: ' ';
        right: -1px;
        top: 0;
        width: 1px;
        background-color: #EFEFEF;
        height: 100%;
      }
      .ellipsis {
        margin-left: 20px;
        width: 220px;
      }
      .img-box {
        border: 1px solid #EBEBEB;
      }
      img {
        display: block;
        @include wh(80px);
      }
      .cart-l-r {
        display: flex;
        > div {
          text-align: center;
          width: 112px;
        }
      }
      .car-l-l {
        display: flex;
        align-items: center;
      }
    }
    .cart-r {
      width: 230px;
      display: flex;
      span {
        text-align: center;
        flex: 1;
      }
    }
  }

  .prod-operation {
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 254px;
    div {
      width: 100%;
      text-align: center;
    }
    div:last-child {
      padding-right: 24px;
    }
  }
</style>
