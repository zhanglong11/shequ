<template>
  <Grid :request="request" auto-resize>
    <vxe-table-column title="姓名" field="realName"></vxe-table-column>
    <vxe-table-column title="性别" field="sex" formatter="sex"></vxe-table-column>
    <vxe-table-column title="手机号" field="mobile"></vxe-table-column>
    <vxe-table-column title="身份证号" field="identityCardNumber"></vxe-table-column>
    <vxe-table-column title="学习时间" field="learningTime"></vxe-table-column>
    <vxe-table-column title="本次学习时长" field="duration"> </vxe-table-column>
  </Grid>
</template>

<script>
import { studyRecordList } from '@/api/ccp/member'

export default {
  name: 'Logs',
  components: {},
  props: {
    studyId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      request: body => studyRecordList({ ...body, studyId: this.studyId })
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
</style>
