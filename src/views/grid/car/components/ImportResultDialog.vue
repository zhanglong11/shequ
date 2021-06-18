<template>
  <el-dialog title="导入结果" width="500px" class="beauty bg-border" :visible="visible" @close="close">
    <div class="body-wrapper">
      <p>
        导入成功 <strong> {{ info.successNum }}</strong
        >条数据!
      </p>
      <p v-if="info.failNum" style="color: #f00">
        导入失败<strong> {{ info.failNum }}</strong
        >条数据!
        <a class="download" @click="download">下载导入失败数据</a>
      </p>
    </div>
    <footer slot="footer">
      <!-- <el-button @click="close">取消</el-button>-->
      <el-button v-promise-btn type="primary" @click="submit">确定</el-button>
    </footer>
  </el-dialog>
</template>

<script>
import XLSX from 'xlsx'
export default {
  name: 'ImportResultDialog',
  components: {},
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false
    },
    info: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  computed: {
    excelJson() {
      return this.info.errorList.map(item => _.values(item)) || []
    }
  },
  methods: {
    downloadExl(json, type = 'xlsx', saveAs, s2ab) {
      // 这里的数据是用来定义导出的格式类型
      const wopts = {
        bookType: type,
        bookSST: false,
        type: 'binary'
      }
      const wb = {
        SheetNames: ['Sheet1'],
        Sheets: {},
        Props: {}
      }
      wb.Sheets.Sheet1 = XLSX.utils.json_to_sheet(json, { skipHeader: true }) // 通过json_to_sheet转成单页(Sheet)数据
      const tmpDown = new Blob([s2ab(XLSX.write(wb, wopts))], {
        type: 'application/octet-stream'
      })
      const textName = '导入失败数据'
      saveAs(tmpDown, textName + '.' + type)
    },
    s2ab(s) {
      if (typeof ArrayBuffer !== 'undefined') {
        // 1、创建一个字节长度为s.length的内存区域
        const buf = new ArrayBuffer(s.length)
        // 2、创建一个指向buf的Unit8视图，开始于0字节，直到缓冲区的末尾
        const view = new Uint8Array(buf)
        // 3、返回指定位置的字符的Unicode编码
        for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
        return buf
      } else {
        const buf = new Array(s.length)
        for (let i = 0; i !== s.length; ++i) buf[i] = s.charCodeAt(i) & 0xff
        return buf
      }
    },
    saveAs(obj, fileName) {
      // 1、创建a标签
      const tmpa = document.createElement('a')
      tmpa.download = fileName || '下载'
      // 2、创建url指定文件，绑定a标签
      tmpa.href = URL.createObjectURL(obj)
      // 3、模拟点击实现下载
      tmpa.click()
      // 4、延时释放
      setTimeout(() => {
        // 用URL.revokeObjectURL来释放这个object URL
        URL.revokeObjectURL(obj)
      }, 100)
    },
    // 关闭弹窗
    close() {
      this.$emit('update:visible', false)
    },
    async submit() {
      this.$parent.refresh()
      this.$emit('update:visible', false)
    },
    async download() {
      this.downloadExl(this.excelJson, 'xlsx', this.saveAs, this.s2ab)
    }
  }
}
</script>

<style scoped lang="less">
.body-wrapper {
  p {
    font-size: 14px;
    strong {
      margin: 0 3px;
    }
  }
  .download {
    margin-left: 5px;
    font-size: 12px;
    /deep/ .export {
      display: inline-block;
    }
  }
}
</style>
