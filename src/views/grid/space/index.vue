<template>
  <div class="container">
    <Aside class="scroll-beauty" :countChange="countChange" @change="handleBuildingChange"></Aside>

    <div v-if="!buildingId" class="main-content">
      <Empty>
        <span slot="description"> 请先选择建筑 </span>
      </Empty>
    </div>
    <div v-else class="main-content">
      <header>
        <h1>
          <span>建筑名称：{{ building.name }}</span>
          <i class="el-icon-map-location"></i>
          <router-link v-if="$hasPower('GripSpaceEdit')" :to="'building/' + buildingId">
            <i class="el-icon-edit"></i>
          </router-link>
          <i v-if="$hasPower('GripSpaceEdit')" class="el-icon-delete" @click="handleRemoveBuilding"></i>
        </h1>
        <div class="description">
          <span>建筑类别：{{ $getLabel(buildingsTypeOptions, building.category) }}</span>
          <span>建筑地址：{{ building.address }}</span>
          <span>附件：<FileList style="display: inline-block" :ids="building.fileId"></FileList></span>
          <span>物业名称：{{ building.propertyName }}</span>
        </div>
      </header>
      <div class="building-con">
        <div class="building">
          <ul class="unit-list scroll-beauty">
            <li v-for="unit in floorTreeData" :key="unit.id" class="unit-item">
              <header class="unit-header">
                <h3 :id="'node-' + unit.id">
                  {{ unit.name }}
                  <template v-if="unit.name">
                    <i class="el-icon-map-location"></i>
                    <i v-if="$hasPower('GripSpaceEdit')" class="el-icon-edit" @click="handleEdit(unit)"></i>
                    <i v-if="$hasPower('GripSpaceEdit')" class="el-icon-delete" @click="handleRemove(unit)"></i>
                  </template>
                </h3>
              </header>
              <ul class="floor-list">
                <li v-for="floor in unit.children" :key="floor.id" class="floor-item">
                  <header>
                    <h4 :id="'node-' + floor.id">
                      {{ floor.name }}
                      <i class="el-icon-map-location"></i>
                      <i v-if="$hasPower('GripSpaceEdit')" class="el-icon-edit" @click="handleEdit(floor)"></i>
                      <i v-if="$hasPower('GripSpaceEdit')" class="el-icon-delete" @click="handleRemove(floor)"></i>
                      <router-link v-if="$hasPower('GripSpaceEdit')" :to="'room/new?floorId=' + floor.id"
                        ><i class="el-icon-plus"></i
                      ></router-link>
                    </h4>
                  </header>
                  <ul class="room-list">
                    <li v-for="room in floor.children" :id="'node-' + room.id" :key="room.id" class="room-item">
                      <div class="wrap">
                        <p>
                          <span>{{ room.name }}</span>
                          <span>{{ room.area }}m²</span>
                        </p>
                        <p>
                          <span>{{ $getLabel(roomStatusOptions, room.status) }}</span>
                          <span :class="room.bindStatus === 1 ? 'text-success' : 'text-primary'">{{
                            $getLabel(bindStatusOptions, room.bindStatus)
                          }}</span>
                        </p>
                        <div v-if="$hasPower('GripSpaceEdit')" class="controls">
                          <router-link :to="`room/${room.id}`">
                            <el-tooltip content="编辑" placement="top-start">
                              <i class="el-icon-edit"></i>
                            </el-tooltip>
                          </router-link>
                          <div v-if="!room.bindStatus" @click="bimBind(room)">
                            <el-tooltip content="关联" placement="top-start">
                              <i class="el-icon-connection"></i>
                            </el-tooltip>
                          </div>
                          <div v-else @click="bimUnbind(room)">
                            <el-tooltip content="不关联" placement="top-start">
                              <i class="el-icon-link"></i>
                            </el-tooltip>
                          </div>
                          <div @click="handleRemoveRoom(room)">
                            <el-tooltip content="删除" placement="top-start">
                              <i class="el-icon-delete"></i>
                            </el-tooltip>
                          </div>
                          <div v-show="room.bindStatus && showId !== room.id" @click="showEle(room)">
                            <el-tooltip content="查看" placement="top-start">
                              <i class="el-icon-view"></i>
                            </el-tooltip>
                          </div>
                          <div v-show="room.bindStatus && showId === room.id" @click="hideEle(room)">
                            <el-tooltip content="取消" placement="top-start">
                              <svg-icon icon-class="eye" style="margin-right: 5px" />
                            </el-tooltip>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div v-if="buildingId" class="bim-wrap"><BimView ref="bim" :model-id="modelId" @ready="bimReady = true" /></div>
      </div>
    </div>
  </div>
</template>

<script>
import Aside from './components/Aside'
import {
  getBuildingById,
  getBuildingDetail,
  removeFormById,
  removeRegionOrBuildingById,
  updateForm
} from '@/api/grid/region'
import { bindStatusOptions, buildingsTypeOptions, roomStatusOptions } from '../lib/options'
import { Empty } from 'ant-design-vue'
import { removeRoomById, bimBindRoom, bimUnbindRoom, watchBindRoom } from '@/api/grid/space'
import { treeForEach } from '@/utils'
import BimView from '@/components/BBB/bim'
export default {
  name: 'GridSpace',
  components: {
    Aside,
    Empty,
    BimView
  },
  beforeRouteEnter(from, to, next) {
    next(vm => {
      vm.countChange = ''
      if (['GridRoomEdit', 'GridRoomCreate'].includes(to.name)) {
        vm.countChange = 'change' + Math.random()
      }
      vm.buildingId && vm.refresh()
    })
  },
  data() {
    return {
      buildingId: '',
      building: {},
      buildingsTypeOptions,
      bindStatusOptions,
      roomStatusOptions,
      anchorId: null,
      floorTreeData: [],
      countChange: '',
      entityId: '',
      modelId: '91BkekYo',
      activeRoomId: null,
      bimReady: false,
      showId: null
    }
  },
  watch: {
    buildingId(val) {
      if (val) {
        this.refresh()
      }
    }
  },
  methods: {
    async refresh() {
      if (!this.buildingId) return false
      const a = getBuildingById(this.buildingId).then(res => {
        this.building = res.data
      })
      const b = getBuildingDetail({ id: this.buildingId }).then(res => {
        treeForEach(res.data, item => {})
        if (res.data[0].type === 5) {
          res.data = [
            {
              name: '',
              children: res.data
            }
          ]
        }
        this.floorTreeData = res.data
      })
      await Promise.all([a, b])
      this.calculateScroll()
    },
    showEle(room) {
      if (!this.bimReady) {
        return
      }
      if (!room.bindStatus) {
        this.$refs.bim.switchView()
        return
      }
      this.showId = room.id
      this.watchBind(room)
    },
    hideEle() {
      this.$refs.bim.switchView()
      this.$refs.bim.pickElement()
      this.showId = null
    },
    handleBuildingChange(item) {
      if (item.buildingId === this.buildingId) {
        this.calculateScroll()
      }
      this.buildingId = item.buildingId
      this.anchorId = item.type === 3 ? null : item.id
    },
    async calculateScroll() {
      if (!this.anchorId) return false
      await this.$nextTick()
      this.$scrollTo('#node-' + this.anchorId, 300, {
        container: '.unit-list',
        offset: -44
      })
    },
    async handleEdit(node) {
      await this.$prompt('请输入新的名称', '编辑', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /.{1,100}/,
        inputValue: node.name,
        inputErrorMessage: '名称长度为1-100'
      }).then(({ value }) => {
        return updateForm({ id: node.id, name: value })
      })
      await this.refresh()
      await this.$message.success('编辑成功')
    },
    async handleRemoveBuilding() {
      await this.$remove(this.building)
      await removeRegionOrBuildingById(this.buildingId)
      this.buildingId = null
      this.building = {}
      await this.$store.dispatch('grid/getStructTreeData')
      await this.refresh()
      await this.$message.success('删除成功')
    },
    async handleRemove(node) {
      await this.$remove(node)
      await removeFormById(node.id)
      if (this.buildingId === node.id) {
        this.buildingId = null
        this.anchorId = null
      }
      await this.$store.dispatch('grid/getStructTreeData')
      await this.refresh()
      await this.$message.success('删除成功')
    },
    async handleRemoveRoom(room) {
      await this.$remove(room)
      await removeRoomById(room.id)
      await this.$message.success('删除成功')
      await this.refresh()
    },
    // 关联
    // async bimBind(room) {
    //   if (!this.entityId) {
    //     this.$message.error('请先选择房间')
    //     return
    //   }
    //   const params = {
    //     id: room.id,
    //     entityId: this.entityId
    //   }
    //   await bimBindRoom(params)
    //   this.$notify({
    //     title: '温馨提示',
    //     message: `${room.name} 房间关联模型成功`,
    //     type: 'success'
    //   })
    //   room.bindStatus = 1
    // },
    async bimBind(room) {
      if (!this.bimReady) {
        return this.$message.error('模型加载中')
      }
      const selectEleId = this.$refs.bim.getSelectElements()
      console.log(window.allEleAry)
      const selectEle = window.allEleAry.filter(a => selectEleId.includes(a.id))
      if (selectEle.length === 0) {
        return this.$message.error('请先选择构件')
      }
      const cloneData = _.cloneDeep(selectEle)
      await bimBindRoom({
        dataId: room.id,
        modelId: this.modelId,
        bindDTOList: _.map(cloneData, c => _.pick(c, ['docId', 'elementId']))
      })
      this.$notify({
        title: '温馨提示',
        message: `${room.name} 房间关联模型成功`,
        type: 'success'
      })
      room.bindStatus = 1
    },
    // 取消关联
    async bimUnbind(room) {
      await bimUnbindRoom(room.id)
      this.$notify({
        title: '温馨提示',
        message: `${room.name} 房间已取消关联`,
        type: 'success'
      })
      room.bindStatus = 0
    },

    async watchBind(room) {
      const res = await watchBindRoom(room.id)
      this.$refs.bim.pickElement(res.data)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.container {
  display: flex;
}
.aside {
  width: 300px;
  border-right: 1px solid #eee;
  margin-right: 15px;
  padding-right: 15px;
  max-height: calc(100vh - 160px);
  overflow: auto;
}
.main-content {
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
}
.building-con {
  display: flex;
  flex: 1;
}
.building {
  .unit-list {
    overflow: auto;
    max-height: calc(100vh - 260px);
  }
}
.ant-empty {
  width: 100%;
  margin: 0;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ::v-deep .ant-empty-image {
    height: 200px;
  }
  span {
    font-size: 24px;
  }
}
header {
  h1 {
    font-weight: bold;
    margin-bottom: 10px;
    font-size: 18px;
    > span {
      margin-right: 15px;
    }
    > i,
    > a {
      margin-right: 10px;
      cursor: pointer;
      color: unset;
      &:hover {
        color: $menuActiveText;
      }
    }
  }
  .description {
    font-size: 14px;
    margin-bottom: 10px;
    display: flex;
    .file-list {
      vertical-align: top;
    }
    > span:not(:last-child) {
      margin-right: 60px;
    }
  }
}
.building {
  width: 480px;
}
.building {
  border: 1px solid #ddd;
  h2,
  h3,
  h4 {
    padding: 10px 15px;
    font-size: 16px;
    margin: 0;
    > .el-icon-map-location {
      color: $menuActiveText;
      margin-left: 5px;
    }
    > i,
    > a {
      margin-left: 5px;
      padding: 3px;
      cursor: pointer;
      &:hover {
        color: $menuActiveText;
      }
    }
  }
  h2,
  h4 {
    border-bottom: 1px solid #ddd;
  }

  .unit-list {
    padding-bottom: 10px;
  }
  .unit-header {
    position: sticky;
    top: 0;
    background-color: #fff;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .floor-list {
    margin: 0 10px;
  }
  .floor-item {
    background-color: #f5f7fa;
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
  .room-list {
    display: flex;
    flex-wrap: wrap;
    padding: 20px 10px 0;
  }
  .room-item {
    width: 50%;
    margin-bottom: 15px;
    position: relative;
    padding: 0 10px;
    .wrap {
      position: relative;
      border: 1px solid #ddd;
      border-radius: 5px;
      background-color: #fff;
      > p {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 0;
        &:first-child {
          margin-bottom: 10px;
          > span {
            &:first-child {
              font-size: 22px;
            }
          }
        }
      }
      padding: 5px 20px;
      .controls {
        position: absolute;
        background-color: #000a;
        color: #fff;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        align-items: center;
        text-align: center;
        display: none;
        > * {
          width: 33.3%;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          border-right: 1px solid #aaa;
          color: #fff;
          > i,
          > svg {
            margin-bottom: 5px;
            font-size: 24px;
          }
        }
        &::after {
          position: absolute;
          top: 10%;
          left: 50%;
          height: 80%;
          content: '';
        }
      }
    }
    &:hover {
      .controls {
        display: flex;
      }
    }
  }
}
.bim-wrap {
  flex: 1;
}
</style>
