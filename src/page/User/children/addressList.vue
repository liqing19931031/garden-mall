<template>
  <div>
    <y-shelf title="收货地址">
      <span slot="right"><y-button text="添加收货地址" style="margin: 0" @btnClick="update()"></y-button></span>
      <div slot="content">
        <!--标题-->
        <div class="table-title">
          <span class="name">姓名</span> <span class="address">详细地址</span> <span class="tel">电话</span>
        </div>
        <div v-if="addList.length">
          <div class="address-item" v-for="(item,i) in addList" :key="i">
            <div class="name">{{item.consignee}}</div>
            <div class="address-msg">{{item.province + item.city + item.district + item.address}}</div>
            <div class="telephone">{{item.mobile}}</div>
            <div class="defalut">
              <a @click="changeDef(item)"
                 href="javascript:;"
                 v-text="+item.is_default?'( 默认地址 )':'设为默认'"
                 :class="{'defalut-address':+item.is_default}"></a>
            </div>
            <div class="operation">
              <el-button type="primary" icon="edit" size="small"  @click="update(item)"></el-button>
              <el-button type="danger" icon="delete" size="small" :data-id="item.address_id" @click="del(item.address_id)"></el-button>
            </div>
          </div>
        </div>
        <div v-else>
          <div style="padding: 80px 0;text-align: center">
            <div style="font-size: 20px">你还未添加收货地址</div>
            <div style="margin: 20px ">
              <y-button text="添加地址" @btnClick="update()"></y-button>
            </div>
          </div>
        </div>
      </div>
    </y-shelf>
    <y-popup :open="popupOpen" @close='popupOpen=false' :title="popupTitle">
      <div slot="content" class="md" :data-id="msg.address_id">
        <div>
          <input type="text" placeholder="收货人姓名" v-model="msg.consignee">
        </div>
        <div>
          <input type="number" placeholder="手机号码" v-model="msg.mobile">
        </div>
        <div>
          <el-cascader
            :options="citys"
            v-model='value'
            @active-item-change="handleItemChange"
            :props="props"
          ></el-cascader>
        </div>
        <div>
          <input type="text" placeholder="收货地址" v-model="msg.address">
        </div>
        <y-button text='保存'
                  class="btn"
                  :classStyle="btnHighlight ? 'main-btn' : 'disabled-btn'"
                  @btnClick="save()">
        </y-button>
      </div>
    </y-popup>
  </div>
</template>
<script>
  import { addressList, addressAdd, addressDel, getArea, setDefaultAdd } from '/api/address'
  import YButton from '/components/YButton'
  import YPopup from '/components/popup'
  import YShelf from '/components/shelf'
  export default {
    data () {
      return {
        citys: [],
        addList: [],
        popupOpen: false,
        value: '',
        provinceIds: [],
        popupTitle: '管理收货地址',
        props: {
          value: 'id',
          label: 'label',
          children: 'cities'
        },
        msg: {
          address_id: '',
          consignee: '',
          mobile: '',
          address: ''
        },
        userId: ''
      }
    },
    computed: {
      btnHighlight () {
        let msg = this.msg
        return msg.consignee && msg.mobile && msg.address
      }
    },
    methods: {
      handleItemChange (id) {
        let myid = id[1] || id[0]
        getArea({pid: myid}).then(res => {
          let citys = []
          if (this.provinceIds.includes(myid)) {
            this.citys.forEach((m, i) => {
              if (m.id === myid) {
                res.forEach((item, index) => {
                  citys.push({id: item.region_id, label: item.region_name, cities: []})
                })
                m.cities = citys
                return false
              }
            })
          } else {
            this.citys.forEach((m, i) => {
              m.cities.forEach((n, p) => {
                if (n.id === myid) {
                  res.forEach((item, index) => {
                    citys.push({id: item.region_id, label: item.region_name})
                  })
                  n.cities = citys
                  return false
                }
              })
            })
          }
        })
      },
      _addressList () {
        addressList().then(res => {
          let data = res.data
          console.log(data)
          if (data.length) {
            this.addList = res.data
            this.addressId = res.data[0].addressId || '0'
          } else {
            this.addList = []
          }
        })
      },
      _addressAdd () {
        addressAdd(this.msg).then(res => {
          this._addressList()
        })
      },
      changeDef (item) {
        if (!item.isDefault) {
          setDefaultAdd({address_id: item.address_id}).then(res => {
            if (res.code === 1) {
              item.isDefault = true
              this.$message({
                type: 'success',
                message: '修改默认地址成功！'
              })
            } else {
              this.$message.error(res.msg)
            }
          })
        }
        return false
      },
      // 保存
      save () {
        addressAdd({...this.msg, province: this.value[0], city: this.value[1], district: this.value[2]}).then(res => {
          if (res.code === 1) {
            this.popupOpen = false
            this.$message({
              type: 'success',
              message: '地址添加成功！'
            })
            this._addressList()
          } else {
            this.$message.error(res.message)
            this.popupOpen = false
          }
        })
      },
      // 删除
      del (id) {
        addressDel({address_id: id}).then(res => {
          if (res.code === 1) {
            this.$message({
              type: 'success',
              message: '地址删除成功！'
            })
            this._addressList()
          } else {
            this.message('删除失败')
          }
        })
      },
      // 修改
      update (item) {
        this.popupOpen = true
        if (item) {
          this.popupTitle = '管理收货地址'
          this.msg.userName = item.userName
          this.msg.tel = item.tel
          this.msg.streetName = item.streetName
          this.msg.isDefault = item.isDefault
          this.msg.addressId = item.addressId
        } else {
          this.popupTitle = '新增收货地址'
          this.msg.userName = ''
          this.msg.tel = ''
          this.msg.streetName = ''
          this.msg.isDefault = false
          this.msg.addressId = ''
        }
      }
    },
    created () {
      this._addressList()
      let citys = []
      getArea({pid: 1}).then(res => {
        res.forEach(item => {
          this.provinceIds.push(item.region_id)
          citys.push({id: item.region_id, label: item.region_name, cities: []})
        })
        this.citys = citys
      })
    },
    components: {
      YButton,
      YPopup,
      YShelf
    }
  }
</script>
<style scoped lang="scss">
.table-title {
  position: relative;
  z-index: 1;
  line-height: 38px;
  height: 38px;
  padding: 0 0 0 38px;
  font-size: 12px;
  background: #eee;
  border-bottom: 1px solid #dbdbdb;
  border-bottom-color: rgba(0, 0, 0, .08);
  .name {
    float: left;
    text-align: left;
  }
  span {
    width: 137px;
    float: left;
    text-align: center;
    color: #838383;
  }
  .address {
    margin-left: 115px;
  }
  .tel {
    margin-left: 195px;
  }
}

.address-item {
  display: flex;
  align-items: center;
  height: 115px;
  text-align: center;
  .name {
    width: 106px;
  }
  .address-msg {
    flex: 1;
  }
  .telephone {
    width: 160px;
  }
  .defalut {
    width: 80px;
    > a {
      text-align: center;
      /*display: none;*/
    }
  }
  .operation {
    width: 135px;
    a {
      padding: 10px 5px;
    }
  }
  &:hover {
    .defalut > a {
      display: block;
    }
  }
}

.address-item + .address-item {
  border-top: 1px solid #CFCFCF;
}

.defalut-address {
  color: #626262;
  display: block;
  pointer-events: none;
  cursor: default;
}

.md {
  > div {
    text-align: left;
    margin-bottom: 15px;
    > .el-cascader{
      width: 100%;
      .el-input__inner{
        border-radius: 6px;
      }
    }
    > input{
      width: 100%;
      height: 36px;
      font-size: 14px;
      padding: 10px 20px;
      color: #1f2d3d;
      border: 1px solid #ccc;
      border-radius: 6px;
      box-shadow: 0 3px 5px -4px rgba(0, 0, 0, .4) inset, -1px 0 3px -2px rgba(0, 0, 0, .1) inset;
      line-height: 46px;
    }
  }
}

.btn {
  margin: 0;
  width: 100%;
  height: 50px;
  font-size: 14px;
  line-height: 48px
}
</style>
