<template>
  <div class="no-footer">
    <div class="tooltips">
      <div class="doc-top">
        <div class="doc-level">
          <div class="doc-jump">
            <span v-for="(item, index) of docList" :key="'dl' + index">
              <span :class="{ 'blue-doc': index < docList.length - 1 }" @click="topJumpFolder(item, index)">{{
                item.name
              }}</span>
              <span
                v-if="index < docList.length - 1"
                :class="{ 'blue-gt': index < docList.length - 2 }"
                style="margin: 0 5px"
                >&gt;</span
              >
            </span>
          </div>
          <div class="top-file-opt"></div>
        </div>
        <div class="filter-opt">
          <el-form inline class="filter-form">
            <el-form-item>
              <el-input v-model="filterForm.name" placeholder="文件关键字"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button-group>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button icon="el-icon-refresh-left" @click="reset">重置</el-button>
              </el-button-group>
            </el-form-item>
            <el-form-item>
              <div class="high-search">
                <el-button type="primary" plain @click="showHighSearch = !showHighSearch">{{
                  !showHighSearch ? '高级搜索' : '收起'
                }}</el-button>
                <!-- <span @click="showHighSearch = !showHighSearch">{{ !showHighSearch ? '高级搜索' : '收起' }}</span> -->
                <div v-show="showHighSearch" class="high-search-content">
                  <el-form-item label="创建者:" label-width="80px">
                    <el-input v-model="filterForm.creatorName" class="high-search-content-item" placeholder="创建者">
                    </el-input>
                  </el-form-item>
                  <el-form-item label="创建时间:" label-width="80px">
                    <SelectDateRange
                      class="high-search-content-item"
                      style="width: 250px"
                      :startTime.sync="filterForm.startTime"
                      :endTime.sync="filterForm.endTime"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间"
                    />
                  </el-form-item>
                  <el-form-item label="扩展名:" label-width="80px">
                    <el-input
                      v-model="filterForm.fileNameSuffix"
                      class="high-search-content-item"
                      placeholder="如'doc'"
                    >
                    </el-input>
                  </el-form-item>
                  <br />
                  <el-form-item style="text-align: center; width: 100%; margin-top: -8px">
                    <el-button type="primary" size="mini" @click="handleSearch(true)">高级搜索</el-button>
                    <el-button type="primary" plain @click="reset">清空</el-button>
                  </el-form-item>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <el-dropdown v-if="hasAdd" @command="handleAddOpt">
                <el-button type="primary">
                  <i class="el-icon-plus"></i>新建<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="upload">上传本地文件</el-dropdown-item>
                  <el-dropdown-item command="add-folder">新建文件夹</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-form-item>
            <el-form-item>
              <span class="tab-icon" :class="{ active: tabType === 'list' }" @click="tabType = 'list'">
                <!-- <v-svg-icon name="ai-list"></v-svg-icon>-->
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16" viewBox="0 0 19 16">
                  <path
                    id="listIcon"
                    data-name="listIcon"
                    d="M1905,497h13a1,1,0,0,1,0,2h-13A1,1,0,0,1,1905,497Zm0,7h13a1,1,0,0,1,0,2h-13A1,1,0,0,1,1905,504Zm0,7h13a1,1,0,0,1,0,2h-13A1,1,0,0,1,1905,511Zm17-14a1,1,0,1,1-1,1A1,1,0,0,1,1922,497Zm0,7a1,1,0,1,1-1,1A1,1,0,0,1,1922,504Zm0,7a1,1,0,1,1-1,1A1,1,0,0,1,1922,511Z"
                    transform="translate(-1904 -497)"
                  />
                </svg>
              </span>
              <span class="tab-icon" :class="{ active: tabType === 'card' }" @click="tabType = 'card'">
                <!--<v-svg-icon name="caidan"></v-svg-icon>-->
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16" viewBox="0 0 19 16">
                  <path
                    id="cardIcon"
                    data-name="cardIcon"
                    d="M1965,497h6a1,1,0,0,1,1,1v5a1,1,0,0,1-1,1h-6a1,1,0,0,1-1-1v-5A1,1,0,0,1,1965,497Zm-11,0h6a1,1,0,0,1,1,1v5a1,1,0,0,1-1,1h-6a1,1,0,0,1-1-1v-5A1,1,0,0,1,1954,497Zm11,9h6a1,1,0,0,1,1,1v5a1,1,0,0,1-1,1h-6a1,1,0,0,1-1-1v-5A1,1,0,0,1,1965,506Zm-11,0h6a1,1,0,0,1,1,1v5a1,1,0,0,1-1,1h-6a1,1,0,0,1-1-1v-5A1,1,0,0,1,1954,506Z"
                    transform="translate(-1953 -497)"
                  />
                </svg>
              </span>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <template v-if="tabType === 'list'">
      <vxe-table
        ref="xTable"
        :data="fileList"
        row-id="id"
        :checkbox-config="{ trigger: 'cell', checkRowKeys: selectRowIds }"
        @checkbox-change="handleCheck"
        @checkbox-all="handleCheckAll"
      >
        <vxe-table-column type="checkbox" :resizable="false" width="30" align="left"> </vxe-table-column>
        <vxe-table-column title="文件名" min-width="200" align="left">
          <template #default="{ row }">
            <span class="row-name">
              <span class="file-icon" :class="{ isFolder: !!row.isFolder, [row.suffix]: true }"></span>
              <span @click="handleFolderClick(row)">{{ row.name }}</span>
            </span>
          </template>
          <template #header="{}">
            <div class="checkbox-header">
              <span class="name">文件名</span>
              <MultipleOpt
                v-if="selectRowIds.length"
                :selectRowIds="selectRowIds"
                :hasMultipleDownload="hasMultipleDownload"
                :hasMultipleDelete="hasMultipleDelete"
                :hasMultipleMove="hasMultipleMove"
                :hasMultipleCopy="hasMultipleCopy"
                @move="handleMultipleMove"
                @copy="handleMultipleCopy"
                @delete="handleMultipleDelete"
                @download="handleMultipleDownload"
              ></MultipleOpt>
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column title="创建时间" field="createTime" width="180" formatter="ymdhms"></vxe-table-column>
        <vxe-table-column title="创建人" field="creatorName" width="120"> </vxe-table-column>
        <vxe-table-column title="大小" field="fileSize" width="120">
          <template #default="{ row }">
            {{ row.fileSize | fileSize }}
          </template>
        </vxe-table-column>
        <vxe-table-column title="操作" field="opts" width="350" fixed="right">
          <template #default="{ row }">
            <el-button v-if="hasDownload" type="primary" @click="handleDownload(row)">下载</el-button>
            <el-button v-if="hasCopy" type="primary" @click="handleCopy(row)">复制</el-button>
            <el-button v-if="hasMove" type="primary" @click="handleMove(row)">移动</el-button>
            <el-button v-if="hasRename" type="primary" @click="handleRename(row)">重命名</el-button>
            <el-button v-if="hasDelete" type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </template>
    <template v-else>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <div class="file-card-title">
            <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">
              全选
            </el-checkbox>
            <MultipleOpt
              v-if="selectRowIds.length"
              :selectRowIds="selectRowIds"
              :hasMultipleDownload="hasMultipleDownload"
              :hasMultipleDelete="hasMultipleDelete"
              :hasMultipleMove="hasMultipleMove"
              :hasMultipleCopy="hasMultipleCopy"
              @move="handleMultipleMove"
              @copy="handleMultipleCopy"
              @delete="handleMultipleDelete"
              @download="handleMultipleDownload"
            ></MultipleOpt>
          </div>
        </div>
        <div class="file-card-list">
          <el-checkbox-group v-model="selectRowIds" @change="handleCheckedChange">
            <div
              v-for="(item, index) of fileList"
              :key="'card-item' + index"
              class="card-item"
              @click="handleFolderClick(item)"
            >
              <div class="item-top">
                <div
                  class="card-check"
                  :style="{ display: selectRowIds.includes(item.id) ? 'block' : 'none' }"
                  @click.stop="() => {}"
                >
                  <el-checkbox :key="item.id" :label="item.id"> </el-checkbox>
                </div>
                <div class="card-image">
                  <div
                    class="img file-icon"
                    :class="{
                      isFolder: !!item.isFolder,
                      [!!item.isFolder ? '' : item.suffix ? item.suffix.toLowerCase() : 'other']: item.isFolder
                        ? false
                        : true
                    }"
                  ></div>
                </div>
                <div
                  class="card-more"
                  :style="{ display: selectRowIds.includes(item.id) ? 'block' : 'none' }"
                  @click.stop="handleCardMoreClick(item)"
                >
                  <i class="el-icon-more"></i>
                </div>
              </div>
              <ul
                v-if="cardHoverOptVisible && selectRow.id === item.id"
                class="item-hover-item"
                @mouseleave="handleCardMoreMoveOut(item)"
              >
                <li @click.stop="handleDownload(item)">下载</li>
                <li @click.stop="handleMove(item)">移动到</li>
                <li @click.stop="handleCopy(item)">复制到</li>
                <li @click.stop="handleRename(item)">重命名</li>
                <li @click.stop="handleDelete(item)">删除</li>
              </ul>
              <div class="item-file-name">{{ item.name }}</div>
            </div>
          </el-checkbox-group>
        </div>
      </el-card>
    </template>
    <!--复制/移动弹窗-->
    <LevelTreeDialog
      v-if="levelTreeVisible"
      :title="levelTreeTitle"
      :visible.sync="levelTreeVisible"
      :documentAttribution="documentAttribution"
      :wbsCode="wbsCode"
      @submit="handleLevelTreeSubmit"
    ></LevelTreeDialog>
    <!--上传文件弹窗-->
    <UploadDialog
      v-if="uploadVisible"
      :visible.sync="uploadVisible"
      :parentId="currentFolderId"
      :moduleType="documentAttribution"
    ></UploadDialog>
    <!--重命名-->
    <RenameDialog
      v-if="renameVisible"
      :visible.sync="renameVisible"
      :info="selectRow"
      @submit="handleRenameSubmit"
    ></RenameDialog>
    <!--新建文件夹-->
    <AddDialog v-if="addVisible" :visible.sync="addVisible" @submit="handleAddSubmit"></AddDialog>
  </div>
</template>

<script>
import Api from '../../api'
import MultipleOpt from '../components/MultipleOpt'
import LevelTreeDialog from '../components/LevelTreeDialog'
import UploadDialog from '../components/UploadDialog'
import RenameDialog from '../components/RenameDialog'
import AddDialog from '../components/AddDialog'
import { saveAs } from 'file-saver'
export default {
  name: 'CommonDoc',
  components: { MultipleOpt, LevelTreeDialog, UploadDialog, RenameDialog, AddDialog },
  props: {
    /* 模块 */
    model: {
      type: String,
      default: ''
    },
    hasAdd: {
      type: Boolean,
      default: true
    },
    hasDelete: {
      type: Boolean,
      default: true
    },
    hasDownload: {
      type: Boolean,
      default: true
    },
    hasRename: {
      type: Boolean,
      default: true
    },
    hasMove: {
      type: Boolean,
      default: true
    },
    hasCopy: {
      type: Boolean,
      default: true
    },
    // 批量下载
    hasMultipleDownload: {
      type: Boolean,
      default: true
    },
    // 批量删除
    hasMultipleDelete: {
      type: Boolean,
      default: true
    },
    // 批量移动
    hasMultipleMove: {
      type: Boolean,
      default: true
    },
    // 批量复制
    hasMultipleCopy: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      tabType: this.$store.state.commonModule.docType || 'list',
      docList: [{ id: 0, name: '全部' }],
      fileList: [],
      selectRows: [], // 多选选择
      selectRow: {}, // 点击某个
      sortConfig: {
        remote: true
      },
      currentFolderId: 0, // 当前展示的父级id
      filterForm: { name: '' },
      showHighSearch: false, // 显示高级搜索
      levelTreeVisible: false,
      levelTreeTitle: '',
      isMultipleOpt: false,
      optType: '', // 1,移动,2,复制
      uploadVisible: false,
      renameVisible: false,
      addVisible: false,
      isIndeterminate: false,
      checkAll: false,
      selectRowIds: [],
      allFileIds: [],
      cardHoverOptVisible: false,
      wbsCode: []
    }
  },
  computed: {
    documentAttribution() {
      return this.$getModelType(this.model)
    }
  },
  watch: {
    selectRows: {
      immediate: false,
      deep: true,
      handler() {
        this.selectRowIds = this.selectRows.map(item => item.id) || []
      }
    },
    fileList: {
      immediate: false,
      deep: true,
      handler() {
        this.allFileIds = this.fileList.map(item => item.id) || []
      }
    },
    tabType() {
      if (this.selectRowIds.length && this.allFileIds.length === this.selectRowIds.length) this.checkAll = true
      this.$store.commit('commonModule/changeDocType', this.tabType)
    }
  },
  created() {
    this.refresh()
  },
  methods: {
    async refresh() {
      const res = await Api.doc.getList({
        ...this.filterForm,
        parentId: this.currentFolderId,
        documentAttribution: this.documentAttribution
      })
      this.fileList =
        (res.data &&
          res.data.map(item => {
            return {
              isFolder: item.documentFlag === 0 ? 1 : 0,
              suffix: item.fileNameSuffix || 'other',
              ...item
            }
          })) ||
        []
      this.selectRows = []
      this.checkAll = false
      this.isIndeterminate = false
    },
    // 重置
    reset() {
      this.filterForm = {
        keyword: this.filterForm.keyword
      }
      this.refresh()
    },
    // 排序改变
    handleSortChange({ order, property }) {
      const isDesc = order === 'desc' ? '-' : ''
      this.filterForm.sort = isDesc + property
      this.refresh()
    },
    async handleSearch(isHigh = false) {
      if (isHigh) {
        this.showHighSearch = false
      }
      await this.refresh()
    },
    // 头部跳转
    async topJumpFolder(item, index) {
      this.docList.splice(index + 1)
      this.currentFolderId = item.id
      await this.refresh()
      this.selectRows = []
      this.checkAll = false
      this.isIndeterminate = false
    },
    // 列表内跳转
    async handleFolderClick(row) {
      if (!row.isFolder) {
        return
      }
      this.selectRows = []
      this.checkAll = false
      this.isIndeterminate = false
      this.docList.push({ id: row.id, name: row.name })
      this.currentFolderId = row.id
      await this.refresh()
    },
    // 复选框选择事件
    async handleCheck({ checked, row }) {
      if (checked) {
        this.selectRows.push(row)
      } else {
        this.selectRows = this.selectRows.filter(item => item.id !== row.id)
      }
    },
    handleCheckAll({ checked, records }) {
      if (checked) {
        this.checkAll = true
        this.selectRows = [...this.selectRows, ...records]
      } else {
        this.checkAll = false
        this.selectRows = []
      }
    },
    handleAddOpt(e) {
      if (e === 'upload') {
        this.uploadVisible = true
      } else {
        this.addVisible = true
      }
    },
    // 移动
    async handleMove(row) {
      this.selectRow = row
      this.isMultipleOpt = false
      this.optType = 1
      this.levelTreeVisible = true
      this.levelTreeTitle = '移动到'
      this.wbsCode = [row.wbsCode]
    },
    // 复制
    async handleCopy(row) {
      this.selectRow = row
      this.isMultipleOpt = false
      this.optType = 2
      this.levelTreeVisible = true
      this.levelTreeTitle = '复制到'
      this.wbsCode = [row.wbsCode]
    },
    // 重命名
    async handleRename(row) {
      this.selectRow = row
      this.renameVisible = true
    },
    async handleDownload(row) {
      this.selectRow = row
      const res = await Api.doc.download(row.id)
      saveAs(res.data, row.name)
    },
    // 删除
    async handleDelete(row) {
      this.selectRow = row
      const res = await this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => {
        this.$message.info('操作已取消')
      })
      if (res) {
        await Api.doc.deleteById(row.id)
        this.$message.success('操作成功')
        await this.refresh()
        this.selectRows = []
        this.checkAll = false
        this.isIndeterminate = false
      }
    },
    // 批量移动
    async handleMultipleMove() {
      this.optType = 1 // 1,移动,2,复制
      this.isMultipleOpt = true
      this.levelTreeVisible = true
      this.levelTreeTitle = '批量移动到'
      this.wbsCode = _.uniq(this.selectRows.map(item => item.wbsCode))
    },
    // 批量复制
    async handleMultipleCopy() {
      this.optType = 2
      this.isMultipleOpt = true
      this.levelTreeVisible = true
      this.levelTreeTitle = '批量复制到'
      this.wbsCode = _.uniq(this.selectRows.map(item => item.wbsCode))
    },
    // 批量下载
    async handleMultipleDownload() {
      const res = await Api.doc.downloadMultiple(this.selectRowIds)
      saveAs(res.data, 'download')
    },
    // 批量删除
    async handleMultipleDelete() {
      const res = await this.$confirm('是否批量删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => {
        this.$message.info('操作已取消')
      })
      if (res) {
        const arr = this.selectRowIds || this.selectRows.map(item => item.id)
        await Api.doc.multipleDelete(arr)
        this.$message.success('操作成功!')
        await this.refresh()
        this.selectRows = []
      }
    },
    // 复制/移动提交
    async handleLevelTreeSubmit(id) {
      // optType 1,移动;2,复制
      if (this.optType === 1) {
        await Api.doc.move({ parentId: id, ids: this.isMultipleOpt ? this.selectRowIds : [this.selectRow.id] })
        this.$message.success('移动成功!')
      } else {
        await Api.doc.copy({ parentId: id, ids: this.isMultipleOpt ? this.selectRowIds : [this.selectRow.id] })
        this.$message.success('复制成功!')
      }
      this.levelTreeVisible = false
      await this.refresh()
    },
    // 重命名
    async handleRenameSubmit(data) {
      const { id, name } = data
      await Api.doc.rename({ id, name })
      this.$message.success('重命名成功!')
      this.renameVisible = false
      await this.refresh()
    },
    // 添加文件夹
    async handleAddSubmit(data) {
      await Api.doc.add({ ...data, parentId: this.currentFolderId, documentAttribution: this.documentAttribution })
      this.$message.success('添加成功!')
      this.addVisible = false
      await this.refresh()
    },
    handleCheckAllChange(val) {
      this.selectRowIds = val ? this.allFileIds : []
      this.isIndeterminate = false
    },
    handleCheckedChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.fileList.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.fileList.length
    },
    // 点击卡片更多
    handleCardMoreClick(row) {
      this.selectRow = row
      this.cardHoverOptVisible = true
    },
    handleCardMoreMoveOut() {
      // this.selectRow = {}
      this.cardHoverOptVisible = false
    }
  }
}
</script>
<style scoped lang="less">
@import url('@/views/epidemicControl/components/doc/CommonDoc/index.less');
</style>
