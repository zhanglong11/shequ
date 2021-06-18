<template>
  <el-dialog :title="title" width="500px" class="beauty bg-border" :visible="visible" @close="close">
    <div>
      <el-tree
        :data="treeData"
        :props="defaultProps"
        default-expand-all
        :expand-on-click-node="false"
        @node-click="handleSelect"
      >
        <span slot-scope="{ node }" class="custom-tree-node">
          <span class="folder"></span>
          <span style="margin-left: 5px">{{ node.label }}</span>
        </span>
      </el-tree>
    </div>
    <footer slot="footer">
      <el-button @click="close">取消</el-button>
      <el-button v-promise-btn type="primary" @click="submit">确定</el-button>
    </footer>
  </el-dialog>
</template>

<script>
import Api from '../../api'
export default {
  name: 'LevelTreeDialog',
  components: {},
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false
    },
    title: {
      type: String,
      default: '移动到'
    },
    defaultProps: {
      type: Object,
      default: () => {
        return {
          children: 'children',
          label: 'name'
        }
      }
    },
    documentAttribution: {
      type: String,
      default: ''
    },
    wbsCode: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      treeData: [],
      selectItemId: ''
    }
  },
  created() {
    this.getTreeData()
  },
  methods: {
    // 获取文件树形结构
    async getTreeData() {
      const res = await Api.doc.getLevelTreeDate({
        documentAttribution: this.documentAttribution,
        wbsCodeList: this.wbsCode
      })
      this.treeData = [{ id: 0, name: '全部', children: res.data || [] }]
    },
    handleSelect(data, node) {
      this.selectItemId = data.id
    },
    // 关闭弹窗
    close() {
      this.$emit('update:visible', false)
    },
    async submit() {
      if (this.selectItemId === '') {
        this.$message.info(`请选择要${this.title}的文件夹`)
        return false
      }
      this.$emit('submit', this.selectItemId)
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .el-tree {
  .el-tree-node {
    &.is-current {
      > .el-tree-node__content {
        background-color: #fcddda;
        color: #000;
        .el-tree-node__expand-icon {
          &:not(.is-leaf) {
            color: #000;
          }
        }
      }
    }
  }
  .custom-tree-node {
    display: flex;
    align-items: center;
    .folder {
      display: flex;
      width: 16px;
      height: 16px;
      background: url('~@/assets/file-img/folder.png') center center no-repeat;
      background-size: cover;
    }
  }
}
</style>
