<template>
  <div>
    <el-dialog width="600px" :title="filterForm.id ? '编辑' : '添加'" class="beauty" :visible="visible" @close="close">
      <el-form ref="filterForm" :model="filterForm" :rules="rules" label-width="100px">
        <el-form-item label="问题类型：" prop="type">
          <Select v-model="filterForm.type" :options="statusList" has-all />
        </el-form-item>
        <el-form-item label="是否必填：" prop="must">
          <el-radio v-model="filterForm.must" :label="1">是</el-radio>
          <el-radio v-model="filterForm.must" :label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="题目：" prop="topic">
          <el-input v-model="filterForm.topic" placeholder="请输入" />
        </el-form-item>
        <div v-if="filterForm.type !== 2">
          <el-form-item label="问题选项：">
            <template v-if="filterForm.optionList" required>
              <div v-for="(item, index) of filterForm.optionList" :key="'op' + index" style="margin: 5px 0">
                <div class="input-delete">
                  <el-form-item
                    :prop="'optionList.' + index + '.option'"
                    :rules="[{ required: true, message: '必填', trigger: 'blur' }]"
                    style="width: 85%"
                  >
                    <el-input v-model="item.option" placeholder="请输入"></el-input>
                  </el-form-item>
                  <i class="el-icon-remove" @click="handelDelete(index)"></i>
                </div>
              </div>
            </template>
            <el-form-item>
              <el-button type="text" icon="el-icon-plus" @click="handleAddItem">新增选项</el-button>
            </el-form-item>
          </el-form-item>
        </div>
      </el-form>
      <footer slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button v-promise-btn type="primary" @click="submit">确定</el-button>
      </footer>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'AddSelect',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    id: String,
    itemList: {
      type: Object
    }
  },
  data() {
    return {
      filterForm: {
        optionList: []
      },
      rules: {
        type: [{ required: true, message: '必选' }],
        must: [{ required: true, message: '必选' }],
        topic: [{ required: true, message: '必选' }]
        // optionList: [{ required: true, message: '必填' }]
      },
      statusList: [
        { value: 0, label: '单选' },
        { value: 1, label: '多选' },
        { value: 2, label: '简答' }
      ]
    }
  },
  created() {
    if (this.itemList) {
      console.log(this.itemList)
      this.filterForm = _.cloneDeep({ ...this.itemList })
    }
  },
  methods: {
    async submit() {
      await this.$refs.filterForm.validate()
      if (this.filterForm.optionList.length <= 1 && this.filterForm.type !== 2) {
        return this.$message.info('至少添加两个选项')
      }
      // this.filterForm.optionList = this.filterForm.optionList.map(e => e.option)

      if (this.filterForm.id) {
        this.$emit('setChange', this.filterForm)
      } else {
        this.$emit('change', this.filterForm)
      }
      this.close()
    },
    // 校验开始值
    validateStart(rule, value, callback, index) {
      const a = index > 0 ? this.filterForm.optionList[index - 1].option : ''
      if (!value) {
        callback(new Error('请输入选项'))
      } else if (value === a) {
        callback(new Error('输入选项内容重复'))
      }
    },
    handleAddItem() {
      this.filterForm.optionList.push({ option: '' })
    },
    // 移除
    handelDelete(index) {
      this.filterForm.optionList.splice(index, 1)
    },
    close() {
      this.filterForm = {}
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
