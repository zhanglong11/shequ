<template>
  <div>
    <el-tree
      ref="tree"
      :data="computedData"
      :show-checkbox="showCheckbox"
      node-key="id"
      default-expand-all
      :props="treeProps"
      :expand-on-click-node="false"
      check-on-click-node
      class="custom-tree"
      @check="handleCheck"
    >
      <template #default="{ node, data: nodeData }">
        <span :id="data.id">
          {{ node.label || nodeData.serviceName }}
        </span>
      </template>
    </el-tree>
  </div>
</template>

<script>
import treeForEach from '@/utils/treeForEach'

export default {
  name: 'TreeCard',
  props: {
    // 当前数据
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    showCheckbox: {
      type: Boolean,
      default: true
    },
    // 已分配的权限
    powerListRole: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 不返回父级权限
    noParent: {
      type: Boolean,
      default: false
    }
  },
  data() {
    // 这里存放数据
    return {
      treeProps: {
        label: 'powerName'
      }
    }
  },
  computed: {
    computedData() {
      return [
        {
          id: 'root',
          powerName: '全部',
          children: this.data
        }
      ]
    }
  },
  watch: {
    async data() {
      this.calculateCheckedNodes()
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.calculateCheckedNodes()
  },
  // 方法集合
  methods: {
    handleCheck(node, { checkedKeys, halfCheckedKeys, checkedNodes, halfCheckedNodes }) {
      const currentCheckedKeys = [...checkedKeys, ...halfCheckedKeys].filter(key => key !== 'root')
      const addedPowerKeys = _.difference(currentCheckedKeys, this.powerListRole)
      const removedPowerKeys = _.difference(this.powerListRole, currentCheckedKeys)
      this.$emit('change', {
        addedPowerKeys,
        removedPowerKeys,
        currentCheckedKeys,
        currentCheckedNodes: [...checkedNodes, ...halfCheckedNodes].filter(item => item.id !== 'root')
      })
      this.formatTree()
    },
    calculateCheckedNodes() {
      const powerKeyHash = _.keyBy(this.powerListRole)
      treeForEach(this.computedData, item => {
        if (powerKeyHash[item.id] && _.size(item.children)) {
          delete powerKeyHash[item.id]
        }
      })
      console.log(powerKeyHash)
      this.$refs.tree.setCheckedKeys(_.values(powerKeyHash))
      this.formatTree()
    },

    // 处理无数据的子树
    formatTree() {
      this.$nextTick(() => {
        const dom = document.getElementsByClassName('el-tree-node__children')
        for (let i = 0; i < dom.length; i++) {
          const item = dom[i]
          if (!item.textContent) {
            let classList = item.parentNode.getAttribute('class')
            const parentClassList = item.parentNode.parentNode.getAttribute('class')
            classList += ' no-children'
            if (parentClassList !== 'el-tree custom-tree') {
              item.parentNode.className = classList
            }
          }
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
/deep/ .el-tree > div.el-tree-node {
  margin-top: 15px;
}
/deep/.custom-tree {
  .el-tree-node__expand-icon {
    display: none;
  }
  .el-tree-node__content {
    padding-left: 15px !important;
    background: none !important;
  }
  .el-tree-node__children {
    padding: 0 15px 0px;
  }
  .el-tree-node {
    margin: 10px 0;
    padding: 0;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid #ebeef5;
    border-radius: 4px;
    white-space: normal;
    .el-tree-node__content {
      padding: 10px 0;
      height: 40px;
      background: #fafafa !important;
      border-bottom: 1px #ebebeb solid;
    }
  }
  .no-children + .el-tree-node {
    margin-top: 10px;
  }
  .no-children {
    margin: 0;
    border: 0;
    box-shadow: none;
    padding: 5px 0 0 0;
    white-space: normal;
    .el-tree-node__label {
      font-size: 12px;
    }
    &.el-tree-node {
      display: inline-block;
      width: 20%;
      margin: 0;
      border: 0;
      box-shadow: none;
      .el-tree-node__content {
        padding: 0;
        height: 26px;
        background: none !important;
        border: 0;
      }
    }
    .el-tree-node__children {
      padding: 0;
    }
  }
}
</style>
<style lang="less" scoped>
//@import url(); 引入公共css类
.children-card {
  margin-top: 20px;
  /deep/.el-card__header {
    padding: 10px 20px;
    font-size: 14px;
    font-weight: bold;
  }
  .no-children {
    /deep/.el-card__header {
      background: #fafafa;
      font-weight: normal;
      font-size: 13px;
    }
    /deep/.el-checkbox {
      font-size: 13px;
    }
  }
  /deep/.el-card__body {
    padding-top: 0;
  }
  /deep/.el-checkbox {
    margin: 20px 0 0;
    width: 25%;
  }
}
</style>
