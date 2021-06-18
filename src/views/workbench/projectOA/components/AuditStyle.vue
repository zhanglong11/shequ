<template>
  <div class="container">
    <!-- 工具栏 start -->
    <div class="tooltips">
      <el-form inline>
        <el-form-item>
          <el-input
            v-model="filterForm.name"
            style="width: 200px"
            placeholder="审批样式名称"
            suffix-icon="el-icon-search"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="filterForm.creatorName"
            style="width: 150px"
            placeholder="创建人"
            suffix-icon="el-icon-search"
          />
        </el-form-item>
        <el-form-item label="使用表单">
          <el-select v-model="filterForm.formFlag" @change="changeFormFlag()">
            <el-option
              v-for="(item, index) of formTypeList"
              :key="'ft' + index"
              :value="item.value"
              :label="item.label"
            ></el-option
          ></el-select>
        </el-form-item>
        <el-form-item label="表单名称">
          <el-select v-model="filterForm.formId" @change="refresh()">
            <el-option value="" label="全部"></el-option>
            <el-option
              v-for="(item, index) of formList"
              :key="'fl' + index"
              :value="item.id"
              :label="item.name"
            ></el-option
          ></el-select>
        </el-form-item>
        <el-form-item label="使用状态">
          <el-select v-model="filterForm.flag" @change="refresh()">
            <el-option
              v-for="(item, index) of useStatusList"
              :key="'us' + index"
              :value="item.value"
              :label="item.label"
            ></el-option
          ></el-select>
        </el-form-item>
        <el-form-item label="创建时间">
          <DateRange :startTime.sync="filterForm.createTimeBegin" :endTime.sync="filterForm.createTimeEnd"></DateRange>
        </el-form-item>
        <el-form-item>
          <el-button-group>
            <el-button type="primary" icon="el-icon-search" @click="refresh()">搜索</el-button>
            <el-button icon="el-icon-refresh-left" @click="reset()">重置</el-button>
          </el-button-group>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin-bottom: 10px">
      <el-button v-if="$hasPower('AddFormStyle')" type="primary" icon="el-icon-plus" @click="toAddStyle(true)"
        >新建审批样式</el-button
      >
    </div>
    <!-- 工具栏 end -->
    <Grid ref="table" :request="request" :filter-form.sync="filterForm" :showOverflow="false">
      <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="审批样式名称" width="180" show-overflow>
        <template #default="{ row }">
          <a href="javascript:;" @click="toEditStyle(row.id)">{{ row.name }}</a>
          <!-- <el-button type="text" @click="() => {}">{{ row.name }}</el-button> -->
        </template>
      </vxe-table-column>
      <vxe-table-column field="count" title="使用次数" width="120"></vxe-table-column>
      <vxe-table-column field="formListArr" title="使用表单" min-width="150">
        <template #default="{ row }">
          <div style="line-height: 1.5" v-html="row.formList && row.formList.join('<br/>')"></div>
        </template>
      </vxe-table-column>
      <vxe-table-column field="template" title="摘要" min-width="250">
        <template #default="{ row }">
          <div style="line-height: 1.5" v-html="templateFormat(row)"></div>
        </template>
      </vxe-table-column>
      <vxe-table-column field="creatorName" title="发起人" width="120"></vxe-table-column>
      <vxe-table-column field="createTime" title="发起时间" width="200">
        <template #default="{ row }">
          <span><i class="el-icon-time" style="color: #2b7bff; margin-right: 3px"></i>{{ row.createTime }}</span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="status" title="状态" width="120" fixed="right">
        <template #default="{ row }">
          <p>
            <el-button v-if="$hasPower('EditFormStyle')" type="text" @click="toEditStyle(row.id)">修改</el-button>
            <template v-if="$hasPower('DisableFormStyle')">
              <el-button v-if="row.flag === 0" type="text" @click="handleStopStart(row, true)">禁用</el-button>
              <el-button v-else style="color: #f00" type="text" @click="handleStopStart(row)">启用</el-button>
            </template>
          </p>
        </template>
      </vxe-table-column>
    </Grid>
    <AddAuditStyle v-if="addVisible" :id="rowId" :visible.sync="addVisible" @submit="handleSubmit"></AddAuditStyle>
  </div>
</template>

<script>
import Api from '../api'
import statusList from '../lib/statusList'
import AddAuditStyle from './AddAuditStyle'
export default {
  name: 'AuditStyle',
  components: { AddAuditStyle },
  data() {
    return {
      projectId: localStorage.getItem('projectId'),
      statusList,
      formTypeList: [
        { value: '', label: '全部' },
        { value: 1, label: '自定义表单' },
        { value: 2, label: '固定表单' }
      ],
      formList: [],
      useStatusList: [
        { value: '', label: '全部' },
        { value: 0, label: '未禁用' },
        { value: 1, label: '已禁用' }
      ],
      addVisible: false, // 添加弹窗
      rowId: '', // 点击的行id
      filterForm: {
        // 查询条件
        name: '',
        formFlag: '',
        formId: '',
        flag: '',
        createTimeBegin: '',
        createTimeEnd: ''
      },
      request(body) {
        body.projectId = this.projectId
        return Api.getAuditStyleList(body)
      },
      formItemHash: {
        flag: '单选框',
        remark: '多行文本',
        uploadFile: '文件上传',
        uploadImage: '图片上传',
        areaSelect: '省/市/区选择',
        contacts: '人员选择',
        company: '公司选择',
        companyDepartments: '公司及部门选择',
        table: '自定义表格',
        grid: '栅格布局',
        report: '表格布局',
        tabs: '标签页',
        divider: '分割线',
        input: '单行文本',
        textarea: '多行文本',
        number: '计数器',
        radio: '单选框',
        checkbox: '多选框',
        time: '时间选择器',
        date: '日期选择器',
        rate: '评分',
        color: '颜色选择器',
        select: '下拉选择框',
        switch: '开关',
        text: '文本',
        slider: '滑块',
        imgupload: '图片上传',
        fileupload: '文件'
      }
    }
  },
  watch: {
    'filterForm.formFlag'() {
      this.getFormList()
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  created() {
    this.getFormList()
  },
  mounted() {},
  // 方法集合
  methods: {
    // 改变使用表单
    changeFormFlag() {
      this.filterForm.formId = ''
      this.refresh()
    },
    async getFormList() {
      const params = {
        flag: this.filterForm.formFlag
      }
      const res = await Api.getFormList(params)
      this.formList = res.data.records
    },
    templateFormat(row) {
      const templateJson = JSON.parse(row.template)
      const strArr = templateJson.list.map(item => {
        const flag = item.rules.some(ruleItem => ruleItem.required === true)
        const type = item.type === 'custom' ? item.el : item.type
        return `${flag ? '必填' : '非必填'}：${item.name}：${this.formItemHash[type]}`
      })
      return strArr.join('<br/>')
    },
    // 刷新数据
    refresh() {
      this.$refs.table.refresh()
    },
    // 重置搜索
    reset() {
      this.$refs.table.reset()
    },
    // 新建审批样式
    toAddStyle() {
      this.addVisible = true
      this.rowId = ''
    },
    // 修改审批样式
    toEditStyle(id) {
      this.addVisible = true
      this.rowId = id
    },
    // 停用/启用
    async handleStopStart(row, willStop = false) {
      const res = await this.$confirm(`是否要${willStop ? '禁用' : '启用'}${row.name}?'`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作已取消'
        })
      })
      if (!res) return
      willStop ? await Api.toStop(row.id) : await Api.toStart(row.id)
      this.$message.success(`${willStop ? '禁用' : '启用'}成功`)
      await this.refresh()
    },
    // 新建/修改提交
    async handleSubmit(data) {
      await Api.addAuditStyle(data)
      this.addVisible = false
      await this.refresh()
    }
  }
}
</script>

<style lang="less" scoped></style>
