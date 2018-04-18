<template>
  <div class="home">
    <div class="banner-group--title">
      <div class="w">
        <span class="tc">全部商品分类</span>
      </div>
    </div>
    <div class="banner-group w">
      <div class="banner-group--left">
        <a :href='`#${index}`' class="banner-cls" v-for='(item, index) in cls'>
          {{item}}
          <i class="el-icon-arrow-right"></i>
        </a>
      </div>
      <div class="banner-group--content">
        <el-carousel :interval="5000" arrow="always">
          <el-carousel-item v-for="item in banner" :key="item">
            <img :src="item.ad_code" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="banner-group--right tc">
        <div class="user-group">
          <img src="static/images/user-avatar.png" alt="">
          <div class="">
            您好 {{this.$store.state.userInfo ? this.$store.state.userInfo.username : '游客'}}
          </div>
          <div class="">
            欢迎来到园林商城
          </div>
          <div class="" v-if='!this.$store.state.login'>
            <button type="primary" name="button">
              <router-link to="/login">登陆</router-link>
            </button>
            <button type="primary" name="button">
              <router-link to="/register">注册</router-link>
            </button>
          </div>
        </div>
        <div class="">

        </div>
      </div>
    </div>
    <div v-loading="loading" element-loading-text="加载中...">
      <section id="0" class="w mt30 clearfix">
        <y-shelf title="热门商品">
          <div slot="content" class="hot">
            <mall-goods :msg="item" v-for="(item,i) in hot" :key="i"></mall-goods>
          </div>
        </y-shelf>
      </section>
      <section :id='i + 1' class="w mt30 clearfix" v-for="(item,i) in floors" :key="i">
        <y-shelf :title="item[0].floor_name">
          <div slot="content" class="floors">
            <div class="imgbanner">
              <a v-bind:href="floors[i][0].position_id"><img v-lazy="floors[i][0].ad_code" :alt="item.title"></a>
            </div>
            <mall-goods :msg="tab" v-for="(tab,i) in item" :key="i"></mall-goods>
          </div>
        </y-shelf>
      </section>
    </div>
    <el-dialog
      title="通知"
      :visible.sync="dialogVisible"
      width="30%"
      style="width:70%;margin:0 auto">
      <span>XPay个人支付收款系统已上线，赶快去支付体验吧！</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">知道了</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { productHome } from '/api/index.js'
  import YShelf from '/components/shelf'
  import product from '/components/product'
  import mallGoods from '/components/mallGoods'
  export default {
    data () {
      return {
        cls: ['园林产权'],
        banner: [],
        floors: [],
        hot: [],
        loading: true,
        notify: '1',
        dialogVisible: false
      }
    },
    methods: {
    },
    mounted () {
      productHome().then(res => {
        let data = res.data
        let titles = []
        this.hot = data.recommend
        this.banner = data.banner
        this.floors = [data.floor1, [...data.floor2, ...data.floor2, ...data.floor2]]
        this.floors.forEach((item, index) => {
          titles.push(item[0].floor_name)
        })
        this.cls = [...this.cls, ...titles]
        this.loading = false
      })
    },
    components: {
      YShelf,
      product,
      mallGoods
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>

  @import "../../assets/style/mixin";

  .home {
    display: flex;
    flex-direction: column;
  }
  .banner-group--title{
    height: 40px;
    margin-top: 20px;
    border-bottom: 2px solid #0086ed;
    div.w{
      line-height: 40px;
      display: block;
      color: white;
      span{
        width: 200px;
        height: 40px;
        display: block;
        background-color: #0086ed;
        display: block;
      }
    }
  }
  .banner-group{
    height: 300px;
    .banner-group--left{
      width: 200px;
      float: left;
      height: 100%;
      background-color: #00AAFF;
      a{
        color: white;
        width: 100%;
        display: inline-block;
        line-height: 30px;
        padding: 0 20px;
        i{
          font-size: 12px;
          float: right;
          line-height: 30px;
        }
      }
    }
    .banner-group--content{
      width: 700px;
      margin: 0 10px;
      height: 300px;
      float: left;
      .el-carousel__item{
        img{
          width: 700px;
          height: 300px;
        }
      }
    }
    .banner-group--right{
      width: 280px;
      float: left;
      .user-group{
        line-height: 25px;
        padding-top: 20px;
        img{
          border-radius: 50%;
          @include wh(80px);
        }
      }
    }
  }

  .img {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 5px;
    left: 0;
    background: url("http://static.smartisanos.cn/index/img/store/home/banner-3d-item-1-box-3_8fa7866d59.png") center no-repeat;
    background-size: 95% 100%;
  }

  .text {
    position: absolute;
    top: 20%;
    right: 10%;
    font-size: 30px;
    color: #fff;
    text-align: right;
    font-weight: lighter;
  }

  .copyright {
    position: absolute;
    bottom: 10%;
    right: 10%;
    font-size: 10px;
    color: #fff;
    text-align: right;
    font-weight: lighter;
  }

  .a {
    -webkit-transform: translateZ(40px);
  }

  .b {
    -webkit-transform: translateZ(20px);
  }

  .c {
    -webkit-transform: translateZ(0px);
  }

  .sk_item {
    width: 170px;
    height: 225px;
    padding: 0 14px 0 15px;
    > div {
      width: 100%;
    }
    a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: all .3s;
      &:hover {
        transform: translateY(-5px);
      }
    }
    img {
      width: 130px;
      height: 130px;
      margin: 17px 0;
    }
    .sk_item_name {
      color: #999;
      display: block;
      max-width: 100%;
      _width: 100%;
      overflow: hidden;
      font-size: 12px;
      text-align: left;
      height: 32px;
      line-height: 16px;
      word-wrap: break-word;
      word-break: break-all;
    }
    .sk_item_price {
      padding: 3px 0;
      height: 25px;
    }
    .price_new {
      font-size: 18px;
      font-weight: 700;
      margin-right: 8px;
      color: #f10214;
    }
    .price_origin {
      color: #999;
      font-size: 12px;
    }
  }

  .box {
    overflow: hidden;
    position: relative;
    z-index: 0;
    margin-top: 29px;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, .14);
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 3px 8px -6px rgba(0, 0, 0, .1);

  }

  ul.box {
    display: flex;
    li {
      flex: 1;
      img {
        display: block;
        width: 305px;
        height: 200px;
      }
    }
  }

  .mt30 {
    margin-top: 30px;
  }

  .hot {
    display: flex;
    > div {
      flex: 1;
      width: 25%;
    }
  }

  .floors {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .imgbanner {
      width: 50%;
      height: 430px;
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }


</style>
