<template lang="html">
  <div class="child-tree">
    <y-shelf title="我的团队成员">

    </y-shelf>
  </div>
</template>

<script>
import { getTeamList } from '/api/team'
import YShelf from '/components/shelf'
export default {
  components: {
    YShelf
  },
  data () {
    return {
      user_id: ''
    }
  },
  created () {
    this.user_id = this.$route.query.userId
    if (this.user_id) {
      this._getTeamList()
    }
  },
  methods: {
    _getTeamList () {
      getTeamList({pid: this.user_id}).then(res => {
        if (res.code === 1) {
          console.log(res)
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
