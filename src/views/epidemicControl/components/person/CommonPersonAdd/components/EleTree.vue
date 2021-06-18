<template>
  <div class="left">
    <div class="left-top">
      <el-input v-model="filterText" placeholder="输入关键字" suffix-icon="el-icon-search"> </el-input>
    </div>
    <div class="left-content scroll-beauty">
      <div class="tree-container">
        <el-tree
          ref="tree"
          class="tree"
          :data="treeData"
          :props="defaultProps"
          node-key="id"
          :default-expanded-keys="expandedKeys"
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
          @node-click="handleNodeClick"
        >
        </el-tree>
      </div>
    </div>
  </div>
</template>

<script>
import { treeForEach } from '@/utils'

export default {
  name: 'EleTree',
  components: {},
  props: {},
  data() {
    return {
      filterText: '',
      selectTreeId: '',
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      expandedKeys: []
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    treeData() {
      return this.$store.state.grid.communityWithRoomTreeData
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    },
    treeData: {
      immediate: true,
      handler(val) {
        const expandedKeys = []
        if (val.length) {
          treeForEach(val, item => {
            if (item.type < 3) {
              expandedKeys.push(item.id)
            }
          })
        }
        this.expandedKeys = expandedKeys
      }
    }
  },
  created() {
    if (this.treeData.length === 0) this.$store.dispatch('grid/getStructTreeData')
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    handleNodeClick(data) {
      // if (data.type !== 6) return
      this.selectTreeId = data.id
      this.$emit('update:selectTreeId', this.selectTreeId)
      this.$emit('update:selected', data)
      this.$emit('select')
    }
  }
}
</script>
<style scoped lang="less">
/deep/ .el-tree {
  .el-tree-node {
    &.is-current {
      > .el-tree-node__content {
        background-color: #3dbbee;
        color: #fff;
        .el-tree-node__expand-icon {
          &:not(.is-leaf) {
            color: #fff;
          }
        }
      }
    }
  }
}
/deep/ .el-dialog {
  .el-dialog__body {
    padding: 0;
    overflow: hidden;
  }
}

.left {
  padding: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex: 0 0 300px;
  border-right: 1px #c6c4c4 solid;
  .left-top {
    flex: 0 0 20px;
    padding: 0 20px;
  }
  .left-content {
    margin-top: 10px;
    flex: 1;
    overflow: auto;
  }
}

.tree /deep/ .el-tree-node {
  position: relative;
  padding-left: 8px;
  .el-tree-node__content {
    padding-left: 0 !important;
    z-index: 999;
    position: relative;
    &:hover {
      background-color: #96eeec;
    }
  }
}

.tree /deep/ .el-tree-node__children {
  padding-left: 16px;
}

.tree /deep/ .el-tree-node :last-child:before {
  height: 38px;
}

.tree /deep/ .el-tree > .el-tree-node:before {
  border-left: none;
}

.tree-container /deep/ .el-tree > .el-tree-node:after {
  border-top: none;
}

.tree /deep/ .el-tree-node:before {
  content: '';
  left: -4px;
  position: absolute;
  right: auto;
  border-width: 1px;
}

.tree /deep/ .el-tree-node:after {
  content: '';
  left: -10px;
  position: absolute;
  right: auto;
  border-width: 1px;
}
.tree /deep/ .el-tree-node__expand-icon.is-leaf {
  /*display: none;*/
}
.tree /deep/ .el-tree-node__expand-icon {
  padding: 0;
}
.tree /deep/ .el-tree-node:before {
  border-left: 1px dashed #b8b9bb;
  bottom: 0px;
  height: 100%;
  top: -26px;
  left: -10px;
  width: 1px;
}

.tree /deep/ .el-tree-node:after {
  border-top: 1px dashed #b8b9bb;
  height: 20px;
  top: 12px;
  width: 24px;
}
</style>
