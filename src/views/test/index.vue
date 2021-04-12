<template>
  <div class="page">
    <!-- <el-button v-if="notifyList.length !== 0" type="primary" class="closeNotify" @click="closeNotify">
      一键关闭
    </el-button> -->
    <div class="page-container" ref="pageHeight">

      <!-- <div id="toolbar">
        <input type="button" value="添加区域" class="btn" id="btn_add" />
        <input type="button" value="锁定区域" class="btn" id="btn_lock" />
        <input type="button" value="获取数据" class="btn" id="btn_save" />
      </div> -->
      <div id="equipment">
        <img :src="require('@/assets/imgs/demo_picture.png')" />
        <vue-draggable-resizable
          v-for="(item, index) in equipmentData"
          :key="index"
          :dragSelector="dragSelector"
          :handles="dragActive"
          :w="120"
          :h="30"
          :snap="true"
          :y="item.locationY"
          :x="item.locationX"
          :is-conflict-check="true"
          @dragging="onDragging(item)"
          @dragstop="onDragstop">
          <div class="equipmentBox"
            :class="{'equipmentBox--near': item.level===1,
            'equipmentBox--far': item.level===2,
            'equipmentBox--dagder': item.alert===1 }"
          >
            {{item.deviceName}}
          </div>
        </vue-draggable-resizable>

      </div>
    </div>
  </div>
</template>

<script>
// import VueResizable from 'vue-resizable'
import { getTree } from '@/api/get'
import { updateMoveNear, updateMoveFar } from '@/api/home'
export default {
  name: 'test',
  // components: { VueResizable },
  data () {
    return {
      dragActive: [],
      equipmentData: [],
      equipmentActive: {}
    }
  },
  created () {
    this.$nextTick(() => {
      this.getTree()
    })
  },
  methods: {
    onDragging (item) {
      this.equipmentActive = item
      console.log(item)
    },
    onDragstop (left, top) {
      console.log(left, top)
      if (this.equipmentActive.level === 1) {
        updateMoveNear({
          x: left,
          y: top,
          id: this.equipmentActive.id
        }).then(res => {
          console.log(res)
          this.$message({
            type: 'success',
            message: '设置成功!'
          })
        })
      } else if (this.equipmentActive.level === 2) {
        updateMoveFar({
          x: left,
          y: top,
          id: this.equipmentActive.id
        }).then(res => {
          console.log(res)
          this.$message({
            type: 'success',
            message: '设置成功!'
          })
        })
      }
    },
    getRefLineParams (params) {
      console.log(111)
      console.log(params)
    },
    getTree () {
      getTree().then(res => {
        console.log(res)
        const treeData = res.data
        treeData.forEach(e => {
          this.equipmentData.push({
            deviceName: e.near.deviceName,
            deviceId: e.near.deviceId,
            id: e.near.id,
            deviceAddress: e.near.deviceAddress,
            level: 1,
            locationX: e.near.locationX,
            locationY: e.near.locationY,
            alert: 0
          })

          e.far.forEach(o => {
            console.log(o)
            this.equipmentData.push({
              deviceName: o.deviceName,
              deviceId: o.deviceId,
              id: o.id,
              deviceAddress: o.deviceAddress,
              level: 2,
              deviceNearId: o.deviceNearId,
              locationX: o.locationX,
              locationY: o.locationY,
              alert: 0
            })
          })
        })
      })
    }
  }
}
</script>
