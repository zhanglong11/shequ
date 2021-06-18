<!--
 * @Description: 关闭
 * @Version: 1.0
 * @Autor: zongguosheng
 * @Date: 2021-04-14 09:56:07
 * @LastEditors: zongguosheng
 * @LastEditTime: 2021-05-11 13:39:04
-->
<template>
  <el-dialog width="400px" title="关闭活动室" class="beauty" :visible="visible" @close="close">
    <el-form ref="form" :model="form" :rules="rules" label-width="110px">
      <el-form-item label="关闭开始时间">
        <el-row>
          <el-form-item prop="startDay">
            <el-date-picker
              v-model="form.startDay"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              :picker-options="startDatePicker"
              @focus="reset"
            >
            </el-date-picker>
          </el-form-item>
        </el-row>
        <el-form-item prop="startTime">
          <el-time-picker
            v-model="form.startTime"
            :disabled="starttimedisabled"
            value-format="HH:mm"
            format="HH:mm"
            placeholder="选择时间"
          >
          </el-time-picker>
        </el-form-item>
      </el-form-item>
      <el-form-item label="关闭结束时间">
        <el-row>
          <el-form-item prop="endDay">
            <el-date-picker
              v-model="form.endDay"
              type="date"
              placeholder="选择日期"
              :disabled="disabled"
              value-format="yyyy-MM-dd"
              :picker-options="endDatePicker"
            >
            </el-date-picker>
          </el-form-item>
        </el-row>
        <el-form-item prop="endTime">
          <el-time-picker
            v-model="form.endTime"
            :disabled="timedisabled"
            value-format="HH:mm"
            format="HH:mm"
            :picker-options="{
              selectableRange: `${endTime ? endTime + ':00' : '00:00:00'}-23:59:00`
            }"
            placeholder="选择时间"
          >
          </el-time-picker>
        </el-form-item>
      </el-form-item>
    </el-form>
    <footer slot="footer">
      <el-button v-promise-btn type="primary" @click="submit()">确定</el-button>
      <el-button @click.stop="close()">取消</el-button>
    </footer>
  </el-dialog>
</template>

<script>
import { activityRoomApi } from '../../api/activityRoom.js'
import { weeks } from '../lib/weeks'
export default {
  name: 'CloseRoom',
  props: {
    id: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: true
    },
    info: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      disabled: false,
      starttimedisabled: false,
      timedisabled: false,
      weeks: weeks,
      startTime: '',
      endTime: '',
      form: { ...this.info },
      startDatePicker: this.beginDate(),
      endDatePicker: this.processDate(),
      rules: {
        startDay: [{ required: true, message: '必选', trigger: 'blur' }],
        startTime: [{ required: true, message: '必选', trigger: 'blur' }],
        endTime: [{ required: true, message: '必选', trigger: 'blur' }],
        endDay: [{ required: true, message: '必选', trigger: 'blur' }]
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getcloseTime(this.info)
  },
  methods: {
    // 回显关闭时间
    getcloseTime(info) {
      if (!info.startDay) {
        this.$nextTick(() => {
          console.log('over')
        })
      } else {
        console.log('this.form', this.form)
        // const startDay = info.closeBeginTime.split(' ')
        // const endDay = info.closeEndTime.split(' ')
        // const sd = startDay[0]
        // const st = startDay[1].substring(0, 5)
        // const ed = endDay[0]
        // const et = endDay[1].substring(0, 5)
        // this.$set(this.form, 'startDay', sd)
        // this.$set(this.form, 'startTime', st)
        // this.$set(this.form, 'endDay', ed)
        // this.$set(this.form, 'endTime', et)
      }
    },
    beginDate() {
      // const self = this
      return {
        disabledDate(time) {
          return time.getTime() < Date.now() - 86400000 // 开始时间不选时，结束时间最大值小于等于当天
        }
      }
    },
    // 提出结束时间必须大于提出开始时间
    processDate() {
      const self = this
      return {
        disabledDate(time) {
          if (self.form.startDay === self.form.endDay) {
            self.endTime = self.form.startTime
          } else {
            self.endTime = ''
          }
          if (self.form.startDay) {
            return (
              new Date(self.form.startDay).getTime() - 86400000 > time.getTime() ||
              time.getTime() < Date.now() - 86400000
            )
          } else {
            return time.getTime() < Date.now() - 86400000 // 开始时间不选时，结束时间最大值小于等于当天
          }
        }
      }
    },
    // 关闭
    async submit() {
      console.log(this.form)
      await this.$refs.form.validate()
      console.log(this.id)
      this.form.closeBeginTime = this.form.startDay + ' ' + this.form.startTime + ':00'
      this.form.closeEndTime = this.form.endDay + ' ' + this.form.endTime + ':00'
      console.log(this.form)
      const parpam = Object.assign(this.form, { id: this.id })
      await activityRoomApi.closeRoom(parpam)
      this.$emit('update:visible', false)
      this.$parent.refresh()
      this.$message.success('关闭成功')
    },
    reset() {
      this.form = {}
    },
    close() {
      this.$refs.form.resetFields()
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
</style>

<style lang="less" scoped>
.el-row {
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
