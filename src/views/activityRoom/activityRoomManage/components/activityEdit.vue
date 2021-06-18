<!--
 * @Description: 新增修改活动室
 * @Version: 1.0
 * @Autor: zongguosheng
 * @Date: 2021-04-14 09:56:07
 * @LastEditors: zongguosheng
 * @LastEditTime: 2021-05-11 08:44:03
-->
<template>
  <el-dialog width="650px" :title="title" class="beauty" :visible="visible" @close="close">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="活动室照片" prop="roomImages" required>
        <UploadImage v-model="form.roomImages" :multiple="true" :limit="15" />
      </el-form-item>
      <el-form-item label="活动室名称" prop="name" required>
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="活动室位置" prop="location" required>
        <el-input v-model="form.location"></el-input>
      </el-form-item>
      <el-form-item label="开放时间" required>
        <el-form-item prop="closeWeek">
          <el-checkbox-group v-model="form.closeWeek" size="medium">
            <el-checkbox-button v-for="week in weeks" :key="week.value" :label="week.value" :value="week.value">
              {{ week.label }}
            </el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <div class="time-select">
          <el-form-item prop="openTime" required>
            <el-time-picker
              v-model="form.openTime"
              is-range
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
              value-format="HH:mm"
              format="HH:mm"
            >
            </el-time-picker>
            <!-- <el-time-picker
              v-model="form.startTime"
              :picker-options="{}"
              value-format="HH:mm"
              format="HH:mm"
              placeholder="任意时间点"
            >
            </el-time-picker> -->
            <!-- <el-time-select
              v-model="form.startTime"
              placeholder="起始时间"
              range-separator
              :picker-options="{
                start: '00:00',
                step: '00:15',
                end: '23:59'
              }"
            >
            </el-time-select> -->
          </el-form-item>
          <!-- <span class="line">-</span>
          <el-form-item prop="endTime" required>
            <el-time-picker v-model="form.endTime" value-format="HH:mm" format="HH:mm" placeholder="任意时间点">
            </el-time-picker>
            <el-time-select
              v-model="form.endTime"
              placeholder="结束时间"
              :picker-options="{
                start: '00:00',
                step: '00:15',
                end: '23:59',
                minTime: form.startTime
              }"
            >
            </el-time-select>
          </el-form-item> -->
        </div>
      </el-form-item>
      <el-form-item label="可预约人数" prop="appointmentCount" required>
        <el-input v-model="form.appointmentCount"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="负责人" prop="principal">
        <el-input v-model="form.principal"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="form.phone" :maxlength="11"></el-input>
      </el-form-item>
    </el-form>
    <footer slot="footer">
      <el-button v-promise-btn type="primary" @click="submit()">确定</el-button>
      <el-button @click="$emit('update:visible', false)">取消</el-button>
    </footer>
  </el-dialog>
</template>

<script>
import anyRule from '@/lib/anyRule.js'
import { weeks } from '../lib/weeks'
export default {
  name: 'ActivityEdit',
  props: {
    title: {
      type: String,
      default: ''
    },
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
      weeks: weeks,
      startTime: '',
      endTime: '',
      form: { ...this.info },
      rules: {
        name: [{ required: true, message: '输入活动室名称' }],
        location: [{ required: true, message: '输入活动室位置' }],
        closeWeek: [{ required: true, message: '请选择' }],
        appointmentCount: [
          { required: true, message: '输入可预约人数' },
          { pattern: anyRule.intNumber, message: '请输入正确人数', trigger: 'blur' }
        ],
        openTime: [{ required: true, message: '必选' }],
        startTime: [{ required: true, message: '必选' }],
        endTime: [{ required: true, message: '必选' }],
        roomImages: [{ required: true, message: '请上传活动室照片' }]
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    if (!_.isEmpty(this.info.id)) {
      console.log(!_.isEmpty(this.info.id))
      this.gettime()
    }
  },
  methods: {
    // 获取详情
    // 获取活动室信息
    async gettime() {
      console.log('closeWeeks', this.form.closeWeek)
      const weekGroup = _.map(this.form.closeWeek.split(','), _.parseInt) || ''
      console.log(weekGroup)
      // const opentime = this.form.openTime.split('-')
      const opentime = this.form.openTime.split('-')
      console.log('111', opentime)
      // this.$set(this.form, 'startTime', opentime[0])
      this.$set(this.form, 'openTime', opentime)
      this.$set(this.form, 'closeWeek', weekGroup)
    },
    // 新增活动室
    async submit() {
      console.log(this.form)
      await this.$refs.form.validate()
      console.log(this.form.openTime)
      this.form.openTime = this.form.openTime.join('-')
      this.form.closeWeek = _.join(this.form.closeWeek, ',')
      this.form.roomImages = _.join(this.form.roomImages, ',')
      console.log(this.form)
      this.$emit('submit', this.form)
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
.time-select {
  display: flex;
  flex-direction: row;
  width: 100%;
  .el-date-editor.el-input {
    width: 241px;
  }
  .el-form-item--small.el-form-item {
    margin-bottom: 0;
  }
  /deep/ .el-form-item__content {
    display: flex;
    flex-direction: row;
    margin-left: 0;
  }
}
.el-date-editor--timerange.el-input__inner {
  width: 510px;
}
.line {
  color: #bdbdbd;
  margin: 0 10px;
}
</style>
