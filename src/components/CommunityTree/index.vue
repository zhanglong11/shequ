<template>
  <div class="space-tree">
    <el-input v-model="q" placeholder="请输入" suffix-icon="el-icon-search"></el-input>
    <Tree
      v-if="treeData.length"
      class="scroll-beauty"
      :expandedKeys.sync="expandedKeys"
      :defaultSelectedKeys="[value]"
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
import { textSearch, treeFilter, treeForEach } from '@/utils'
import toFlat from '@/utils/toFlat'
export default {
  name: 'CommunityTree',
  components: { Tree },
  props: {
    value: {
      type: String,
      default: null
    },
    disabledItemMethod: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      q: '',
      visible: false,
      replaceFields: {
        key: 'id',
        title: 'name'
      },
      activeItem: null,
      expandedKeys: []
    }
  },
  computed: {
    treeData() {
      let treeData = _.clone(this.$store.state.grid.communityWithRoomTreeData)
      if (_.isFunction(this.disabledItemMethod)) {
        treeForEach(treeData, item => {
          item.disabled = this.disabledItemMethod(item)
        })
      }
      if (this.q) {
        treeData = treeFilter(treeData, item => textSearch(item.name, this.q))
      }
      return treeData
    }
  },
  watch: {
    treeData: {
      immediate: true,
      handler(val) {
        const expandedKeys = []
        if (this.q) {
          this.expandedKeys = toFlat(this.treeData).map(item => item.id)
        } else {
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
    }
  },
  created() {
    if (this.treeData.length === 0) this.refresh()
  },
  mounted() {},
  methods: {
    refresh() {
      this.$store.dispatch('grid/getStructTreeData')
    },
    handleSelect([id], { selected, node }) {
      this.$emit('input', node.dataRef.wbsCode)
      this.$emit('update:type', node.dataRef.type)
      if (selected) {
        this.$emit('change', node.dataRef)
      } else {
        this.$emit('change', null)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.space-tree {
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
