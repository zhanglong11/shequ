<template>
  <div class="img-container">
    <div v-for="(item, index) of fileList" :key="'ii' + index" class="img-item">
      <el-image
        :style="{ width: width + 'px', height: height + 'px' }"
        :src="item.fileUrl"
        :preview-src-list="srcList"
      ></el-image>
      <el-tooltip v-if="showName" class="item" effect="dark" :content="item.fileName" placement="bottom">
        <p>{{ item.fileName }}</p>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import { getFileUrlByIds } from '@/api/file'
export default {
  name: 'ImgList',
  props: {
    fileIds: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 80
    },
    height: {
      type: Number,
      default: 80
    },
    showName: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fileList: []
    }
  },
  computed: {
    srcList() {
      return this.fileList.map(item => item.fileUrl)
    }
  },
  watch: {
    fileIds: {
      deep: true,
      immediate: true,
      async handler() {
        if (!this.fileIds.length) return
        const arr = this.fileIds.split(',')
        const list = await getFileUrlByIds(arr)
        this.fileList = list.data || []
      }
    }
  },
  created() {},
  methods: {}
}
</script>

<style scoped lang="less">
.img-container {
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  .img-item {
    max-width: 120px;
    text-align: center;
    margin-left: 10px;
    border: 1px #c3c3c3 solid;
    padding: 8px;
    border-radius: 10px;
    box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.3);
    p {
      font-size: 12px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      margin-bottom: 0;
      line-height: 1.4;
    }
    &:first-child {
      margin-left: 0;
    }
  }
  /deep/ .el-image {
    padding: 5px;
  }
}
</style>
