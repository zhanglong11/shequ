<template>
  <div class="container">
    <el-tabs v-model="activeName" @tab-click="handleClick(activeName)">
      <el-tab-pane v-if="$hasPower('FormMange')" label="表单管理" name="first">
        <FormMessage></FormMessage>
      </el-tab-pane>
      <el-tab-pane label="我发起的" name="second" lazy><CreatedByMe></CreatedByMe></el-tab-pane>
      <el-tab-pane
        :label="`待审批${countData.taskCount > 0 ? '（ ' + countData.taskCount + ' ）' : ''}`"
        name="third"
        lazy
        ><ToBeAuditedByMe></ToBeAuditedByMe
      ></el-tab-pane>
      <el-tab-pane label="已审批" name="fourth" lazy><AuditedByMe></AuditedByMe></el-tab-pane>
      <el-tab-pane
        :label="`抄送给我的${countData.ccCount > 0 ? '（ ' + countData.ccCount + ' ）' : ''}`"
        name="five"
        lazy
        ><CopyToMe></CopyToMe
      ></el-tab-pane>
      <el-tab-pane v-if="$hasPower('FormStyle')" label="审批样式库" name="six" lazy
        ><AuditStyle></AuditStyle
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Api from '../api'
import FormMessage from '../components/FormMessage'
import CreatedByMe from '../components/CreatedByMe' // 我发起的
import ToBeAuditedByMe from '../components/ToBeAuditedByMe' // 待审批
import AuditedByMe from '../components/AuditedByMe' // 已审批
import CopyToMe from '../components/CopyToMe' // 抄送给我
import AuditStyle from '../components/AuditStyle' // 审批样式库
export default {
  name: 'ProjectOAHome',
  components: { FormMessage, CreatedByMe, ToBeAuditedByMe, AuditedByMe, CopyToMe, AuditStyle },
  data() {
    return {
      activeName: this.$route.query.tabIndex || 'first',
      countData: {
        taskCount: 0,
        ccCount: 0
      }
    }
  },
  mounted() {
    this.queryOrganizationTree()
    this.getFormCount()
  },
  methods: {
    // 企业组织架构树
    async queryOrganizationTree() {
      const result = await Api.queryOrganizationTree()
      const datas = result.data
      const list = []

      const formatDataArray = array => {
        array.forEach(e => {
          if (e.children && e.children.length > 0) {
            if (e.organType === 1) {
              list.push(e)
            }
            formatDataArray(e.children)
          }
        })
      }
      formatDataArray(datas)
      const formatArray = array => {
        array.forEach(e => {
          e.name = e.dataName
          e.type = e.organType === 2 ? 2 : null
          e.targetId = e.dataUnicode
          e.label = e.dataName
          e.value = e.dataUnicode
          e.userId = e.dataUnicode
          if (e.children) {
            formatArray(e.children)
          }
        })
      }
      formatArray(list)
      this.$store.commit('setOrganizationTree', list)
    },
    // 表单统计
    async getFormCount() {
      const result = await Api.getFormCount()
      const datas = result.data
      this.countData = {
        taskCount: datas.taskCount > 99 ? '99+' : datas.taskCount,
        ccCount: datas.ccCount > 99 ? '99+' : datas.ccCount
      }
    },
    handleClick(activeName) {
      const title = document.title
      history.pushState({ title }, title, `${location.href.split('?')[0]}?tabIndex=${activeName}`)
      this.$route.query.tabIndex = activeName
    }
  }
}
</script>

<style scoped></style>
