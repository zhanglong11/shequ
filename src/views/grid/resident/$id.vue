<template>
  <div class="container">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <h3>基本信息</h3>
      <el-form-item label="照片" prop="headImage" style="width: 100%">
        <UploadImage v-model="form.headImage" :limit="1"></UploadImage>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" @change="handleRealNameChange"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <Select v-model="form.sex" :options="sexOptions" radio></Select>
      </el-form-item>
      <el-form-item label="出生年月" prop="birthday">
        <el-date-picker v-model="form.birthday" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      <el-form-item label="身份证" prop="identityCardNumber">
        <el-input v-model="form.identityCardNumber"></el-input>
      </el-form-item>
      <el-form-item label="籍贯" prop="nativePlace">
        <el-input v-model="form.nativePlace"></el-input>
      </el-form-item>
      <el-form-item label="民族" prop="nationCode">
        <Select v-model="form.nationCode" arg-group="nation"></Select>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="家庭住址" prop="familyAddress">
        <el-input v-model="form.familyAddress"></el-input>
      </el-form-item>
      <el-form-item label="工作单位" prop="workCompany">
        <el-input v-model="form.workCompany"></el-input>
      </el-form-item>
      <el-form-item label="人口类型" prop="type">
        <Select v-model="form.type" :options="residentTypeOptions"></Select>
      </el-form-item>
      <el-form-item label="户籍性质" prop="status">
        <Select v-model="form.status" :options="residentStatusOptions"></Select>
      </el-form-item>
      <el-form-item label="婚姻状况" prop="maritalStatus">
        <Select v-model="form.maritalStatus" :options="maritalStatusOptions"></Select>
      </el-form-item>
      <el-form-item label="学历" prop="educationCode">
        <Select v-model="form.educationCode" arg-group="educationCode"></Select>
      </el-form-item>
      <el-form-item label="政治面貌" prop="politicsStatus">
        <Select v-model="form.politicsStatus" arg-group="politicalStatus"></Select>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
      <h3>
        房间信息
        <el-button style="float: right" type="text" @click="linkRoomDialogVisible = true">+ 关联房间</el-button>
      </h3>
      <vxe-table style="width: 100%" :data="form.roomList">
        <vxe-table-column title="所属网格" field="orgName"></vxe-table-column>
        <vxe-table-column title="所属区域" field="regionName"></vxe-table-column>
        <vxe-table-column title="详细地址" field="todo">
          <template #default="{ row }">
            {{ row.buildName }}-{{ row.unitName }}-{{ row.floorName }}-{{ row.roomName || row.name }}
          </template>
        </vxe-table-column>
        <vxe-table-column title="租住状态" field="status" :formatter="$getLabelV(roomStatusOptions)"></vxe-table-column>
        <vxe-table-column
          title="业主"
          field="ownerList"
          :formatter="({ cellValue }) => cellValue.map(item => item.name).join(',')"
        ></vxe-table-column>
        <vxe-table-column title="操作" width="160">
          <template #default="{ row, rowIndex }">
            <button-link type="text" :to="`/grid/room/${row.id || row.roomId}/detail`">查看详情</button-link>
            <el-button type="text" @click="form.roomList.splice(rowIndex, 1)">删除</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </el-form>
    <footer-button>
      <el-button size="large" @click="$back">取消</el-button>
      <el-button v-promise-btn size="large" type="primary" @click="submit">{{ !!id ? '保存' : '创建' }}</el-button>
    </footer-button>
    <LinkRoom :visible.sync="linkRoomDialogVisible" @change="handleAddRoom"></LinkRoom>
  </div>
</template>

<script>
import anyRule from '@/lib/anyRule'
import { maritalStatusOptions, sexOptions } from '@/lib/otions'
import { residentStatusOptions, residentTypeOptions, roomStatusOptions } from '../lib/options'
import { getResidentById, updateResident, createResident } from '@/api/grid/resident'
import LinkRoom from '@/views/grid/components/LinkRoom'
import { getRoomById } from '@/api/grid/space'
export default {
  name: 'GridResidentEdit',
  components: { LinkRoom },
  data() {
    return {
      id: this.$route.params.id,
      form: {
        roomList: []
      },
      sexOptions,
      residentTypeOptions,
      residentStatusOptions,
      maritalStatusOptions,
      roomStatusOptions,
      rules: {
        name: [{ required: true, message: '必填' }],
        sex: [{ required: true, message: '必填' }],
        birthday: [{ required: true, message: '必填' }],
        identityCardNumber: [
          { required: true, message: '必填' },
          { pattern: anyRule.identityNumber, message: '不合法' }
        ],
        nativePlace: [{ required: true, message: '必填' }],
        nationCode: [{ required: true, message: '必填' }],
        phone: [{ pattern: anyRule.mobile, message: '不合法' }],
        familyAddress: [{ required: true, message: '必填' }],
        type: [{ required: true, message: '必填' }],
        status: [{ required: true, message: '必填' }]
      },
      matched: false, // 是否从人员库中找到了当前添加的人
      linkRoomDialogVisible: false
    }
  },
  created() {
    this.id && this.refresh()
  },
  mounted() {},
  methods: {
    refresh() {
      getResidentById(this.id).then(res => {
        this.form = res.data
      })
    },
    async submit() {
      await this.$refs.form.validate()
      if (!this.id) {
        await createResident(this.form)
        this.$message.success('创建成功')
      } else {
        await updateResident(this.form)
        this.$message.success('修改成功')
      }
      this.$back()
      await this.$store.dispatch('tagsView/delView', this.$route)
    },
    handleRealNameChange(user) {
      this.matched = true
      this.form = Object.assign(this.form, user)
    },
    async handleAddRoom(room) {
      if (_.find(this.form.roomList, { roomId: room.id })) {
        this.$message.error('已添加过该房间')
      } else {
        room = await getRoomById(room.id).then(res => res.data)
        room.roomId = room.id
        this.form.roomList.push(room)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.el-form {
  display: flex;
  flex-wrap: wrap;
  .el-form-item {
    width: 33.3%;
    padding-right: 15px;
  }
  .el-date-editor {
    width: 100%;
  }
}
</style>
