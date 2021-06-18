<template>
  <el-dialog title="转正" width="500px" class="beauty" :visible="visible" :close-on-click-modal="false" @close="close">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="党组织名称" prop="organizationId">
        <SelectCcpDepartment v-model="form.organizationId"></SelectCcpDepartment>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <Select v-model="form.status" arg-group="ccpMemberStatus" disabled></Select>
      </el-form-item>
      <el-form-item label="党内职务" prop="post">
        <Select v-model="form.post" arg-group="ccpRole"></Select>
      </el-form-item>
      <el-form-item label="入党日期" prop="toThePartyDate">
        <el-date-picker v-model="form.toThePartyDate" value-format="yyyy-MM-dd 00:00:00"></el-date-picker>
      </el-form-item>
      <el-form-item label="转正日期" prop="becomeRegularDate">
        <el-date-picker v-model="form.becomeRegularDate" value-format="yyyy-MM-dd 00:00:00"></el-date-picker>
      </el-form-item>
      <el-form-item label="党龄" prop="partyStanding">
        <el-input disabled :value="partyStanding"></el-input>
      </el-form-item>
      <!-- <el-form-item key="changeFile" label="附件" prop="fileIds">
        <Upload v-model="form.fileIds" is-only-button></Upload>
      </el-form-item>-->
      <el-form-item label="流动状态" prop="flowStatus">
        <Select v-model="form.flowStatus" :label.sync="form.flowStatusName" arg-group="flowStatus"></Select>
      </el-form-item>
      <el-form-item
        v-if="form.flowStatusName === '流入'"
        key="in"
        label="流入地"
        prop="flowPlace"
        :rules="[{ required: true, message: '必填' }]"
      >
        <el-input v-model="form.flowPlace"></el-input>
      </el-form-item>
      <el-form-item
        v-else-if="form.flowStatusName === '流出'"
        key="out"
        label="流出地"
        prop="flowPlace"
        :rules="[{ required: true, message: '必填' }]"
      >
        <el-input v-model="form.flowPlace"></el-input>
      </el-form-item>
      <el-form-item v-else></el-form-item>
    </el-form>
    <footer slot="footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button v-promise-btn type="primary" @click="submit">确定</el-button>
    </footer>
  </el-dialog>
</template>

<script>
import _ from 'lodash'
import SelectCcpDepartment from '../../components/SelectCcpDepartment'
import { getGroupArgByArgGroup } from '@/api/system/args'
export default {
  name: 'ChangeDialog',
  components: { SelectCcpDepartment },
  props: {
    info: {
      type: Object,
      default: () => {}
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      argGroupOptions: [],
      form: {
        ...this.info,
        partyStanding: '',
        flowStatusName: '',
        flowPlace: ''
      },
      rules: {
        organizationId: [{ required: true, message: '必填' }],
        post: [{ required: true, message: '必填' }],
        flowStatus: [{ required: true, message: '必选' }],
        toThePartyDate: [{ required: true, message: '必填' }],
        becomeRegularDate: [{ required: true, message: '必填' }],
        partyStanding: [{ required: true, message: '必填' }],
        flowPlace: [{ required: true, message: '必填' }]
      }
    }
  },
  computed: {
    partyStanding() {
      if (this.form.becomeRegularDate) {
        const { years, months, days } = dayjs.duration(dayjs().diff(this.form.becomeRegularDate)).$d
        return (years ? years + '年' : '') + (months ? months + '个月' : '') + (days + '天')
      } else {
        return 'N/A'
      }
    }
  },
  watch: {
    partyStanding(val) {
      this.form.partyStanding = val
    }
  },
  created() {
    this.refresh()
  },
  mounted() {},
  methods: {
    refresh() {
      getGroupArgByArgGroup('ccpMemberStatus').then(res => {
        this.argGroupOptions = res.data.map(({ argCode: value, argText: label }) => ({ label, value }))
        this.form.status = _.find(this.argGroupOptions, item => item.label === '正式党员')?.value
      })
    },
    async submit() {
      await this.$refs.form.validate()
      this.$emit('submit', _.cloneDeep(this.form))
    },
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
</style>
