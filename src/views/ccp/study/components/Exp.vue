<template>
  <div class="container">
    <div class="tooltips">
      <el-form ref="contentForm" inline>
        <el-form-item>
          <el-input v-model="q" placeholder="姓名/内容"></el-input>
        </el-form-item>
        <el-form-item style="margin-right: 30px">
          <el-button type="primary" icon="el-icon-search">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-if="computedList.length > 0">
      <div v-for="(item, index) in computedList" :key="index" class="main-desc">
        <div class="item">
          <span class="el-icon-user"></span>
          <span v-html="item.realName"></span>
          <span style="margin-left: 15px">{{ item.createTime | ymdhm }}</span>
        </div>
        <p v-html="item.summarize"></p>
        <p>
          <el-form-item label="附件" label-width="100">
            <FileList :ids="item.fileIds"></FileList>
          </el-form-item>
        </p>
      </div>
    </div>
    <div v-else>
      <p style="text-align: center; margin-top: 10%; font-size: 16px">-暂无数据-</p>
    </div>
  </div>
</template>

<script>
import { summarizeList } from '@/api/ccp/member'
import Fuse from 'fuse.js'
import { highlight } from '@/utils/fuseHighlight'

export default {
  name: 'Exp',
  components: {},
  props: {
    studyId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      q: '',
      list: [],
      fuse: null
    }
  },
  computed: {
    computedList() {
      if (!this.q) {
        return this.list
      } else {
        return highlight(this.fuse.search(this.q))
      }
    }
  },
  created() {
    this.refresh()
  },
  methods: {
    refresh() {
      summarizeList({ studyId: this.studyId }).then(res => {
        this.list = res.data
        this.fuse = new Fuse(this.list, {
          keys: ['summarize', 'realName'],
          threshold: '0.7',
          includeMatches: true
        })
      })
    },
    reset() {
      this.q = ''
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.main-desc {
  &:not(:last-child) {
    border-bottom: 1px solid #eee;
  }
  padding: 10px 0;
  .el-icon-user {
    width: 25px;
    height: 25px;
  }
}
</style>
