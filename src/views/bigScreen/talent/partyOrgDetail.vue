<template>
  <div class="container">
    <div class="goBack" @click="goBack">
      <img src="../images/goBack.png" alt="" />
      <div>返回</div>
    </div>
    <Grid
      ref="partyOrgDetailTable"
      style="margin-top: 50px"
      :request="partyOrgDetailList"
      :isPagination="true"
      height="100%"
    >
      <vxe-table-column show-overflow title="姓名" field="name" />
      <vxe-table-column show-overflow title="性别" field="sex">
        <template #default="{ row }">
          <div v-if="row.sex == 1">男</div>
          <div v-else-if="row.sex == 2">女</div>
          <div v-else>未知</div>
        </template>
      </vxe-table-column>
      <vxe-table-column show-overflow title="身份证号" field="identityCardNumber" />
      <vxe-table-column show-overflow title="联系电话" field="phone" />
    </Grid>
  </div>
</template>
<script>
import Api from '../api/talent'
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      partyOrgDetailList: body => Api.getPersonByPartyOrganizational({ ...body, id: this.id })
    }
  },
  created() {},
  methods: {
    goBack() {
      this.$emit('goBack')
    }
  }
}
</script>
<style scoped lang="scss">
.goBack {
  width: 50px;
  position: absolute;
  right: 20px;
  top: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: #ff5544;
}
</style>
