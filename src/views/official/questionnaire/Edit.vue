<template>
  <div class="container has-footer">
    <div class="inner-wrapper">
      <div class="con-form">
        <h3 class="title">基本信息</h3>
        <el-form ref="form" :model="form" :rules="rules" label-width="140px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="问卷标题" prop="title">
                <el-input v-model="form.title" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="截止时间" prop="endTime">
                <el-date-picker v-model="form.endTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="匿名设置" prop="anonymity">
                <el-switch v-model="form.anonymity" :active-value="1" :inactive-value="0" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="问卷说明" prop="explain">
                <el-input v-model="form.explain" type="textarea" resize="none" :rows="3" placeholder="请输入" />
              </el-form-item>
            </el-col>
          </el-row>
          <h3 class="title">问卷内容</h3>
          <el-row>
            <el-col :span="24">
              <el-form-item>
                <template v-if="form.issueList.length">
                  <div v-for="(item, index) of form.issueList" :key="'is' + index" class="conten">
                    <div v-if="item.type === 0" class="main-desc">
                      <div class="main-title">
                        <span class="label">
                          <el-tag style="margin: 0 5px" class="label-tag_1" size="mini">单选</el-tag>
                        </span>
                        <span class="title">{{ index + 1 }}.{{ item.topic }}</span>
                        <span style="display: inline-block; float: right; font-size: 18px">
                          <i class="el-icon-edit-outline" style="margin-right: 15px" @click="handleAddItem(item)"></i>
                          <i class="el-icon-delete-solid" @click="handleDeleteItem"></i>
                        </span>
                      </div>
                      <div v-for="(items, indexs) of item.optionList" :key="'op' + indexs" class="foot">
                        <span class="f-option">选项{{ indexs + 1 }}</span>
                        <span class="f-ask">{{ items.option }}</span>
                      </div>
                    </div>
                    <div v-if="item.type === 1" class="main-desc">
                      <div class="main-title">
                        <span class="label">
                          <el-tag style="margin: 0 5px" class="label-tag_2" size="mini">多选</el-tag>
                        </span>
                        <span class="title">{{ index + 1 }}.{{ item.topic }}</span>
                        <span style="display: inline-block; float: right; font-size: 18px">
                          <i class="el-icon-edit-outline" style="margin-right: 15px" @click="handleAddItem(item)"></i>
                          <i class="el-icon-delete-solid" @click="handleDeleteItem"></i>
                        </span>
                      </div>
                      <div v-for="(items, indexs) of item.optionList" :key="'ops' + indexs" class="foot">
                        <span class="f-option">选项{{ indexs + 1 }}</span>
                        <span class="f-ask">{{ items.option }}</span>
                      </div>
                    </div>
                    <div v-if="item.type === 2" class="main-desc">
                      <div class="main-title">
                        <span class="label">
                          <el-tag style="margin: 0 5px" class="label-tag_3" size="mini">简答</el-tag>
                        </span>
                        <span class="title">{{ index + 1 }}.{{ item.topic }}：</span>
                        <span style="display: inline-block; float: right; font-size: 18px">
                          <i class="el-icon-edit-outline" style="margin-right: 15px" @click="handleAddItem(item)"></i>
                          <i class="el-icon-delete-solid" @click="handleDeleteItem(index)"></i>
                        </span>
                      </div>
                      <div class="foot">
                        <el-input disabled type="textarea" :rows="2" placeholder="请输入" />
                      </div>
                    </div>
                  </div>
                </template>
                <el-form-item>
                  <el-button
                    v-if="$hasPower('QuestionAddContent')"
                    type="text"
                    icon="el-icon-plus"
                    @click="handleAddItem()"
                    >添加</el-button
                  >
                </el-form-item>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <AddSelect
        v-if="AddSelectDialog"
        :visible.sync="AddSelectDialog"
        :itemList="itemList"
        @change="getChange"
        @setChange="setChange"
      />
    </div>
    <div class="footer-button">
      <el-button v-promise-btn type="primary" @click="handleSave">保存</el-button>
      <el-button @click="$back">返回</el-button>
    </div>
  </div>
</template>

<script>
import Api from '../api'
import AddSelect from './AddSelect'
export default {
  name: 'QuestionnAdd',
  components: { AddSelect },
  data() {
    return {
      id: this.$route.params.id || '',
      AddSelectDialog: false,
      form: {
        issueList: []
      },
      itemList: {},
      rules: {
        title: [{ required: true, message: '必选' }],
        endTime: [{ required: true, message: '必选' }],
        anonymity: [{ required: true, message: '必选' }],
        explain: [{ required: true, message: '必选' }]
      }
    }
  },
  mounted() {
    if (this.id) {
      Api.getinformQuestionDetail(this.id).then(res => {
        this.form = res.data
      })
    }
  },
  methods: {
    handleAddItem(item) {
      this.itemList = item
      this.AddSelectDialog = true
    },
    handleDeleteItem(index) {
      this.form.issueList.splice(index, 1)
    },
    getChange(data) {
      const dataList = {
        id: _.uniqueId('topic_'),
        must: data.must,
        optionList: data.optionList,
        topic: data.topic,
        type: data.type
      }
      this.form.issueList.push(dataList)
      this.AddSelectDialog = false
    },
    // 编辑问卷内容返回值
    setChange(data) {
      this.form.issueList = this.form.issueList.map(item => (item.id === data.id ? data : item))
    },
    // 提交
    async handleSave() {
      await this.$refs.form.validate()
      const form = _.cloneDeep(this.form)
      form.endTime = dayjs(form.endTime).format('YYYY-MM-DD HH:mm:00')
      if (form.issueList.length === 0) return this.$message.info('请输入问卷内容')
      form.issueList = form.issueList.map((item, index) => {
        item.optionList = item.optionList.map(e => e.option)
        item.index = index
        return item
      })
      if (this.id) {
        Api.getinformQuestionUpdate({ ...form }).then(res => {
          if (res.code === 200) {
            this.$message.success('修改成功')
            this.$back()
          }
        })
      } else {
        const data = _.cloneDeep({ ...form })
        Api.getinformQuestionAdd(data).then(res => {
          if (res.code === 200) {
            this.$message.success('添加成功')
            this.$back()
          }
        })
      }
    },
    handleBack() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.con-form {
  padding-left: 100px;
  max-width: 70%;
  .title {
    font-weight: bold;
    margin-bottom: 10px;
  }
  .desc {
    padding-left: 50px;
    .label-desc {
      color: #999;
    }
  }
}
.label-tag_3 {
  border-color: rgba(211, 173, 247, 1);
  background-color: rgba(249, 240, 255, 1);
  color: #722ed1;
}
.label-tag_2 {
  border-color: rgba(135, 232, 222, 1);
  background-color: rgba(230, 255, 251, 1);
  color: #13c2c2;
}
.label-tag_1 {
  border-color: rgba(145, 213, 255, 1);
  background-color: rgba(230, 247, 255, 1);
  color: #1890ff;
}

.main-desc {
  border: 1px solid #ccc;
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
  .foot {
    display: inline-block;
    padding-left: 45px;
    .f-option {
      color: #999;
      margin-right: 10px;
    }
  }
}
</style>
