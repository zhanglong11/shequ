<template>
  <span class="multiple-opt">
    <span class="count"
      >已选择 <strong style="margin: 0 3px">{{ selectRowIds.length }}</strong
      >个文件</span
    >
    <span v-if="hasMultipleDownload" class="download" @click="$emit('download')"
      ><i class="el-icon-download"></i>批量下载</span
    >
    <span v-if="hasMultipleDelete" class="delete" @click="$emit('delete')">
      <i class="el-icon-delete"></i>批量删除</span
    >
    <span class="more">
      <el-dropdown @command="handleMoreOpt">
        <span class="el-dropdown-link">
          <i class="el-icon-more"></i>下拉菜单<i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-if="hasMultipleMove" command="move">移动到...</el-dropdown-item>
          <el-dropdown-item v-if="hasMultipleCopy" command="copy">复制到...</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </span>
  </span>
</template>

<script>
export default {
  name: 'MultipleOpt',
  components: {},
  props: {
    selectRowIds: {
      type: Array,
      default: () => []
    },
    hasMultipleDownload: {
      type: Boolean,
      default: true
    },
    hasMultipleDelete: {
      type: Boolean,
      default: true
    },
    hasMultipleMove: {
      type: Boolean,
      default: true
    },
    hasMultipleCopy: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  methods: {
    // 多选下拉选项
    handleMoreOpt(e) {
      this.$emit(e)
    }
  }
}
</script>

<style scoped lang="less">
.multiple-opt {
  flex: 1;
  margin-left: 10px;
  display: flex;
  align-items: center;
  span {
    margin: 0 5px;
    &:hover {
      cursor: pointer;
    }
    &.download {
      color: #4b9cff;
    }
    &.more {
      /deep/ .el-dropdown {
        color: #4b9cff;
      }
    }
    &.delete {
      color: #f00;
    }
  }
}
</style>
