<template>
  <div class="aside">
    <el-input v-model="q" placeholder="请输入党组织名称" suffix-icon="el-icon-search"></el-input>
    <el-button
      v-if="edit && $hasPower('CcpDepartmentCreate')"
      style="width: 100%; margin-top: 10px"
      icon="el-icon-plus"
      type="primary"
      @click="handleAdd"
      >新增</el-button
    >
    <Tree
      v-if="treeData.length"
      defaultExpandAll
      :show-icon="false"
      :replace-fields="replaceFields"
      :expandedKeys.sync="expandedKeys"
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
import toFlat from '@/utils/toFlat'
export default {
  name: 'Aside',
  components: { Tree },
  props: {
    edit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      q: '',
      replaceFields: {
        key: 'id',
        value: 'id'
      },
      expandedKeys: []
    }
  },
  computed: {
    treeData() {
      let treeData = _.cloneDeep(this.$store.state.ccp.structTreeData)
      if (treeData[0]) treeData[0].disabled = this.edit
      if (this.q) {
        treeData = treeFilter(treeData, item => textSearch(item.title, this.q))
      }
      return treeData
    }
  },
  watch: {
    treeData: {
      immediate: true,
      handler() {
        if (this.q) {
          this.expandedKeys = toFlat(this.treeData).map(item => item.id)
        } else {
          this.expandedKeys = [this.treeData[0]?.id]
        }
      }
    }
  },
  created() {
    if (this.treeData.length === 0) {
      this.$store.dispatch('ccp/getStructTreeData')
    }
  },
  mounted() {},
  methods: {
    handleSelect([id]) {
      this.$emit('change', id)
    },
    handleAdd() {
      this.$emit('change', null)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
</style>
