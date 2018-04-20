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
              {{getAllPerson}}
            </div>
          </div>
          <div class="message-card">
            <div class="message-card__title">
              我的团队昨日总业绩
            </div>
            <div class="message-card__content">
            </div>
          </div>
          <div class="message-card">
            <div class="message-card__title">
              我的团队总业绩
            </div>
            <div class="message-card__content">
            </div>
          </div>
        </div>
      </div>
    </y-shelf>
  </div>
</template>
<script>
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
        ]
      }
    },
    computed: {
      getAllPerson () {
        return this.teamList.length
      }
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
}
</style>
