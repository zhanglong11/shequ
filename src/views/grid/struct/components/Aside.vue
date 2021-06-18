<template>
  <div class="aside">
    <el-input v-model="q" placeholder="请输入网格名称" suffix-icon="el-icon-search"></el-input>
    <el-button
      v-if="$hasPower('GridStructCreate')"
      style="width: 100%; margin-top: 10px"
      icon="el-icon-plus"
      type="primary"
      @click="handleAdd"
    >
      新增网格
    </el-button>
    <Tree
      v-if="treeData.length"
      class="scroll-beauty"
      draggable
      :defaultSelectedKeys="[value]"
      defaultExpandAll
      :show-icon="false"
      :replace-fields="replaceFields"
      show-line
      :treeData="treeData"
      @drop="onDrop"
      @select="handleSelect"
    >
    </Tree>
  </div>
</template>

<script>
import { Tree } from 'ant-design-vue'
import { changeOrganizationSort } from '@/api/grid/department'
import { textSearch, treeFilter } from '@/utils'
export default {
  name: 'Aside',
  components: { Tree },
  props: {
    value: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      q: '',
      replaceFields: {
        key: 'id',
        title: 'name'
      }
    }
  },
  computed: {
    treeData() {
      let treeData = _.cloneDeep(this.$store.state.grid.structTreeData)
      if (treeData[0]) treeData[0].disabled = true
      if (this.q) {
        treeData = treeFilter(treeData, item => textSearch(item.name, this.q))
      }
      return treeData
    }
  },
  created() {
    this.refresh()
  },
  mounted() {},
  methods: {
    refresh() {
      this.$store.dispatch('grid/getStructTreeData')
    },
    handleSelect([id], { selected, node }) {
      this.$emit('input', id)
      if (selected) {
        this.$emit('change', node)
      }
    },
    handleAdd() {
      this.$emit('input', null)
    },
    async onDrop({ dragNode, node, dropPosition, dropToGap }) {
      if (dropToGap) {
        const parent = node.$parent.dataRef
        if (!parent) return false
        const targetSort = +_.last(node.pos.split('-'))
        const prevIndex = dropPosition > targetSort ? dropPosition - 1 : dropPosition
        const parentId = parent.id
        const prevSort = parent.children[prevIndex]?.sort ?? 0
        await changeOrganizationSort({
          id: dragNode.dataRef.id,
          lastSort: prevSort,
          parentId
        })
      } else {
        const parent = node.dataRef
        await changeOrganizationSort({
          id: dragNode.dataRef.id,
          lastSort: 0,
          parentId: parent.id
        })
      }
      this.$message.success('排序成功')
      this.refresh()
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.aside {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  .ant-tree {
    flex: 1;
    overflow: auto;
    margin-top: 7px;
    > li:first-child {
      padding-top: 0;
    }
    > list:last-child {
      padding-bottom: 0;
    }
  }
}
</style>
