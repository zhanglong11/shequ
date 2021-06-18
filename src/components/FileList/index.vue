<template>
  <div class="file-list">
    <ul v-if="list.length > 0">
      <li v-for="(item, index) in list" :key="index" class="fileItem">
        <span>{{ item.fileName }}</span>
        <PreviewByFileId v-if="isPreview" :fileId="item.id" />
        <DownloadByFileId v-if="isDownload" :file-id="item.id" :file-name="item.fileName" />
      </li>
    </ul>
    <ul v-else>
      <li>无附件</li>
    </ul>
  </div>
</template>

<script>
import { getFileUrlByIds } from '@/api/file'
export default {
  name: 'FileList',
  props: {
    // 文件id集合
    ids: {},
    isPreview: {
      type: Boolean,
      default: true
    },
    isDownload: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      list: []
    }
  },
  watch: {
    ids: {
      handler: function (n, e) {
        if (n) {
          this.getFileList()
        }
      },
      immediate: true
    }
  },
  methods: {
    async getFileList() {
      const arr = this.ids ? this.ids.split(',') : []
      const res = await getFileUrlByIds(arr)
      this.list = res.data
    }
  }
}
</script>

<style lang="less" scoped>
.fileItem {
  padding-bottom: 4px;
  > span {
    margin-right: 10px;
  }
}
</style>
