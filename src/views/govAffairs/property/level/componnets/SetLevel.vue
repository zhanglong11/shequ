<template>
  <el-dialog
    title="设置"
    :close-on-click-modal="false"
    width="800px"
    class="beauty bg-border"
    :visible="visible"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <!--<el-form-item label="评分周期" prop="term">
        <div class="common-month-picker">
          <i class="el-icon-date"></i>
          <div class="time" @click="handleOpenMonth">
            <div v-if="!selectMonthArr.length">请选择月份</div>
            <div v-else>
              <el-tag
                v-for="month in selectMonthArr"
                :key="month"
                closable
                style="margin: 0 5px"
                @close="closeTag(month)"
              >
                {{ month }}
              </el-tag>
            </div>
          </div>
          <i class="el-icon-circle-close" @click="clearSelectMonth"></i>
          <el-date-picker
            ref="monthPicker"
            v-model="monthDate"
            class="aa"
            type="month"
            value-format="yyyy-MM"
            placeholder="选择月"
            style="width: 100%"
            :picker-options="pickOpts"
            @change="changeMonth"
          >
          </el-date-picker>
        </div>
      </el-form-item>-->
      <el-form-item label="评分周期" prop="term">
        <el-select v-model="form.term" multiple placeholder="请选择评分月份" style="width: 100%">
          <el-option
            v-for="(item, index) in new Array(12).fill('')"
            :key="'term' + index + 1"
            :label="index + 1 + '月'"
            :value="index + 1"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="信用等级" prop="levels">
        <template v-if="form.levels.length">
          <div v-for="(item, index) of form.levels" :key="'ll' + index" style="margin: 5px 0">
            <div>
              <el-form-item
                :prop="`levels[${index}].name`"
                :rules="{ required: true, message: '必填', trigger: 'blur' }"
              >
                <el-input v-model="item.name" placeholder="请输入等级名称">
                  <el-button slot="append" icon="el-icon-delete" @click="deleteLevel(item, index)"></el-button>
                </el-input>
              </el-form-item>
            </div>
            <div style="display: flex">
              <div style="flex: 1">
                <el-form-item
                  :prop="`levels[${index}].startScore`"
                  :rules="{ required: true, message: '必填', trigger: 'blur' }"
                >
                  <el-input v-model="item.startScore" placeholder="请输入开始分值"></el-input>
                </el-form-item>
              </div>
              <span style="flex: 0 0 20px; text-align: center">~</span>
              <div style="flex: 1">
                <el-form-item
                  :prop="`levels[${index}].endScore`"
                  :rules="{ required: true, message: '必填', trigger: 'blur' }"
                >
                  <el-input v-model="item.endScore" placeholder="请输入结束分值"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
        </template>
        <el-form-item>
          <el-button type="text" icon="el-icon-plus" @click="handleAddItem">新增等级</el-button>
        </el-form-item>
      </el-form-item>
    </el-form>
    <footer slot="footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </footer>
  </el-dialog>
</template>

<script>
export default {
  name: 'SetLevel',
  components: {},
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    info: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      monthDate: '',
      selectMonthArr: this.info.term ? this.info.term.split(',') : [],
      pickOpts: { disabledDate: this.calcMonth },
      form: { ...this.info, term: this.info.term ? this.info.term.split(',') : [] },
      rules: {
        term: [{ required: true, message: '必选' }],
        levels: [{ required: true, message: '必填' }]
      }
    }
  },
  computed: {},
  watch: {
    selectMonthArr: {
      deep: true,
      immediate: false,
      handler(val) {
        this.form = {
          ...this.form,
          term: val.join(',')
        }
      }
    }
  },
  methods: {
    handleOpenMonth() {
      this.$refs.monthPicker.focus()
    },
    changeMonth(e) {
      this.selectMonthArr.push(e)
      this.selectMonthArr = _.orderBy(this.selectMonthArr)
    },
    clearSelectMonth() {
      this.selectMonthArr = []
    },
    calcMonth(e) {
      if (this.selectMonthArr.includes(dayjs(e).format('YYYY-MM'))) {
        return true
      } else {
        return false
      }
    },
    closeTag(e) {
      this.selectMonthArr = this.selectMonthArr.filter(item => item !== e)
    },
    handleAddItem() {
      this.form.levels.push({ name: '', startScore: '', endScore: '' })
    },
    // 关闭弹窗
    close() {
      this.$emit('update:visible', false)
    },
    async submit() {
      await this.$refs.form.validate()
      this.$emit('submit', { ...this.form, term: this.form.term.join(',') })
    },
    // 删除等级
    deleteLevel(item, i) {
      this.$confirm(`确定要删除 ${item.name} 等级?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.form.levels.splice(i, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.common-month-picker {
  width: 100%;
  min-height: 30px;
  background-color: #ffffff;
  padding: 0 12px;
  border: 1px #b3c5e9 solid;
  border-radius: 3px;
  display: flex;
  align-items: center;
  position: relative;
  .time {
    flex: 1;
    padding-left: 5px;
    font-size: 12px;
  }
  .aa {
    position: absolute;
    width: 100%;
    bottom: 0;
    height: 0;
    opacity: 0;
  }
  &:hover {
    cursor: pointer;
  }
}
</style>
