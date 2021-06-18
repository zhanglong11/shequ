<template>
  <div class="container">
    <div class="content">
      <div v-if="isModel" class="tree-header">
        <span />
        <h3>BIM信息</h3>
        <i class="close el-icon-close" @click="$parent.showBimTree" />
      </div>
      <!--      <div class="filter">-->
      <!--        <el-input v-model="treeFilter" placeholder="请输入" :clearable="true" />-->
      <!--      </div>-->
      <div class="tree-scroll" :class="isModel ? 'isModel' : 'noModel'">
        <el-tree
          ref="tree"
          class="tree"
          :data="treeData"
          node-key="id"
          :show-checkbox="modelReady"
          :load="loadNode"
          lazy
          :props="defaultProps"
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
          :default-checked-keys="checkIds"
          @check="change"
          @node-click="treeClick"
        >
          <span slot-scope="{ data }" class="custom-tree-node">
            <el-tooltip class="item" effect="dark" :content="data.name" placement="right" :open-delay="800">
              <span class="name">{{ data.name }}</span>
            </el-tooltip>
            <span v-if="data.type === 'element' && isModel" class="detail" @click.stop="showDetail(data)" />
          </span>
        </el-tree>
      </div>
    </div>
    <div v-if="detailVisible && visible" class="bim-detail">
      <BimDetail :modelId="modelId" :curId="curDetailId" />
    </div>
  </div>
</template>

<script>
import BimDetail from '../bimDetail'
import axios from 'axios'
import localForage from 'localforage'
export default {
  name: 'BimTree',
  // import引入的组件
  components: {
    BimDetail
  },
  props: {
    modelId: {},
    isModel: {
      default: true
    },
    modelReady: {
      default: false
    },
    visible: {
      default: false
    }
  },
  data() {
    // 这里存放数据
    return {
      treeData: [],
      checkIds: [],
      treeFilter: '',
      detailVisible: false,
      defaultProps: {
        children: 'children',
        label: 'name',
        isLeaf: 'leaf'
      },
      curDetailId: null,
      allElements: []
    }
  },
  watch: {
    treeFilter(v) {
      this.$refs.tree.filter(v)
    },
    modelReady() {
      this.getAllElements()
    }
  },
  created() {},
  // 方法集合
  methods: {
    //刷新
    async getData() {
      if (!this.modelId) return
      let res = await axios.post(`/bim-storage/model/getModelTree`, { modelId: this.modelId, id: 0 })
      this.treeData = res?.data?.data || []
      this.checkIds = this.treeData.map(t => t.id)
    },
    async getAllElements() {
      return
      let localModelAllElements = await localForage.getItem('allEleObj').then(res => res)
      this.allElements = JSON.parse(localModelAllElements).allEleAry
    },
    async change(data, { checkedKeys }) {
      let eleAry = this.getEleAry(data)
      checkedKeys.includes(data.id)
        ? bimfishModeloApp.setElementsVisible(eleAry, true)
        : bimfishModeloApp.setElementsVisible(eleAry, false)
      this.$emit('changeBox', data, eleAry, checkedKeys.includes(data.id))
    },
    async loadNode(node, resolve) {
      let param = {}
      if (!node.level) {
        param = { modelId: this.modelId, id: 0 }
      } else {
        param = { id: node.data.id, type: node.data.type }
      }
      let res = await axios.post(`/bim-storage/model/getModelTree`, param)
      let data = res?.data?.data || []
      if (!node.level) {
        data.forEach(d => {
          d.name = decodeURI(decodeURIComponent(d.name))
        })
        this.treeData = data
        this.checkIds = data.map(t => t.id)
        return
      }
      if (node.level === 5) {
        data.forEach(d => {
          d.leaf = true
        })
      }
      return resolve(data) || []
    },
    async treeClick(data) {
      let eleAry = this.getEleAry(data)
      bimfishModeloApp.pickElement(eleAry)
    },
    getEleAry(data) {
      let typeObj = {
        file: 'modelId',
        level: 'levelId',
        category: 'categoryId',
        family: 'familyId',
        type: 'typeId'
      }
      let eleAry = []
      let allElements = window.allEleAry
      if (data.type === 'element') {
        eleAry = [data.id]
      } else {
        allElements.forEach(e => {
          if (e[typeObj[data.type]] === data.id) eleAry.push(e.id)
        })
      }
      return eleAry
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    showDetail(data) {
      if (this.detailVisible && this.curDetailId === data.id) {
        this.detailVisible = false
        return
      }
      this.curDetailId = data.id
      this.detailVisible = true
    },
    closeDetail() {
      this.curDetailId = null
      this.detailVisible = false
    }
  }
}
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.container {
  position: relative;
  height: 100%;

  .content {
    height: 100%;
    .tree-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid #e3dfdf;
      .close {
        cursor: pointer;
      }
    }
    .filter {
      padding: 0 10px;
      margin-bottom: 4px;
    }
    .tree-scroll {
      height: calc(100% - 50px);
      overflow: auto;
      &.isModel {
        .tree {
          background: #f6f6f6;
        }
      }
    }
  }
  .bim-detail {
    position: absolute;
    width: 300px;
    height: 100%;
    background: #f6f6f6;
    border-left: 1px solid #bbb8b8;
    left: 300px;
    top: 0;
    z-index: 2;
  }
  .custom-tree-node {
    display: flex;
    width: 99%;
    justify-content: space-between;
    overflow: hidden;
    .name {
      width: calc(100% - 40px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .detail {
      display: inline-block;
      width: 20px;
      height: 20px;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABsUlEQVRYR+2XsU7DMBCGL3EysSEY2JgYGBiQmFjSgTegXRnYYHWv6kS3KI6rzgy8QMs7AAMTEkJI8AgMgNiY0tTIKK5SKuI4aRtVakbnzv7u9/l8tqDiz0qv7/v+NiHEA4ATEy4hxF2r1epInyAIOpZlvSDiIM8cEwCMsT4AHAHAUx5nZZMGYIyJZLyRB2IM0Ov1tqIoeovjuNZut29NANK2CYCMvg4AWogxgO/7HiHkBhEnVDEFkQAyCELIWR6IuQFIFZMtzVRirgBSPR3E3AF0EAsByILQAoRheCGEkLXh3w8Ra+pnEATvsg5kmHvpkzZzgG63uxPH8WUWsG3b55TSV2mjBTA9hqb2CwdgjB0i4r0CrQLgt1CparsC0CqQqmSm+SXtB4jY+HtZGW1BGIZ7w+FwvcjqjuN8NZvN51IARRbO8lG35SoJl0cBzvlBFEVrRXLBdd1vSulDqSSs/BgWiXx1CpZTAc75xmg0+ij7MMmKXr09bNvepJR+TnRESeN4BQDHAPA46+RL5tsHgGtEPJ1qSOQA53xXCFHXNaFF4eQbkhDSV/3glAJFJy7j9wMd9qMw/JAKAgAAAABJRU5ErkJggg==)
        no-repeat center;
      background-size: cover;
      margin-right: 10px;
    }
  }
}
</style>
