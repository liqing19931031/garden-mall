<template>
  <div class="footer">
    <div class="container">
      <div class="siteinfo">
          <ul>
            <li>
              <img src="/static/footer/1.png" alt="">
              <span>平台认证</span>
            </li>
            <li>
              <img src="/static/footer/2.png" alt="">
              <span>信誉担保</span>
            </li>
            <li>
              <img src="/static/footer/3.png" alt="">
              <span>阳光采购</span>
            </li>
            <li>
              <img src="/static/footer/4.png" alt="">
              <span>安全放心</span>
            </li>
          </ul>
          <div class="company-message">
            <div class="mess-title">
              客服电话：400-123456-777
            </div>
            <div class="mess-title">
              <div style="float: left">
                客服微信：
              </div>
              <img src="/static/images/wechat.jpg" width='120' alt="">
            </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
  import YButton from '/components/YButton'
  export default {
    data () {
      return {
      }
    },
    methods: {
    },
    components: {
      YButton
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .footer {
    padding: 50px 0 20px;
    border-top: 1px solid #e6e6e6;
    background: #fafafa;
    margin-top: 60px;
    height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .container {
    width: 1220px;
  }

  .siteinfo {
    height: 100px;
    position: relative;
    justify-content: space-around;
    ul{
      width: 700px;
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
      li{
        text-align: center;
        span{
          line-height: 30px;
        }
        img{
          width: 80px;
          height: 80px;
          display: block;
        }
      }
    }
    .company-message{
      position: absolute;
      top: 0;
      line-height: 25px;
      right: 100px;
      img{
        display: block;
        float: left;
      }
    }
  }

  .copyright {
    color: #434d55;
    font-size: 12px;
    padding: 40px 0 0;
  }


  .content-c0 {
    color: #5079d9;
    cursor: pointer;
    text-decoration: none;
    &:hover {
      color: #3A5FCD;
    }
  }

  .content-c1 {
    float: left;
    line-height: 12px;
    padding: 1px 10px 0;
    border-left: 1px solid #ccc;
  }

  .content-c2 {
    height: 15px;
    display: block;
    text-align: center;
    line-height: 15px;
    color: #757575;
  }

  .cop {
    clear: both;
    padding: 10px 0 0;
    height: 15px;
  }

  .content-c3 {
    margin-right: 20px;
    color: #bdbdbd;
    font-size: 12px;
    height: 12px;
    line-height: 1;
  }
</style>
