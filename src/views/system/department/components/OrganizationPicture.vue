<template>
  <div>
    <org-chart :tree="departmentList[0]" />
  </div>
</template>

<script>
import Api from '@/api/system/department'
import OrgChart from '../../user/components/org-chart'
import treeForEach from '@/utils/treeForEach'
export default {
  name: 'OrganizationPicture',
  components: { OrgChart },
  data() {
    // 这里存放数据
    return {
      departmentList: [{}]
    }
  },
  created() {
    Api.getDepartment([]).then(res => {
      const datas = res.data
      treeForEach(datas, e => {
        e.label = e.name
        e.value = e.id
        e.children = e.children || []
      })
      this.departmentList = datas
    })
  },
  // 方法集合
  methods: {}
}
</script>
<style lang="less" scoped></style>
