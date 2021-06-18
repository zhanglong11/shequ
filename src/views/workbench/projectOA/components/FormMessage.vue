<template>
  <div class="container">
    <el-card v-for="(item, index) in menuList" :key="index" class="box-card">
      <div class="config-list">
        <h4 class="title">{{ item.name }}</h4>
        <div v-if="item.menuConfig === 1">
          <el-button
            v-if="$hasPower('ProjectOACustomFormAdd')"
            type="primary"
            icon="el-icon-plus"
            @click="addCustomForm"
            >新增表单</el-button
          >
          <el-button
            v-if="$hasPower('SetFormManage')"
            type="primary"
            plain
            icon="el-icon-setting"
            @click="configCustomForm(item.menuConfig)"
            >管理表单</el-button
          >
        </div>
      </div>
      <div v-for="subItem in item.list" :key="subItem.id">
        <h4 class="form-title">
          <span>{{ subItem.name }}</span>
        </h4>
        <ul>
          <template v-for="items in subItem.children">
            <li
              :key="items.id"
              :class="{ disable: items.startFlag !== 1, 'is-system': items.flag === 2 }"
              @click="toDetails(items)"
            >
              <div v-if="items.flag === 1">
                <template v-if="!items.status">
                  <span class="circle draft"></span>
                  <span class="sign draft">草稿</span>
                </template>
                <!-- <template v-else>
                    <span class="circle" :class="{ blue: items.projectId == null }"></span
                    ><span class="sign">{{ items.projectId == null ? '企业' : '项目' }}</span>
                  </template> -->
              </div>

              <div v-if="items.formType === 1">
                <span class="approval-square">1</span><span class="approval-sign">需审批</span>
              </div>
              <div class="list">
                <div class="left-img">
                  <img :src="items.icon" alt="" />
                </div>
                <div class="right-word">
                  <p class="title">
                    <span class="title-name">{{ items.name }}</span>
                    <span v-if="items.editFlag === 1 && items.flag === 1 && items.status === 0">
                      <el-button
                        icon="el-icon-edit-outline"
                        type="text"
                        style="color: #357eea; display: inline-block; margin-left: 5px; font-weight: 500"
                        @click.stop="handleCustomEdit(items)"
                      ></el-button>
                      <el-button
                        type="text"
                        size="mini"
                        icon="el-icon-delete"
                        style="color: #f65e57; display: inline-block; margin-left: 5px; font-weight: 500"
                        @click.stop="handleCustomDelete(items)"
                      ></el-button>
                    </span>
                  </p>
                  <el-tooltip v-if="items.description" :content="items.description" placement="bottom">
                    <p class="description">{{ items.description }}</p>
                  </el-tooltip>
                </div>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </el-card>
    <addCustomForm v-if="addCustomFormVisible" :visible.sync="addCustomFormVisible"></addCustomForm>
    <!-- 创建小组-->
    <el-dialog
      v-if="dialogGroupFormVisible"
      :title="groupName ? '重命名' : '新建小组'"
      :visible.sync="dialogGroupFormVisible"
      width="550px"
    >
      <el-form ref="groupForm" :model="groupForm" :rules="groupRules">
        <el-form-item label="小组名称" label-width="120px" prop="name">
          <el-input
            v-model="groupForm.name"
            autocomplete="off"
            :maxlength="8"
            placeholder="最多可以输入8个字"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogGroupFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleGroupSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!--    管理自定义表单 start-->
    <el-dialog :visible.sync="configCustomFormVisible" title="管理表单" width="90%">
      <div class="custom-roll">
        <el-button v-if="configCustomFlag === 1" type="primary" plain icon="el-icon-plus" @click="handleGroupAdd(null)"
          >新建小组</el-button
        >
        <div
          v-for="subItem in configFormList"
          :key="subItem.id"
          class="drag-ul"
          :class="{ 'drag-default': configCustomFlag !== 1 }"
        >
          <h4 class="form-title">
            <span>{{ subItem.name }}</span
            ><span v-if="subItem.flag === 1" style="display: inline-block; margin: 0 0 10px 10px">
              <el-button
                v-if="subItem.children.length === 0"
                type="primary"
                plain
                icon="el-icon-delete"
                @click="handleGroupDelete(subItem)"
                >删除小组</el-button
              >
              <el-button type="primary" plain icon="el-icon-edit" @click="handleGroupAdd(subItem)">重命名</el-button>
            </span>
          </h4>
          <draggable
            :list="subItem.children"
            tag="ul"
            :group="{ name: 'subItem' }"
            v-bind="dragOptions"
            draggable=".item"
            @start="childrenDrag = true"
            @end="childrenDrag = false"
          >
            <!--            <ul>-->
            <transition-group
              type="transition"
              class="item-con"
              :class="{ 'no-item': subItem.children.length === 0 }"
              :name="!childrenDrag ? 'flip-list' : null"
            >
              <template v-for="items in subItem.children">
                <li
                  v-if="items.editFlag === 1"
                  :key="items.id"
                  class="item"
                  :class="{ 'drag-default': configCustomFlag !== 1, 'is-system': items.flag === 2 }"
                >
                  <div v-if="items.flag === 1">
                    <template v-if="!items.status">
                      <span class="circle draft"></span>
                      <span class="sign draft">草稿</span>
                    </template>
                    <!-- <template v-else>
                      <span class="circle" :class="{ blue: items.projectId == null }"></span
                      ><span class="sign">{{ items.projectId == null ? '企业' : '项目' }}</span>
                    </template> -->
                  </div>
                  <div v-if="items.formType === 1">
                    <span class="approval-square">1</span><span class="approval-sign">需审批</span>
                  </div>
                  <div class="list">
                    <div class="left-img">
                      <img :src="items.icon" alt="" />
                    </div>
                    <div class="right-word">
                      <p class="title">
                        <span class="title-name">{{ items.name }}</span>
                        <span v-if="items.flag === 1 && $hasPower('ProjectOACustomFormEdit')">
                          <el-button
                            type="text"
                            icon="el-icon-edit-outline"
                            size="mini"
                            style="display: inline-block; margin-left: 5px; font-weight: 500"
                            @click="handleCustomEdit(items)"
                          ></el-button>
                          <el-button
                            type="text"
                            size="mini"
                            icon="el-icon-delete"
                            style="display: inline-block; margin-left: 5px; font-weight: 500"
                            @click="handleCustomDelete(items)"
                          ></el-button>
                        </span>
                        <span v-if="items.flag === 2 && items.formType === 1" @click="handleFixedFromEdit(items)">
                          <el-button
                            type="text"
                            size="mini"
                            icon="el-icon-edit-outline"
                            style="display: inline-block; margin-left: 5px; font-weight: 500; font-size: 16px"
                          ></el-button>
                        </span>
                      </p>

                      <el-tooltip v-if="items.description" :content="items.description" placement="bottom">
                        <p class="description">{{ items.description }}</p>
                      </el-tooltip>
                    </div>
                  </div>
                </li>
              </template>
            </transition-group>
            <!--            </ul>-->
          </draggable>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="configCustomFormVisible = false">取 消</el-button>
        <el-button
          v-if="configCustomFlag === 1"
          type="primary"
          :loading="configCustomFormLoading"
          @click="messageFormSubmit"
          >提交管理结果</el-button
        >
      </div>
    </el-dialog>
    <!--    管理自定义表单 end-->
  </div>
</template>

<script>
import addCustomForm from './addCustomFormDialog'
import draggable from 'vuedraggable'
import Api from '../api'
export default {
  name: 'FormMessage',
  components: {
    addCustomForm,
    draggable
  },
  data() {
    return {
      addCustomFormVisible: false,
      dialogGroupFormVisible: false,
      menuList: [],
      recentlyFormList: [], // 最近使用的表单
      configCustomFlag: 1,
      configCustomFormVisible: false, // 管理自定义表单是否显示
      configCustomFormLoading: false,
      childrenDrag: false,
      configCustomFormList: [], // 管理自定义表单列表
      configFixedFormList: [], // 管理固定表单列表
      configFormList: [], // 管理表单列表
      groupName: '',
      groupForm: {
        flag: 1,
        name: ''
      },
      groupRules: {
        name: [
          {
            required: true,
            message: '请输入小组名称',
            trigger: 'blur'
          },
          {
            max: 8,
            message: '最多可以输入8个字',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 300,
        disabled: this.configCustomFlag !== 1
      }
    }
  },
  watch: {
    configCustomFormList: {
      handler(val) {
        this.configFormList = val
      },
      deep: true
    }
  },
  created() {
    this.getModelFormList()
  },
  methods: {
    // 跳转详情页
    toDetails(item, type = false) {
      console.log('跳转详情页', item)
      if (!item.status && !type) {
        return
      }
      if (item.startFlag !== 1 && !type) {
        this.$message.error('无操作权限')
        return
      }
      const addQuery = {
        showAdd: 1
      }
      if (item.name === '新建单一任务') {
        addQuery.activeName = 'executor'
        addQuery.activeName = 'executor'
      }
      if (item.name === '新建多任务') {
        addQuery.activeName = 'executor'
        addQuery.taskType = 1
      }
      if (item.flag === 1) {
        this.$router.push({
          name: 'ProjectOACustomAdd',
          query: {
            id: item.formId || item.id,
            name: item.name
          }
        })
      } else {
        this.$router.push({
          name: item.pcRouteUrl,
          query: addQuery
        })
      }
    },
    // 改变表单顺序
    changeFormOrder(e) {
      console.log(this.configFormList)
    },
    // 取消排序
    messageFormCancel() {
      this.configCustomFormVisible = false
      this.getModelFormList()
    },
    // 提交排序的结果
    messageFormSubmit() {
      const params = _.reduce(
        this.configFormList.map(item => {
          return (
            item &&
            item.children.map(subItem => {
              return {
                formId: subItem.id,
                groupId: item.id
              }
            })
          )
        }),
        (sum, n) => {
          return _.concat(sum, n)
        }
      )
      const target = params.map((item, index) => {
        return {
          ...item,
          sort: index
        }
      })
      if (target.length === 0) {
        this.configCustomFormVisible = false
        return
      }
      this.configCustomFormLoading = true
      Api.getFormSort(target)
        .then(res => {
          this.$message.success('提交成功')
          this.configCustomFormVisible = false
          this.getModelFormList()
          this.configCustomFormLoading = false
        })
        .catch(e => {
          this.configCustomFormLoading = false
        })
      console.log('params', params)
    },
    addCustomForm() {
      this.addCustomFormVisible = true
    },
    // 新建组
    handleGroupAdd(item) {
      if (item) {
        // console.log(1111, item)
        this.groupName = item.name
        this.groupForm = {
          ...item
        }
      } else {
        this.groupForm = {
          flag: 1,
          name: ''
        }
      }
      this.dialogGroupFormVisible = true
    },
    // 管理自定义表单
    configCustomForm(flag) {
      // console.log(flag)
      this.configCustomFlag = flag
      if (flag === 1) {
        this.configFormList = _.cloneDeep(this.configCustomFormList)
      } else {
        const configFixedFormList = _.cloneDeep(this.configFixedFormList)
        configFixedFormList.map(e => {
          if (e.children) {
            e.children = e.children.filter(f => f.formType === 1)
          }
          return true
        })
        // console.log(555, configFixedFormList)
        this.configFormList = configFixedFormList.filter(e => e.children && e.children.length > 0)
      }
      this.configCustomFormVisible = true
    },
    // 管理固定表单的修改
    handleFixedFromEdit(item) {
      this.$router.push({ name: 'ProjectOAFixedFormEdit', params: { id: item.id, formType: item.formType } })
    },
    // 删除小组
    handleGroupDelete(item) {
      if (!item.children.length) {
        this.$confirm('确认删除该小组?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            Api.getGroupFormDelete(item.id).then(res => {
              if (res.code === 200) {
                this.$message.info('删除成功')
                this.getModelFormList()
              }
            })
          })
          .catch(() => {})
      } else {
        this.$message.info('此小组下还有自定义表单不能进行删除')
      }
    },
    // 提交新建小组
    async handleGroupSubmit() {
      await this.$refs.groupForm.validate()
      await Api.getGroupFormAdd(this.groupForm).then(res => {
        // this.$message.success('提交成功')
        this.getModelFormList()
        this.dialogGroupFormVisible = false
      })
    },
    // 自义定表单编辑
    handleCustomEdit(item) {
      console.log('自义定表单编辑', item)
      this.$router.push({
        name: 'ProjectOACustomFormEdit',
        query: { id: item.id, formType: item.formType, isCopy: false }
      })
    },
    // 自定义表单删除
    handleCustomDelete(item) {
      this.$confirm('确认删除该条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          Api.getCustomFormDelete(item.id).then(res => {
            if (res.code === 200) {
              this.$message.info('删除成功')
              this.getModelFormList()
            }
          })
        })
        .catch(() => {})
    },
    // 获得form表单列表
    getModelFormList() {
      Api.getGroupFormList({ flag: '' }).then(res => {
        const list = res.data || []
        const customForm = list.filter(item => item.flag === 1)
        this.configCustomFormList = customForm
        this.menuList = [
          {
            menuConfig: 1,
            name: 'OA表单',
            list: customForm
          }
        ]
        // console.log('list', this.menuList)
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import url('~@/styles/common');
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.container {
  .form-title {
    margin-top: 10px;
  }
  .config-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .drag-ul {
    .item-con {
      &.no-item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        border: 1px #ddd dashed;
        background: rgba(0, 0, 0, 0.01);
        &:before {
          content: '无表单数据';
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
  .item {
    cursor: move;
    &.drag-default {
      cursor: default;
    }
  }
  ul {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    flex-direction: row;
    li {
      display: inline-block;
      margin: 10px 30px 10px 0;
      width: 18%;
      min-width: 290px;
      max-width: 100%;
      padding: 20px;
      box-shadow: 2px 2px 5px #bac9e3;
      border-radius: 5px;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.2s;
      &.is-system {
        background: #8197e0;
        .title-name {
          color: #fff;
        }
        .description {
          color: rgba(255, 255, 255, 0.7) !important;
        }
        /deep/.el-button {
          .el-icon-edit-outline,
          .el-icon-delete {
            color: #fff !important;
          }
        }
      }
      &:hover {
        transform: scale(1.05);
        box-shadow: 1px 1px 5px #bac9e3;
      }
      &.disable {
        cursor: no-drop;
        transform: scale(1);
        opacity: 0.7;
        // -webkit-filter: grayscale(100%);
        // -moz-filter: grayscale(100%);
        // -ms-filter: grayscale(100%);
        // -o-filter: grayscale(100%);
        // filter: grayscale(100%);
        // -webkit-filter: gray;
        // filter: gray;
      }
      .circle {
        display: inline-block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: linear-gradient(to right, #ff7272, #eb4435);
        position: absolute;
        top: -21px;
        left: -11px;
      }
      .blue {
        background: linear-gradient(to right, #55a3ff, #1558d6);
      }
      .sign {
        color: #fff;
        display: inline-block;
        font-size: 9px;
        position: absolute;
        top: 0;
        left: 0;
      }
      .draft {
        background: linear-gradient(to right, #38b44c, #38b44c);
        border-radius: 5px 0 5px 0;
        top: 0;
        left: 0;
        width: 33px;
        height: 13px;
        text-align: center;
      }
      .approval-square {
        display: inline-block;
        width: 60px;
        height: 40px;
        background: linear-gradient(to right, #ff8972, #fdd122);
        position: absolute;
        top: -12px;
        right: -23px;
        transform: rotate(45deg);
      }
      .approval-sign {
        color: #fff;
        display: inline-block;
        font-size: 9px;
        position: absolute;
        top: 8px;
        right: -3px;
        transform: rotate(45deg);
      }
      .list {
        display: flex;
        align-items: center;
        .left-img {
          width: 60px;
          height: 60px;
          // border: 1px #fff solid;
          // box-shadow: 0 0 3px rgba(255, 255, 255, 0.5);
          border-radius: 18px;
          img {
            width: 100%;
          }
        }
        .right-word {
          margin-left: 8px;
          flex: 1;
          overflow: hidden;
          .title {
            margin-right: 5px;
            display: flex;
            align-items: center;
            /deep/.el-button {
              margin-left: 5px;
              .el-icon-edit-outline {
                color: #357eea;
              }
              .el-icon-delete {
                color: #f36357;
              }
            }
          }
          .title-name {
            flex: 1;
            font-size: 16px;
            .ellipsis;
          }
          .description {
            max-height: 28px;
            line-height: 14px;
            .ellipsis;
            white-space: initial;
          }
          p:last-child {
            font-size: 13px;
            color: #68758a;
            margin-top: 3px;
          }
        }
      }
    }
  }
}

.custom-roll {
  height: 60vh;
  overflow-x: hidden;
  overflow-y: auto;
  ul {
    display: block;
  }
}
</style>
