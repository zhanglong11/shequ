<template>
  <div class="container has-footer">
    <div class="inner-wrapper">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <div class="common-card">
          <div class="common-card-title">
            <span class="title-content">基本信息</span>
            <span class="title-opt">
              <el-button type="text"></el-button>
            </span>
          </div>
          <div class="common-card-body">
            <el-row>
              <el-col :span="8">
                <el-form-item label="所属网格" prop="orgId">
                  <SelectGridDepartment v-model="form.orgId" placeholder="请选择"></SelectGridDepartment>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="事件类型" prop="type">
                  <Select v-model="form.type" argGroup="eventType"> </Select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="事件规模" prop="scale">
                  <Select v-model="form.scale" argGroup="eventLeval"> </Select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="发生时间" prop="occurrenceTime">
                  <el-date-picker
                    v-model="form.occurrenceTime"
                    type="date"
                    style="width: 100%"
                    value-format="yyyy-MM-dd"
                    placeholder="选择发生时间"
                    :validate-event="false"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="事件状态" prop="status">
                  <Select v-model="form.status" :options="eventStatus"> </Select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="发生地点" prop="address">
                  <div class="input-address">
                    <el-input v-model="form.address" disabled></el-input>
                    <i class="el-icon-location" style="font-size: 20px; color: #f00" @click="mapDialogVisible = true" />
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="事件描述" prop="description">
                <el-input
                  v-model="form.description"
                  type="textarea"
                  :rows="4"
                  :maxlength="200"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="事件处理过程及结果" prop="result">
                <el-input v-model="form.result" type="textarea" :rows="4"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="附件" prop="fileIds">
                <Upload v-model="form.fileIds" isOnlyButton multiple />
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="关联人员" prop="name">
                <div class="tag-wrapper">
                  <el-tag
                    v-for="(item, index) of userList"
                    :key="'tag' + index"
                    style="margin: 0 5px"
                    size="mini"
                    @click="handleTagClick(item)"
                    >{{ item.name }}
                  </el-tag>
                </div>
                <el-button type="text" icon="el-icon-plus" @click="selectUserWithIcon">关联人员</el-button>
              </el-form-item>
            </el-row>
          </div>
        </div>
      </el-form>
    </div>
    <div class="footer-button">
      <el-button @click="$back">返回</el-button>
      <el-button v-promise-btn type="primary" @click="submit">确定</el-button>
    </div>
    <SelectUserTreeTable
      v-if="selectVisible"
      title="选择人员"
      :visible.sync="selectVisible"
      :selectData="userList"
      @submit="submitSelect"
    ></SelectUserTreeTable>
    <MapSelectPointDialog
      v-if="mapDialogVisible"
      :visible.sync="mapDialogVisible"
      :location.sync="form.location"
      :address.sync="form.address"
    >
    </MapSelectPointDialog>
  </div>
</template>

<script>
import Api from '../api'
import SelectGridDepartment from '@/views/grid/components/SelectGridDepartment'
import eventStatus from '../../lib/eventStatus'
import SelectUserTreeTable from '@/views/epidemicControl/components/person/CommonPersonAdd/components/AddFamilyDialog'
import MapSelectPointDialog from '../component/MapSelectPointDialog'
export default {
  name: 'CompositeGovernEventAdd',
  components: { SelectGridDepartment, SelectUserTreeTable, MapSelectPointDialog },
  data() {
    return {
      eventStatus,
      id: this.$route.params.id,
      form: { location: '', address: '' },
      selectVisible: false,
      userList: [],
      mapDialogVisible: false,
      rules: {
        orgId: [{ required: true, message: '必选' }],
        type: [{ required: true, message: '必选' }],
        scale: [{ required: true, message: '必选' }],
        occurrenceTime: [{ required: true, message: '必选' }],
        status: [{ required: true, message: '必选' }],
        description: [{ required: true, message: '必填' }]
      }
    }
  },
  created() {
    if (this.id) {
      this.getDetail()
    }
  },
  mounted() {},
  methods: {
    async getDetail() {
      const res = await Api.getEventDetail(this.id)
      this.form = { ...res.data }
      this.userList = res.data.relevanceList || []
    },
    selectUserWithIcon() {
      this.selectVisible = true
    },
    submitSelect(data) {
      // 去重
      /* const differenceArr = _.differenceBy(data, this.userList, 'identityCardNumber')
      this.userList = [...this.userList, ...differenceArr] */
      this.userList = [...data]
      this.selectVisible = false
    },
    // 点击人员跳转
    handleTagClick(item) {},
    async submit() {
      await this.$refs.form.validate()
      const params = {
        ...this.form,
        relevanceIdentityCardNumberList: this.userList.map(item => item.identityCardNumber)
      }
      if (!this.id) {
        await Api.addEvent(params)
        this.$message.success('创建成功')
      } else {
        await Api.updateEvent(params)
        this.$message.success('修改成功')
      }
      this.$back()
    }
  }
}
</script>

<style scoped lang="less">
.tag-wrapper {
  /deep/.el-tag {
    &:hover {
      cursor: pointer;
    }
  }
}
.input-address {
  display: flex;
  align-items: center;
}
</style>
