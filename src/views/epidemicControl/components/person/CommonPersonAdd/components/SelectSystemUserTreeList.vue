<template>
  <el-dialog :title="title" width="800px" class="beauty bg-border" :visible="visible" @close="close">
    <div class="content">
      <div class="left">
        <div class="left-top">
          <h4>选择</h4>
          <el-input v-model="filterText" placeholder="输入关键字" suffix-icon="el-icon-search"> </el-input>
        </div>
        <div class="left-content scroll-beauty">
          <div class="tree-container">
            <el-tree
              ref="tree"
              default-expand-all
              class="tree"
              :data="treeData"
              :props="defaultProps"
              show-checkbox
              node-key="id"
              :default-expanded-keys="expandedKeys"
              :expand-on-click-node="false"
              :filter-node-method="filterNode"
              @check="handleCheck"
            >
              <span slot-scope="{ node, data }" class="custom-tree-node">
                <i v-if="data.organType !== 2" class="el-icon-folder" />
                <i v-else class="el-icon-s-custom" />
                <span style="margin-left: 5px">{{ node.label }}</span>
              </span>
            </el-tree>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="right-top">
          <h4>已选{{ checkedUser.length }}个</h4>
        </div>
        <div class="right-content scroll-beauty">
          <div class="list-container">
            <div v-for="(item, index) of checkedUser" :key="'cu' + index" class="item">
              <span>{{ item.dataName }}</span>
              <span class="del"><i class="el-icon-delete-solid" style="color: red" @click="deleteUser(item)"></i></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer slot="footer">
      <el-button @click="close">取消</el-button>
      <el-button v-promise-btn type="primary" @click="submit">确定</el-button>
    </footer>
  </el-dialog>
</template>

<script>
// import treeMap from '@/utils/treeMap'
import { getOrganizationTree } from '@/api/system/user'
export default {
  name: 'SelectSystemUserTreeList',
  components: {},
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: '选择'
    }
  },
  data() {
    return {
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'dataName'
      },
      expandedKeys: [],
      treeData: [],
      checkedNode: []
    }
  },
  computed: {
    checkedUser() {
      return this.checkedNode.filter(item => item.organType === 2)
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.refresh()
  },
  methods: {
    async refresh() {
      const res = await getOrganizationTree()
      this.treeData = res.data || []
    },
    filterNode(value, data) {
      if (!value) return true
      return data.dataName.indexOf(value) !== -1
    },
    handleCheck(node, data) {
      this.checkedNode = data.checkedNodes
    },
    deleteUser(data) {
      this.checkedNode = this.checkedNode.filter(item => item.id !== data.id)
      this.$refs.tree.setChecked(data.id, false)
    },
    // 关闭弹窗
    close() {
      this.$emit('update:visible', false)
    },
    async submit() {
      if (!this.checkedUser.length) {
        this.$message.info('请最少选择一个')
        return false
      }
      this.$emit('submit', this.checkedUser)
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
.content {
  padding: 10px;
  display: flex;
  max-height: calc(90vh - 150px);
  overflow: hidden;
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
      overflow: hidden;
      .tree-container {
        overflow: auto;
        height: 100%;
      }
    }
  }
  .right {
    padding: 10px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .right {
    flex: 1;
    margin-left: 10px;
    overflow: hidden;
    .right-top {
      flex: 0 0 20px;
      .form-item {
        width: 120px;
      }
    }
    .right-content {
      margin-top: 10px;
      flex: 1;
      overflow: hidden;
      .list-container {
        overflow: auto;
        height: 100%;
        .item {
          line-height: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
  }
}
</style>
