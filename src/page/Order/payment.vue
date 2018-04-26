<template>
  <div class="w" style="padding-bottom: 100px;">
    <y-shelf title="支付订单">
      <div slot="content">
        <!--地址信息-->
        <div class="p-msg w">
          <div class="confirm-detail">
            <div class="info-title">收货信息</div>
            <p class="info-detail">姓名：{{consignee}}</p>
            <p class="info-detail">联系电话：{{mobile}}</p>
            <p class="info-detail">详细地址：{{province + city + district + address}}</p></div>
        </div>
        <div class="confirm-table-title">
          <span class="name">商品信息</span>
          <div>
            <span class="price">单价</span>
            <span class="num">数量</span>
            <span class="subtotal">小计</span>
          </div>
        </div>
        <!--商品-->
        <div class="confirm-goods-table">
          <div class="cart-items" v-for="(item,i) in cartList" :key="i">
            <div class="name">
              <div class="name-cell ellipsis">
                <a @click="goodsDetails(item.goods_id)" title="" target="_blank">{{item.goods_name}}</a>
              </div>
            </div>
            <div class="n-b">
              <div class="price">¥ {{item.goods_price}}</div>
              <div class="goods-num">{{item.goods_number}}</div>
              <div class="subtotal">
                <div class="subtotal-cell"> ¥ {{(+item.goods_price * +item.goods_number).toFixed(2)}}<br></div>
              </div>
            </div>
          </div>
        </div>
        <!--合计-->
        <div class="order-discount-line">
          <p style="font-size: 14px;font-weight: bolder;"> <span style="padding-right:47px">商品总计：</span>
            <span style="font-size: 16px;font-weight: 500;line-height: 32px;">¥ {{goods_amount}}</span>
          </p>
          <p><span style="padding-right:30px">抵用券：</span><span style="font-weight: 700;">- ¥ {{+integral_money > +goods_amount ? goods_amount : integral_money}}</span></p>
          <p><span style="padding-right:30px">运费：</span><span style="font-weight: 700;">+ ¥ {{shipping_fee}}</span></p>
        </div>
        <div>
          <div class="box-inner">
            <div>
              <span>
                应付金额：
              </span>
              <em><span>¥</span>{{order_amount}}</em>
              <y-button text="立刻支付"
                        :classStyle="'main-btn'"
                        style="width: 120px;height: 40px;font-size: 16px;line-height: 38px"
                        @btnClick="paySuc()"
              ></y-button>
            </div>
          </div>
        </div>
      </div>
    </y-shelf>
  </div>
</template>
<script>
  import YShelf from '/components/shelf'
  import YButton from '/components/YButton'
  import { getOrder, payOrder } from '/api/order'
  export default {
    data () {
      return {
        cartList: [],
        addressId: 0,
        productId: '',
        num: '',
        mobile: '',
        integral_money: '',
        userId: '',
        goods_amount: '',
        consignee: '',
        checkPrice: '',
        info: '',
        orderId: '',
        type: '',
        shipping_fee: '',
        order_amount: '',
        moneySelect: '1.00',
        isCustom: 0
      }
    },
    computed: {
      // 选中的总价格
      checkPrice () {
        let totalPrice = 0
        this.cartList && this.cartList.forEach(item => {
          if (item.checked === '1') {
            totalPrice += (item.productNum * item.salePrice)
          }
        })
        return totalPrice
      }
    },
    methods: {
      messageFail (m) {
        this.$message.error({
          message: m
        })
      },
      changeSelect (v) {
        if (v !== 'custom') {
          this.money = v
        } else {
          this.isCustom = 1
          this.money = ''
        }
        this.checkValid()
      },
      goodsDetails (id) {
        window.open(window.location.origin + '#/goodsDetails?productId=' + id)
      },
      _getOrderDet (orderId) {
        getOrder({order_id: orderId}).then(res => {
          this.consignee = res.data.consignee
          this.address = res.data.address
          this.province = res.data.province
          this.district = res.data.district
          this.city = res.data.city
          this.mobile = res.data.mobile
          this.goods_amount = res.data.goods_amount
          this.cartList = res.data.goods
          this.integral_money = res.data.integral_money
          this.shipping_fee = res.data.shipping_fee
          this.order_amount = res.data.order_amount
        })
      },
      paySuc () {
        payOrder({order_id: this.orderId}).then(res => {
          if (res.code === 1) {
            this.$router.push('/order/paysuccess')
          } else {
            this.$message.error(res.message)
          }
        })
      },
      isMoney (v) {
        if (v < 0.1) {
          return false
        }
        var regu = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
        var re = new RegExp(regu)
        if (re.test(v)) {
          return true
        } else {
          return false
        }
      },
      isEmail (v) {
        var regu = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
        var re = new RegExp(regu)
        if (re.test(v)) {
          return true
        } else {
          return false
        }
      }
    },
    created () {
      this.orderId = this.$route.query.orderId
      if (this.orderId) {
        this._getOrderDet(this.orderId)
      } else {
        this.$router.push({path: '/'})
      }
    },
    components: {
      YShelf,
      YButton
    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  .order-info {
    padding: 60px 0 55px;
    color: #333;
    background: #fff !important;
    h3 {
      padding-bottom: 14px;
      line-height: 36px;
      text-align: center;
      font-size: 36px;
      color: #212121;
    }
    .payment-detail {
      text-align: center;
      line-height: 24px;
      font-size: 14px;
      color: #999;
    }
  }

  /*支付类型*/
  .pay-type {
    margin: 0 auto;
    width: 90%;
    padding-bottom: 30px;
    .p-title {
      font-size: 18px;
      line-height: 40px;
      padding: 0 10px;
      position: relative;
      &:before {
        content: ' ';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        border-bottom: 1px solid #ccc;
      }
    }

  }

  .pay-type {
    .pay-item {
      display: flex;
      align-items: center;
      div {
        margin-top: 20px;
        width: 175px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #E5E5E5;
        cursor: pointer;
        border-radius: 6px;
        margin-right: 10px;
        background: #FAFAFA;
        &.active {
          border-color: #6A8FE5;
          background: #fff;
        }
        img {
          display: block;
          height: 34px;
          margin: 8px auto;
        }
      }
    }
  }

  .box-inner {
    line-height: 60px;
    background: #f9f9f9;
    border-top: 1px solid #e5e5e5;
    box-sizing: border-box;
    > div {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0 20px;
    }
    em {
      margin-left: 5px;
      font-size: 24px;
      color: #d44d44;
      font-weight: 700;
      margin-right: 20px;
      span {
        margin-right: 4px;
        font-size: 16px;

      }
    }
  }

  .confirm-detail {
    padding: 0 30px 25px;
    border-top: 1px solid #d5d5d5;
    .info-title {
      height: 14px;
      margin: 30px 0 17px;
      line-height: 14px;
      font-weight: bolder;
      color: #333;
    }
    .info-detail {
      line-height: 24px;
      color: #666;
    }
  }

  .confirm-table-title {
    padding: 3px 0 0 33px;
    border-top: 1px solid #D5D5D5;
    line-height: 54px;
    font-weight: bolder;
    color: #000;
    display: flex;
    justify-content: space-between;
    span {
      display: inline-block;
      width: 175px;
      text-align: left;
    }
    .price {
      padding-left: 80px;
    }
    .num {
      padding-left: 75px;
    }
    .subtotal {
      padding-left: 72px;
    }
  }

  .confirm-goods-table {
    border-top: 1px solid #D5D5D5;
    .cart-items {
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      a {
        color: #333;
      }
    }
    .n-b {
      display: flex;
      align-items: center;
      justify-content: center;
      > div {
        color: #626262;
        font-weight: 700;
        width: 175px;
        text-align: center;
      }
    }
  }

  .order-discount-line {
    padding: 22px 30px 53px;
    border-top: 1px solid #D5D5D5;
    line-height: 24px;
    text-align: right;
    font-size: 12px;
    &:first-child {
      line-height: 32px;
      text-align: right;
      font-size: 14px;
      font-weight: bolder;
    }
  }

  .name {
    width: 40%;
  }

  .name-cell {
    padding-left: 33px;
  }

  .input {
    width:30%;
    margin:0 0 1vw 38px;
  }

  .pay-info {
    margin-top: -2vw;
    text-align: center;
  }

  .money-select {
    width: 31%;
    padding-left: 10px;
    margin-bottom: 1vw;
  }
</style>
