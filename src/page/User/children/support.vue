<template>
  <div class="message-group">
    <y-shelf title="消息管理">
      <div slot="content">
        <div class="message-content" v-if='messageList.length > 0'>
          <div class="message__card" v-for='(item, index) in messageList'>
            <div class="message-card__title">
              <span>{{item.title}}</span>
              <span>{{item.time}}</span>
            </div>
            <div class="message-card__content">
              {{item.message}}
            </div>
            <div class="del-cion" @click='delMessage(index)'>
              <svg t="1501234940517" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3014" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20"><path d="M941.576 184.248l-101.824-101.824L512 410.176 184.248 82.424 82.424 184.248 410.168 512l-327.744 327.752 101.824 101.824L512 613.824l327.752 327.752 101.824-101.824L613.832 512z" fill="#cdcdcd" p-id="3015"></path></svg>
            </div>
          </div>
        </div>
        <div class='message-content' style="text-align: center" v-else>
          <img src="/static/images/no-search.png">
          <br>
          <span class="no-discount">您目前还没有消息~</span>
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
        messageList: [
          {
            title: '系统升级',
            message: '如果你无法简洁的表达你的想法，那只说明你还不够了解它。如果你无法简洁的表达你的想法，那只说明你还不够了解它。如果你无法简洁的表达你的想法，那只说明你还不够了解它。如果你无法简洁的表达你的想法，那只说明你还不够了解它。',
            time: new Date()
          },
          {
            title: '系统升级',
            message: '如果你无法简洁的表达你的想法，那只说明你还不够了解它。如果你无法简洁的表达你的想法，那只说明你还不够了解它。如果你无法简洁的表达你的想法，那只说明你还不够了解它。如果你无法简洁的表达你的想法，那只说明你还不够了解它。',
            time: new Date()
          },
          {
            title: '系统升级',
            message: '如果你无法简洁的表达你的想法，那只说明你还不够了解它。如果你无法简洁的表达你的想法，那只说明你还不够了解它。如果你无法简洁的表达你的想法，那只说明你还不够了解它。如果你无法简洁的表达你的想法，那只说明你还不够了解它。',
            time: new Date()
          }
        ]
      }
    },
    methods: {
      delMessage (index) {
        this.messageList.splice(index, 1)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .message-group {
    line-height: 2em;
    font-size: 22px;
    color: #999;
    .message-content{
      min-height: 300px;
      padding: 20px 30px;
      .message__card{
        font-size: 14px;
        border: 1px solid #ddd;
        position: relative;
        .message-card__title{
          padding: 0 25px 0 10px;
          color: #333;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #ddd;
        }
        .del-cion{
          position: absolute;
          right: 5px;
          top: 0;
          cursor: pointer;
          &:hover{
            color: #333;
          }
        }
        .message-card__content{
          padding: 10px;
          line-height: 20px;
        }
        + .message__card{
          margin-top: 20px;
        }
      }
    }
  }
</style>
