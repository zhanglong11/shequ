<template>
  <div>
    <el-dialog
      width="600px"
      :title="form.id ? '编辑投票' : '发起投票'"
      class="beauty"
      :visible="visible"
      @close="close"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="投票主题：" prop="voteTheme">
          <el-input v-model="form.voteTheme" type="textarea" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="投票选项：">
          <template v-if="form.optionList">
            <div v-for="(item, index) in form.optionList" :key="index" style="margin: 5px 0">
              <div class="input-delete">
                <el-form-item
                  :prop="'optionList.' + index + '.optionName'"
                  :rules="{ required: true, message: '必填', trigger: 'blur' }"
                  style="width: 95%"
                >
                  <el-input v-model="item.optionName" placeholder="请输入"></el-input>
                </el-form-item>
                <i class="el-icon-remove" @click="handelDelete(index)"></i>
              </div>
            </div>
          </template>
          <el-form-item>
            <el-button type="text" icon="el-icon-plus" @click="handleAddItem">新增选项</el-button>
          </el-form-item>
        </el-form-item>
        <el-form-item label="允许多选：" prop="multiple">
          <el-switch v-model="form.multiple" :active-value="1" :inactive-value="0" />
        </el-form-item>
        <el-form-item label="截止时间：" prop="voteEndTime">
          <el-date-picker v-model="form.voteEndTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="匿名投票：" prop="anonymity">
          <el-switch v-model="form.anonymity" :active-value="1" :inactive-value="0" />
        </el-form-item>
      </el-form>
      <footer slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button v-promise-btn type="primary" @click="submit">确定</el-button>
      </footer>
    </el-dialog>
  </div>
</template>
<script>
import Api from '../api'
export default {
  name: 'BaginAdd',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    id: String
  },
  data() {
    return {
      form: {
        optionList: [{ optionName: '' }]
      },
      rules: {
        voteTheme: [{ required: true, message: '必选' }],
        multiple: [{ required: true, message: '必选' }],
        // optionList: [{ required: true, message: '必添' }],
        voteEndTime: [{ required: true, message: '必选' }],
        anonymity: [{ required: true, message: '必选' }]
      }
    }
  },
  watch: {},
  created() {
    if (this.id) {
      Api.getinformVoteDetail(this.id).then(res => {
        // this.form = res.data || {}
        // this.form.optionList = res.data.resultList
        this.form = { ...res.data, optionList: res.data.resultList } || {}
      })
    }
  },
  methods: {
    async submit() {
      await this.$refs.form.validate()
      const form = _.cloneDeep(this.form)
      if (this.form.optionList.length <= 1) {
        return this.$message.info('至少添加两个选项')
      }
      form.optionList = form.optionList.map(e => e.optionName)
      form.voteEndTime = dayjs(form.voteEndTime).format('YYYY-MM-DD HH:mm:00')

      if (this.id) {
        await Api.getinformUpdate({ ...form })
      } else {
        await Api.getinformVoteAdd({ ...form })
      }
      this.$message.success('操作成功')
      this.$emit('update:visible', false)
      this.$parent.refresh()
    },
    // 校验开始值
    validateStart(rule, value, callback, index) {
      console.log(value)
      const a = index > 0 ? this.form.optionList[index - 1].optionName : ''
      if (value === '') {
        callback(new Error('请输入选项'))
      } else if (value === a) {
        callback(new Error('输入选项内容重复'))
      }
    },
    // 新增
    handleAddItem() {
      this.form.optionList.push({
        optionName: ''
      })
    },
    // 移除
    handelDelete(index) {
      this.form.optionList.splice(index, 1)
    },
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style scoped lang="scss">
@import '~@/styles/variables.scss';
.input-delete {
  display: flex;
  justify-content: space-between;
  .el-icon-remove {
    font-size: 18px;
    display: inline-block;
    margin-top: 8px;
    cursor: pointer;
  }
}
</style>
