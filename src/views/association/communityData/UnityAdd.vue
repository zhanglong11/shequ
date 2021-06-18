<template>
  <el-dialog width="650px" :title="id ? '编辑活动' : '新建活动'" class="beauty" :visible="visible" @close="close">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入活动名称"></el-input>
      </el-form-item>
      <el-form-item label="活动内容" prop="content">
        <el-input v-model="form.content" type="textarea" placeholder="请输入活动内容"></el-input>
      </el-form-item>
      <el-form-item label="活动地点" prop="site">
        <el-input v-model="form.site" placeholder="请输入活动地点"></el-input>
      </el-form-item>
      <el-form-item label="活动类型" prop="type">
        <Select v-model="form.type" arg-group="activityType" has-all />
      </el-form-item>
      <el-form-item label="活动时间" prop="activityBeginTime">
        <SelectDateRange :startTime.sync="form.activityBeginTime" :endTime.sync="form.activityEndTime" />
      </el-form-item>
      <el-form-item label="报名时间" prop="applyBeginTime">
        <SelectDateRange :startTime.sync="form.applyBeginTime" :endTime.sync="form.applyEndTime" />
      </el-form-item>
      <el-form-item label="发起组织" prop="organizationId">
        <el-select v-model="form.organizationId" style="width: 100%" placeholder="请选择组织">
          <el-option v-for="item in listData" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="参与人员" prop="firstParticipant">
        <div style="position: relative">
          <TreeList v-model="form.firstParticipant" multiple :types="types" />
          <span style="position: absolute; right: -100px"
            >已选择：{{ form.firstParticipant ? form.firstParticipant.split(',').length : 0 }}人</span
          >
        </div>
      </el-form-item>
      <el-form-item label="负责人" prop="director">
        <el-input v-model="form.director" placeholder="请输入负责人"></el-input>
      </el-form-item>
      <el-form-item label="附件" prop="fileIds">
        <Upload v-model="form.fileIds" isOnlyButton multiple />
      </el-form-item>
      <el-form-item label="活动积分" prop="score">
        <!-- <el-input v-model="form.score" placeholder="请输入活动积分"></el-input> -->
        <InputNumber v-model="form.score" />
      </el-form-item>
    </el-form>
    <footer slot="footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button v-promise-btn type="primary" @click="submit">确定</el-button>
    </footer>
  </el-dialog>
</template>

<script>
// import { activityList } from '../lib/optionsList'
import TreeList from '../components/TreeList'

import Api from '../api'
export default {
  name: 'UnityAdd',
  components: { TreeList },
  props: {
    id: {
      type: String,
      default: null
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      activityList: [],
      form: {
        module: 1
      },
      rules: {
        name: [{ required: true, message: '必填' }],
        content: [{ required: true, message: '必填' }],
        site: [{ required: true, message: '必填' }],
        type: [{ required: true, message: '必选' }],
        activityBeginTime: [{ required: true, message: '必选' }],
        applyBeginTime: [{ required: true, message: '必选' }],
        description: [{ required: true, message: '必填' }],
        organizationId: [{ required: true, message: '必填' }],
        firstParticipant: [{ required: true, message: '必填' }]
      },
      listData: [],
      ListDatas: [],
      types: 1
    }
  },
  created() {
    this.getSelectList()
    if (this.id) {
      this.getDetail()
    }
  },
  mounted() {},
  methods: {
    getDetail() {
      Api.getActivityDetail(this.id).then(res => {
        this.form = res.data
      })
    },
    async submit() {
      await this.$refs.form.validate()
      if (this.id) {
        await Api.getActivityUpdate(this.form).then(res => {
          if (res.code === 200) {
            this.$message.success('修改成功')
            this.$emit('update:visible', false)
            this.$parent.refresh()
          }
        })
      } else {
        await Api.getActivityAdd(this.form).then(res => {
          if (res.code === 200) {
            this.$message.success('添加成功')
            this.$emit('update:visible', false)
            this.$parent.refresh()
          }
        })
      }
    },
    getSelectList() {
      Api.getOrganizationAll({ type: 1 }).then(res => {
        this.listData = res.data.map(item => {
          const obj = {
            value: item.id,
            label: item.name
          }
          return obj
        })
      })
    },
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.el-form {
  max-width: 478px;
}
</style>
