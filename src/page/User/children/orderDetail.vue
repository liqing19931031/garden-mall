<template>
  <div>
    <y-shelf v-bind:title="orderTitle">
      <div slot="content">
        <div v-loading="loading" element-loading-text="加载中..." style="min-height: 10vw;" v-if="orderList.length">
          <!-- <div class="orderStatus" v-if="orderStatus !== -1 && orderStatus !== 6">
            <el-steps :space="200" :active="orderStatus">
              <el-step title="下单" v-bind:description="createTime"></el-step>
              <el-step title="付款" v-bind:description="payTime"></el-step>
              <el-step title="配货" description=""></el-step>
              <el-step title="出库" description=""></el-step>
              <el-step title="交易成功" v-bind:description="finishTime"></el-step>
            </el-steps>
          </div>
          <div class="orderStatus-close" v-if="orderStatus === -1">
            <el-steps :space="780" :active="2">
              <el-step title="下单" v-bind:description="createTime"></el-step>
              <el-step title="交易关闭" v-bind:description="closeTime"></el-step>
            </el-steps>
          </div>
          <div class="orderStatus-close" v-if="orderStatus === 6">
            <el-steps :space="780" :active="2">
              <el-step title="下单" v-bind:description="createTime"></el-step>
              <el-step title="交易关闭" v-bind:description="closeTime"></el-step>
            </el-steps>
          </div>
          <div class="status-now" v-if="orderStatus === 1">
            <ul>
              <li class="status-title"><h3>订单状态：待付款</h3></li>
              <li class="button">
                <el-button @click="orderPayment(orderId)" type="primary" size="small">现在付款</el-button>
                <el-button @click="_cancelOrder()" size="small">取消订单</el-button>
              </li>
            </ul>
            <p class="realtime">
              <span>您的付款时间还有 </span>
              <span class="red"><countDown v-bind:endTime="countTime" endText="已结束"></countDown></span>
              <span>，超时后订单将自动取消。</span>
            </p>
          </div>
          <div class="status-now" v-if="orderStatus === 2">
            <ul>
              <li class="status-title"><h3>订单状态：已支付，待系统审核确认</h3></li>
            </ul>
            <p class="realtime">
              <span>请耐心等待审核，审核结果将发送到您的邮箱，并且您所填写的捐赠数据将显示在捐赠表中。</span>
            </p>
          </div>
          <div class="status-now" v-if="orderStatus === -1 || orderStatus === 6">
            <ul>
              <li class="status-title"><h3>订单状态：已关闭</h3></li>
            </ul>
            <p class="realtime">
              <span>您的订单已关闭。</span>
            </p>
          </div> -->
          <div style="padding:0 30px;line-height: 30px">
            <div style="float: left">
              快递单号 {{invoice_no}} {{shipping_name}}
            </div>
            <a href="http://www.kuaidi100.com/" target="_blank" style="margin-left: 30px">
                去查询
            </a>
          </div>
          <div class="gray-sub-title cart-title">
            <div class="first">
              <div>
                <span class="order-id">商品名称</span>
              </div>
              <div class="f-bc">
                <span class="price">单价</span>
                <span class="num">数量</span>
                <span class="operation">小计</span>
              </div>
            </div>
          </div>

          <!--商品-->
          <div class="goods-table">
            <div class="cart-items" v-for="(item,i) in orderList" :key="i">
              <a @click="goodsDetails(item.goods_id)" class="img-box"><img :src="item.productImg" alt=""></a>
              <div class="name-cell ellipsis">
                <a @click="goodsDetails(item.goods_id)" title="" target="_blank">{{item.goods_name}}</a>
              </div>
              <div class="n-b">
                <div class="price">¥ {{item.goods_price}}</div>
                <div class="goods-num">{{item.goods_number}}</div>
                <div class="subtotal"> ¥ {{(+item.goods_price * +item.goods_number).toFixed(2)}}</div>
              </div>
            </div>
          </div>
          <!--合计-->
          <div class="order-discount-line">
            <p class="my-price" style="font-size: 14px;font-weight: bolder;"> <span style="padding-right:47px">商品总计：</span>
              <span style="font-size: 16px;font-weight: 500;line-height: 32px;">¥ {{orderTotal}}</span>
            </p>
            <p class="my-price"><span style="padding-right:30px">运&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp费：</span><span style="font-weight: 700;">+ ¥ {{shippingFee}}</span></p>
            <p class="my-price"><span style="padding-right:30px">抵&nbsp&nbsp用&nbsp&nbsp券：</span><span style="font-weight: 700;">- ¥ {{integralMoney}}</span></p>
            <p class="my-price"><span style="padding-right:30px">余额支付：</span><span style="font-weight: 700;">- ¥ {{orderAmount}}</span></p>
            <p class="price-total"><span>应付金额：</span><span class="price-red">¥ {{(+orderAmount + +integralMoney).toFixed(2)}}</span></p>
          </div>

          <div class="gray-sub-title cart-title">
            <div class="first">
              <div>
                <span class="order-id">收货信息</span>
              </div>
            </div>
          </div>
          <div style="height: 155px;padding: 20px 30px;">
            <p class="address">姓名：{{ userName }}</p>
            <p class="address">联系电话：{{ tel }}</p>
            <p class="address">详细地址：{{ streetName }}</p>
          </div>
        </div>
        <div v-loading="loading" element-loading-text="加载中..." v-else>
          <div style="padding: 100px 0;text-align: center">
            获取该订单信息失败
          </div>
        </div>
      </div>
    </y-shelf>

  </div>
</template>
<script>
  import { getOrder } from '/api/order'
  import YShelf from '/components/shelf'
  import countDown from '/components/countDown'
  export default {
    data () {
      return {
        orderList: [0],
        userId: '',
        orderStatus: 0,
        orderId: '',
        userName: '',
        tel: '',
        streetName: '',
        orderTitle: '',
        createTime: '',
        payTime: '',
        closeTime: '',
        finishTime: '',
        orderTotal: '',
        shippingFee: '',
        integralMoney: '',
        loading: true,
        countTime: 0,
        orderAmount: 0
      }
    },
    methods: {
      orderPayment (orderId) {
        window.open(window.location.origin + '#/order/payment?orderId=' + orderId)
      },
      goodsDetails (id) {
        window.open(window.location.origin + '#/goodsDetails?productId=' + id)
      },
      _getOrder () {
        getOrder({order_id: this.orderId}).then(res => {
          if (res.code === 1) {
            this.orderTitle = '订单号：' + res.data.order_sn
            this.orderList = res.data.goods
            this.userName = res.data.consignee
            this.tel = res.data.mobile
            this.invoice_no = res.data.invoice_no
            this.shipping_name = res.data.shipping_name
            this.orderTotal = res.data.goods_amount
            this.shippingFee = res.data.shipping_fee
            this.integralMoney = res.data.integral_money
            this.orderAmount = res.data.order_amount
            this.orderStatus = +res.data.order_status
            this.streetName = [res.data.province, res.data.city, res.data.district, res.data.address].join(' ')
          }
          this.loading = false
        })
      }
    },
    created () {
      this.orderId = this.$route.query.orderId
      this._getOrder()
    },
    components: {
      YShelf,
      countDown
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../assets/style/mixin";

  .orderStatus {
    display: flex;
    align-items: center;
    flex-direction: row;
    margin: 50px -150px 20px 60px;
  }

  .orderStatus-close {
    display: flex;
    align-items: center;
    flex-direction: row;
    margin: 50px -800px 20px 60px;
  }

  .status-now {
    background: #F6F6F6;
    border: 1px solid #dadada;
    border-radius: 5px;
    padding: 22px 30px 20px;
    margin: 0 30px 30px 30px;
    line-height: 38px;
  }

  .status-title {
    font-size: 18px;
    color: #666;
  }

  .button {
    float: right;
    margin: -37px 0 20px 0;
  }

  .realtime {
    border-top: 1px solid #dcdcdc;
    margin-top: 20px;
    padding-top: 26px;
  }

  .red {
    color: #d44d44;
  }

  .address {
    line-height: 38px;
    word-wrap: break-word;
    word-spacing: normal;
    word-break: break-all;
    color: #626262;
  }

  .img-box {
    border: 1px solid #EBEBEB;
    margin-left: -80px;
  }

  img {
    display: block;
    @include wh(80px);
  }

  .goods-table {
    .n-b {
      display: flex;
      align-items: center;
      justify-content: center;
      > div {
        color: #626262;
        font-weight: 700;
        width: 160px;
        text-align: center;
      }
    }
    .cart-items {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 110px;
      padding: 15px 24px 15px 111px;
      border-bottom: 1px solid #EFEFEF;
      a {
        color: #333;
      }
    }
  }

  .order-discount-line {
    padding: 22px 30px 20px;
    line-height: 24px;
    text-align: right;
    font-size: 12px;
    &:first-child {
      line-height: 32px;
      text-align: right;
      font-size: 14px;
      font-weight: bolder;
    }
    .my-price{
      width: 20%;
      margin-left: 80%;
      display: flex;
      justify-content: space-between;
      span{
        &:nth-child(1){
          display: flex;
          width: 120px;
          flex: space-between;
        }
      }
    }
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
      height: 100%;
    }
    .first {
      display: flex;
      justify-content: space-between;
      flex: 1;
      .f-bc {
        > span {
          width: 160px;
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

  .order-id {
    margin-left: 10px;
  }

  .cart {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    &:hover {
      .del-order {
        display: block;
      }
    }
    .del-order {
      display: none;
    }
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

  .price-total {
    height: 54px;
    line-height: 54px;
    font-size: 18px;
  }

  .price-red {
    font-weight: 700;
    color: #d44d44;
  }
</style>
