<template>
  <div>
    <el-dialog title="新增表单" class="form-dialog" :visible="visible" @close="handleCancel">
      <div class="container">
        <el-form ref="form" :model="form" :rules="formRules" label-width="80px">
          <el-form-item label="表单类型" prop="formType">
            <el-radio-group v-model="formType">
              <el-radio :label="1">需审批表单</el-radio>
              <el-radio :label="2">无审批表单</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="" prop="constructionSituation" class="model-list">
            <h4>复制已有表单为模板</h4>
            <ul>
              <li
                v-for="(item, index) in list"
                :key="item.id"
                :class="{ 'add-class': item.isActive && isActive === index }"
                @click="handleModelList(item, index)"
              >
                <div class="list">
                  <div class="left-img">
                    <img :src="item.icon" alt="" />
                  </div>
                  <div class="right-word">
                    <p class="description">{{ item.name }}</p>
                  </div>
                </div>
              </li>
            </ul>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Api from '../api'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'AddRecordDialog',
  props: {
    visible: Boolean,
    id: String
  },
  // 这里存放数据
  data() {
    return {
      form: {},
      formType: 1,
      isActive: 0,
      isCompanyActive: '',
      list: [], // 当前项目模板
      checkedList: {},
      companyModelList: [], // 企业级项目模板
      formRules: {
        // formType: [{ required: true, message: '必填' }]
      }
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  created() {
    this.getModelFormList()
  },
  // 方法集合
  methods: {
    handleModelList(list, index) {
      if (!list.isActive) {
        list.isActive = true
        this.isActive = index
        this.companyModelList = this.companyModelList.map(item => {
          return {
            ...item,
            isCompanyActive: false
          }
        })
      } else {
        list.isActive = false
        this.isActive = ''
      }
      this.checkedList = list
      this.formType = list.formType
    },
    // 取消
    handleCancel() {
      this.$emit('update:visible', false)
    },
    // 保存
    async handleSave() {
      this.handleCancel()
      const isCopy = !!this.checkedList.id
      this.$router.push({
        name: this.checkedList.id ? 'ProjectOACustomFormEdit' : 'ProjectOACustomFormAdd',
        query: { id: this.checkedList.id, formType: this.formType, isCopy: isCopy }
      })
    },
    // 获取详情
    getModelFormList() {
      Api.getFormList({ scope: 1, status: 1 }).then(res => {
        this.list = res.data.records || []
        this.list = this.list.map(item => {
          return {
            ...item,
            isActive: false
          }
        })
        this.list.unshift({
          icon: require('../images/add-model.png'),
          name: '不使用模板',
          isActive: true,
          formType: 1
        })
        console.log('list', this.list)
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import url('~@/styles/common');
.form-dialog {
  /deep/.el-dialog__body {
    height: 60vh;
    .el-form {
      height: 100%;
      display: flex;
      flex-direction: column;
      .model-list {
        flex: 1;
        overflow-x: hidden;
        overflow-y: auto;
      }
    }
  }
}
.container {
  height: 100%;
  .form-title {
    margin-top: 10px;
  }
  .config-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  ul {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    flex-direction: row;
    li {
      display: inline-block;
      margin: 10px 20px 10px 0;
      width: 30%;
      padding: 10px;
      box-shadow: 2px 2px 5px #bac9e3;
      border-radius: 5px;
      position: relative;
      overflow: hidden;
      .list {
        display: flex;
        align-items: center;
        .left-img {
          width: 60px;
          height: 60px;
          img {
            width: 100%;
          }
        }
        .right-word {
          margin-left: 8px;
          flex: 1;
          overflow: hidden;
          p:last-child {
            font-size: 13px;
            color: #68758a;
            margin-top: 3px;
          }
          .description {
            max-height: 40px;
            line-height: 20px;
            .ellipsis;
            white-space: initial;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
        }
      }
    }
    .add-class {
      border: 1px solid #eb4435;
    }
    &:hover {
      cursor: pointer;
    }
  }
}
.model-list {
  margin-left: 15px;
  /deep/ .el-form-item__content {
    margin-left: 0 !important;
  }
  h4 {
    font-weight: normal;
  }
}
.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
