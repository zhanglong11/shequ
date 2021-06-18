<template>
  <a @click="download"><slot>下载</slot></a>
</template>

<script>
import { saveAs } from 'file-saver'
import { file } from '@/plugins/axios'
export default {
  name: 'DownloadByFileId',
  props: {
    fileId: {
      required: true
    },
    fileName: {}
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {
    refresh() {},
    async download() {
      const res = await file.get(`/noToken/file/commonFile/download/${this.fileId}`, {
        params: {},
        responseType: 'blob'
      })
      saveAs(res.data, this.fileName ? this.fileName : 'download')
    }
  }
}
</script>

<style scoped lang="less">
a {
  font-size: 14px;
}
</style>
