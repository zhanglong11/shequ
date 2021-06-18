<template>
  <div v-loading="loading" class="container">
    <div>
      <div class="tooltips">
        <el-button v-if="$hasPower('PowerAddModule')" plain type="primary" @click="handleAddModuleItem('module')">
          <i class="icon icon-module" />新建模块
        </el-button>
      </div>
      <template v-if="list.length">
        <el-card v-for="(item, index) in list" :key="item.id" :body-style="{ padding: '0' }" class="box-card">
          <div slot="header" class="box-card-header">
            <div class="header-left">
              <i class="icon icon-module-bg" /><span>
                <span v-if="item.flag === 1" class="el-icon-star-on" style="color: #00800d" />{{ item.powerName }}</span
              ><i class="el-icon-edit-outline" @click="handleUpdateModuleItem('module', item)" /><i
                class="el-icon-delete"
                @click="handleDeleteModuleItem('module', item.id)"
              />
            </div>
            <div>
              <el-button
                v-if="$hasPower('PowerModuleUp')"
                type="primary"
                plain
                :disabled="index === 0"
                @click="swap(item.id, list[index - 1].id)"
                >上移</el-button
              >
              <el-button
                v-if="$hasPower('PowerModuleDown')"
                type="primary"
                plain
                :disabled="list.length === index + 1"
                @click="swap(item.id, list[index + 1].id)"
              >
                下移
              </el-button>
              <el-button type="primary" @click="handleAddModuleItem('menu', item)">新建一级菜单</el-button>
            </div>
          </div>
          <div class="card-body">
            <div v-if="!(item && item.children && item.children.length)" class="empty-tip">暂无数据</div>

            <el-table
              v-else
              :data="item.children"
              style="width: 100%; margin-bottom: 20px"
              row-key="id"
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
              class="header-fff"
            >
              <el-table-column label="菜单名称" min-width="100">
                <template slot-scope="scope">
                  <!-- <div class="menuText-wrapper">
                    <i class="fa" :class="{'fa-server':scope.row.children&&scope.row.children.length}" />
                    {{ scope.row.powerName }}
                  </div> -->
                  <div class="menuText-wrapper" @click.ctrl="$copyText(`$hasPower('${scope.row.powerKey}')`)">
                    <!-- <i class="fa" :class="{'fa-server':scope.row.children&&scope.row.children.length}" /> -->
                    <span v-if="scope.row.flag === 1" class="el-icon-star-on" style="color: #00800d" />
                    {{ scope.row.powerName }}
                  </div>
                </template></el-table-column
              >
              <el-table-column label="功能" min-width="200">
                <template slot-scope="scope">
                  <el-tag
                    v-for="tagItem in scope.row.tagList"
                    :key="tagItem.id"
                    closable
                    size="medium"
                    @click.ctrl="$copyText(`$hasPower('${tagItem.powerKey}')`)"
                  >
                    <span v-if="scope.row.flag === 1" class="el-icon-star-on" style="color: #00800d" />
                    <span>{{ tagItem.powerName }}</span
                    ><i class="el-icon-edit-outline" @click="handleUpdateModuleItem('tag', tagItem, scope.row)" /><i
                      class="el-icon-delete"
                      @click="handleDeleteModuleItem('tag', tagItem.id)"
                    />
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" min-width="100" header-align="center" align="right">
                <template slot-scope="scope">
                  <template v-if="scope.row.parent">
                    <el-button
                      v-if="$hasPower('PowerModuleUp')"
                      type="text"
                      :disabled="scope.row.index === 0"
                      @click="swap(scope.row.id, scope.row.parent.children[scope.row.index - 1].id)"
                    >
                      上移
                    </el-button>
                    <el-button
                      v-if="$hasPower('PowerModuleDown')"
                      type="text"
                      :disabled="scope.row.parent.children.length === scope.row.index + 1"
                      @click="swap(scope.row.id, scope.row.parent.children[scope.row.index + 1].id)"
                    >
                      下移
                    </el-button>
                  </template>
                  <el-button
                    v-if="$hasPower('PowerModuleAdd')"
                    size="mini"
                    type="text"
                    @click="handleAddModuleItem('submenu', scope.row)"
                    >添加菜单</el-button
                  >
                  <el-button
                    v-if="$hasPower('PowerModuleEdit')"
                    size="mini"
                    type="text"
                    @click="handleUpdateModuleItem('menu', scope.row)"
                    >编辑菜单</el-button
                  >
                  <el-button
                    v-if="$hasPower('PowerModuleDelete')"
                    size="mini"
                    type="text"
                    @click="handleDeleteModuleItem('menu', scope.row.id)"
                    >删除菜单</el-button
                  >
                  <el-button
                    v-if="!(scope.row.children && scope.row.children.length)"
                    size="mini"
                    type="text"
                    @click="handleAddModuleItem('tag', scope.row)"
                    >添加功能</el-button
                  >
                </template></el-table-column
              >
            </el-table>
          </div>
        </el-card>
      </template>
      <div v-else class="empty-tip">暂无数据</div>
    </div>
    <!-- 新增、编辑模块/菜单功能 开始 -->
    <el-dialog
      :title="dialogModuleTitle"
      :visible.sync="dialogModuleVisible"
      :close-on-click-modal="false"
      width="500px"
      @close="handleInitDialog"
    >
      <el-form ref="moduleForm" :model="moduleForm" label-width="100px" :rules="moduleRules">
        <el-form-item v-if="moduleForm.type !== 1" :label="moduleForm.parentLabel">
          <el-input v-model.trim="moduleForm.parentName" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item :label="moduleForm.powerLabel" prop="powerName">
          <el-input
            v-if="moduleForm.type === 1"
            v-model.trim="moduleForm.powerName"
            :maxlength="50"
            autocomplete="off"
            placeholder="请输入模块名称"
          />
          <el-input
            v-if="moduleForm.type === 2"
            v-model.trim="moduleForm.powerName"
            :maxlength="50"
            autocomplete="off"
            placeholder="请输入菜单名称"
          />
          <el-input
            v-if="moduleForm.type === 3"
            v-model.trim="moduleForm.powerName"
            :maxlength="50"
            autocomplete="off"
            placeholder="请输入功能名称"
          />
        </el-form-item>
        <el-form-item label="权限key：" prop="powerKey">
          <el-input v-model="moduleForm.powerKey" :maxlength="50" autocomplete="off" placeholder="请输入权限key" />
        </el-form-item>
        <el-form-item label="URL：" prop="url">
          <el-input v-model.trim="moduleForm.url" :maxlength="50" autocomplete="off" placeholder="请输入URL" />
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="moduleForm.remark" :maxlength="50" autocomplete="off" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="moduleBtnLoading" @click="handleSubmit">确 定</el-button>
        <el-button @click="dialogModuleVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 新增、编辑模块/菜单功能 end -->
  </div>
</template>

<script>
import { changeSort, createPower, getPowerListAll, removePowerById, updatePower } from '@/api/system/power'
import { toTree, treeForEach } from '@/utils'

export default {
  name: 'Power',
  data() {
    return {
      // 新建/编辑功能模块
      dialogModuleVisible: false,
      dialogModuleTitle: '',
      moduleForm: {
        powerLabel: '',
        powerName: '',
        powerKey: '',
        url: '',
        remark: '',
        id: '',
        flag: '1',
        parentId: 'main',
        parentName: '',
        parentLabel: '',
        type: 1
      },
      moduleRules: {
        powerName: [
          {
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }
        ],
        powerKey: [
          {
            required: true,
            message: '请输入权限key',
            trigger: 'blur'
          }
        ]
      },

      moduleBtnLoading: false,
      loading: false,
      list: [],
      listQuery: {
        powerName: ''
      }
    }
  },
  mounted() {
    this.refresh()
  },

  methods: {
    async refresh() {
      this.loading = true
      const result = await getPowerListAll(this.listQuery).finally(() => {
        this.loading = false
      })
      const datas = result.data || []
      const list = datas.length > 0 ? datas[0].children : []
      this.handleFormatterServiceData(list)
    },
    /**
     * 格式化列表数据--在返回的数据中，操作权限项和子菜单都被包含在children属性中，默认会把权限项渲染为子菜单
     * 通过type来区分权限项(type==1)和子菜单（type==2）
     * **/
    handleFormatterServiceData(data = []) {
      data = toTree(data, 'parentId', 'sort')
      const formatterData = []
      for (const item of data) {
        const formatterItem = this.handleFilterDataByType(item)
        formatterData.push(formatterItem)
      }
      treeForEach(formatterData, (e, parent, index) => {
        e.parent = parent
        e.index = index
      })
      this.list = [...formatterData]
    },
    handleFilterDataByType(data) {
      if (data.children) {
        const children = [...data.children]
        data.children = []
        data.tagList = []
        children.forEach(item => {
          this.$set(item, 'parentName', data.powerName)
          if (item.type === 3) {
            data.tagList.push(item)
          } else {
            data.children.push(item)
          }
        })
        for (const subitem of data.children) {
          this.handleFilterDataByType(subitem)
        }
      }
      return data
    },

    // 新建服务模块/一级菜单项/功能
    handleAddModuleItem(type, data = {}) {
      // ok
      this.dialogModuleVisible = true
      switch (type) {
        case 'module':
          this.dialogModuleTitle = '新建模块'
          this.moduleForm.type = 1
          this.moduleForm.parentId = 'main'
          this.moduleForm.parentName = ''
          this.moduleForm.powerLabel = '模块名称：'
          this.moduleForm.parentLabel = ''
          break
        case 'menu':
          this.dialogModuleTitle = '新建一级菜单'
          this.moduleForm.type = 2
          this.moduleForm.parentId = data.id
          this.moduleForm.parentName = data.powerName
          this.moduleForm.powerLabel = '菜单名称：'
          this.moduleForm.parentLabel = '所属模块：'
          break
        case 'tag':
          this.dialogModuleTitle = '新建功能'
          this.moduleForm.type = 3
          this.moduleForm.parentId = data.id
          this.moduleForm.parentName = data.powerName
          this.moduleForm.powerLabel = '功能名称：'
          this.moduleForm.parentLabel = '所属菜单：'
          break
        default:
          this.dialogModuleTitle = '新建子菜单'
          this.moduleForm.type = 2
          this.moduleForm.parentId = data.id
          this.moduleForm.parentName = data.powerName
          this.moduleForm.powerLabel = '菜单名称：'
          this.moduleForm.parentLabel = '上次菜单：'
          break
      }
    },
    // 编辑服务模块
    handleUpdateModuleItem(type, data) {
      // ok
      this.dialogModuleVisible = true
      let parentLabel, powerLabel, parentName
      if (type === 'module') {
        this.dialogModuleTitle = '编辑模块'
        parentLabel = ''
        powerLabel = '模块名称：'
      } else if (type === 'menu') {
        this.dialogModuleTitle = '编辑菜单'
        powerLabel = '菜单名称：'
        parentLabel = '所属父级：'
        parentName = data.parentName
      } else if (type === 'tag') {
        this.dialogModuleTitle = '编辑功能'
        parentLabel = '所属菜单：'
        powerLabel = '功能名称：'
        parentName = data.parentName
      }

      this.moduleForm = {
        powerName: data.powerName,
        powerKey: data.powerKey,
        url: data.url,
        remark: data.remark,
        id: data.id,
        flag: String(data.flag),
        parentId: data.parentId,
        powerLabel: powerLabel,
        parentName: parentName,
        parentLabel: parentLabel,
        type: data.type
      }
    },
    // 提交服务模块信息
    async handleSubmit() {
      await this.$refs.moduleForm.validate()
      this.moduleBtnLoading = true
      if (this.moduleForm.id) {
        await updatePower(this.moduleForm).finally(() => (this.moduleBtnLoading = false))
      } else {
        await createPower(this.moduleForm).finally(() => (this.moduleBtnLoading = false))
      }
      this.refresh()
      this.moduleBtnLoading = false
      this.dialogModuleVisible = false
      this.$message({
        type: 'success',
        message: '操作成功!'
      })
    },
    // 关闭之前还原参数和验证结果
    handleInitDialog() {
      // ok
      this.$refs.moduleForm.clearValidate()
      this.moduleForm = {
        powerName: '',
        powerKey: '',
        url: '',
        remark: '',
        id: '',
        parentId: '',
        parentName: '',
        parentLabel: '',
        powerLabel: '',
        type: 1
      }
      this.dialogModuleTitle = ''
      this.moduleBtnLoading = false
    },
    // 删除特定的服务模块或菜单项
    handleDeleteModuleItem(type, id) {
      // 处理提示文本
      let tip
      const hidden = type === 'module' ? '' : 'hidden'
      if (type === 'module') {
        tip = '模块'
      } else if (type === 'menu') {
        tip = '菜单'
      } else {
        tip = '功能'
      }
      const template = `
      <div class="confirm-wrapper">
        <div class="title"><i class="icon el-icon-delete" ></i>确定要删除这个${tip}吗？</div>
        <div  class="subTitle ${hidden}">删除后，该模块下所有菜单及功能都将删除</div>
      </div>`
      this.$confirm(template, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        customClass: 'button-order'
      })
        .then(async () => {
          const result = await removePowerById(id)
          if (result.code === 200) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.refresh()
          }
        })
        .catch(() => {})
    },
    /**
     *交换顺序
     * @param idOne
     * @param idTwo
     */
    swap(idOne, idTwo) {
      changeSort({
        idOne,
        idTwo
      }).then(res => {
        this.$message.success('更改顺序成功')
        this.refresh()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
