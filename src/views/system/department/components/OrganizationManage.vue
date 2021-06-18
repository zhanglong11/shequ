<template>
  <div>
    <div class="tooltips">
      <div>
        <el-button v-if="$hasPower('SystemDepartmentAdd')" type="primary" @click="dialogFormVisible = true"
          ><i class="el-icon-plus" />添加部门</el-button
        >
      </div>
      <div>
        <el-button
          v-if="$hasPower('SystemDepartmentDelete')"
          type="primary"
          plain
          :disabled="!selectedLength"
          @click="() => handleDelete()"
          >删除选中部门({{ selectedLength }})</el-button
        >
        <el-button
          v-if="$hasPower('SystemDepartmentEdit')"
          type="primary"
          :disabled="!selectedLength"
          @click="handleMultipleEdit"
          >编辑选中部门({{ selectedLength }})</el-button
        >
      </div>
    </div>
    <div style="height: calc(100vh - 300px)">
      <vxe-table
        ref="xTable"
        resizable
        :border="false"
        :tree-config="{ children: 'children', expandAll: true, reserve: true }"
        row-id="id"
        :data="tableData"
        :checkbox-config="{
          checkMethod,
          checkStrictly: false,
          labelField: 'name',
          highlight: false,
          showHeader: false
        }"
        max-height="100%"
        @checkbox-change="selectChangeEvent"
      >
        <!--<vxe-table-column
          type="checkbox"
          title="部门名称"
          width="280"
          align="left"
          tree-node
        />-->
        <vxe-table-column title="部门名称" width="280" align="left" type="checkbox" tree-node>
          <template slot-scope="{ row }">
            <template v-if="row.isRoot">{{ row.name }}</template>
            <template v-else
              ><vxe-checkbox @change="({ checked, $event }) => handleCheckBoxChange(row, checked, $event)" />{{
                row.name
              }}</template
            >
          </template>
        </vxe-table-column>
        <vxe-table-column field="userNum" title="成员数" />
        <vxe-table-column field="principalName" title="主管" />
        <vxe-table-column field="date" title="编辑">
          <template slot-scope="{ row }">
            <span v-if="$hasPower('SystemDepartmentEdits')"><a @click="handleEditRow(row)">编辑</a></span>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <FormDialog v-if="dialogFormVisible" :visible.sync="dialogFormVisible" @submit="handleAddSubmit" />
    <FormEditDialog
      v-if="dialogEditFormVisible"
      :form-info="selectRow"
      :visible.sync="dialogEditFormVisible"
      @submit="handleEditSubmit"
    />
    <FormEditManyDialog
      v-if="dialogEditManyFormVisible"
      :form-info="selectRows"
      :visible.sync="dialogEditManyFormVisible"
      @submit="handleEditManySubmit"
    />
  </div>
</template>

<script>
import FormDialog from './FormDialog'
import FormEditDialog from './FormEditDialog'
import FormEditManyDialog from './FormEditManyDialog'
import Api from '@/api/system/department'
import treeForEach from '@/utils/treeForEach'
export default {
  name: 'OrganizationManage',
  components: {
    FormDialog,
    FormEditDialog,
    FormEditManyDialog
  },
  data() {
    // 这里存放数据
    return {
      dialogFormVisible: false,
      dialogEditFormVisible: false,
      dialogEditManyFormVisible: false,
      tableData: [],
      selectRows: [],
      selectRow: {}
    }
  },
  computed: {
    selectedLength() {
      return this.selectRows.length
    }
  },
  created() {
    this.getTableData()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {
    checkMethod(e) {
      return !e.row.isRoot
    },
    async getTableData() {
      const res = await Api.getDepartment([])
      const datas = res.data
      treeForEach(datas, e => {
        if (!e.parentId || e.parentId === '0') {
          e.isRoot = true
          e.checked = e.isRoot
          e.disabled = true
        }
      })
      this.tableData = datas
      console.log(1111, datas)
      await this.$refs.xTable.setAllTreeExpand(true)
      this.selectRows = []
    },
    selectChangeEvent({ records }) {
      this.selectRows = [...records]
      console.info(`勾选${records.length}个树形节点`, records)
    },
    async handleCheckBoxChange(row, checked, $event) {
      if (checked) {
        this.selectRows.push(row)
      } else {
        this.selectRows = this.selectRows.filter(item => item._XID !== row._XID)
      }
    },
    // 添加部门
    async handleAddSubmit(data) {
      await Api.addDepartment(data)
      this.dialogFormVisible = false
      await this.getTableData()
    },
    // 编辑一个
    async handleEditSubmit(data) {
      await Api.editOneDepartment(data)
      this.dialogEditFormVisible = false
      await this.getTableData()
    },
    // 编辑多个部门
    async handleEditManySubmit(data) {
      await Api.editMoreDepartment(data)
      this.dialogEditManyFormVisible = false
      await this.getTableData()
    },
    handleEditRow(row) {
      this.dialogEditFormVisible = true
      this.selectRow = Object.assign({}, row)
    },
    async handleDelete(id) {
      let deleteId
      await this.$confirm('此操作将删除所选部门吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      if (id) {
        deleteId = id
      } else {
        deleteId = this.selectRows.map(item => item.id)
      }
      await Api.deleteDepartment(deleteId)
      this.$message.success('删除成功')
      await this.getTableData()
    },
    handleMultipleEdit() {
      if (this.selectedLength === 1) {
        this.dialogEditFormVisible = true
        this.selectRow = this.selectRows[0]
      } else {
        this.dialogEditManyFormVisible = true
      }
    }
  }
}
</script>
<style lang="less" scoped></style>
