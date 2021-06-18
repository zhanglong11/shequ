<template>
  <div class="aside">
    <el-input v-model="q" placeholder="请输入网格名称" suffix-icon="el-icon-search"></el-input>
    <Tree
      v-if="treeData.length"
      class="scroll-beauty"
      :defaultSelectedKeys="[value]"
      defaultExpandAll
      :show-icon="false"
      :replace-fields="replaceFields"
      show-line
      :treeData="treeData"
      @select="handleSelect"
    >
    </Tree>
  </div>
</template>

<script>
import { Tree } from 'ant-design-vue'
import { textSearch, treeFilter } from '@/utils'
export default {
  name: 'GridTree',
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
        key: 'wbsCode',
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
    handleSelect([wbsCode], { selected, node }) {
      console.log(111, wbsCode, selected, node)
      this.$emit('input', wbsCode)
      if (selected) {
        this.$emit('change', node)
      }
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
