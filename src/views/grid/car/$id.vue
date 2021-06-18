<template>
  <div class="container">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="照片" prop="pictureFileId">
        <UploadImage v-model="form.pictureFileId" :limit="1"></UploadImage>
      </el-form-item>
      <el-form-item label="车牌号" prop="licensePlateNumber">
        <InputLicensePlate v-model="form.licensePlateNumber"> </InputLicensePlate>
      </el-form-item>
      <el-form-item label="车辆类型" prop="type">
        <Select v-model="form.type" arg-group="carType"></Select>
      </el-form-item>
      <el-form-item label="联系电话" prop="mobile">
        <el-input v-model="form.mobile"></el-input>
      </el-form-item>
      <el-form-item label="车辆所属" prop="ownershipFlag">
        <Select
          v-model="form.ownershipFlag"
          :options="carBelongType"
          radio
          @input="form.ownershipDataId = null"
        ></Select>
      </el-form-item>
      <el-form-item v-if="form.ownershipFlag === 1" label="个人" prop="ownershipDataId">
        <SelectCommunityUser v-model="form.ownershipDataId" :label="form.ownershipDataName"></SelectCommunityUser>
      </el-form-item>
      <el-form-item v-else label="企业" prop="ownershipDataId">
        <SelectCommunityCompany v-model="form.ownershipDataId"></SelectCommunityCompany>
      </el-form-item>
      <el-form-item label="日常停放地点" prop="dailyParkingPlace">
        <el-input v-model="form.dailyParkingPlace"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
      <footer-button>
        <el-button @click="$back">取消</el-button>
        <el-button v-promise-btn type="primary" @click="submit">{{ id ? '保存' : '创建' }}</el-button>
      </footer-button>
    </el-form>
  </div>
</template>

<script>
import { carBelongType } from '@/views/grid/lib/options'
import anyRule from '@/lib/anyRule'
import { createCar, getCarById, updateCar } from '@/api/grid/car'

export default {
  name: 'Edit',
  components: {},
  data() {
    return {
      id: this.$route.params.id,
      form: {
        ownershipFlag: 1
      },
      carBelongType,
      rules: {
        pictureFileId: [{ required: true, message: '必填' }],
        licensePlateNumber: [
          { required: true, message: '必填' },
          { pattern: anyRule.licensePlateNumber, message: '不合法' }
        ],
        type: [{ required: true, message: '必填' }],
        mobile: [
          { required: true, message: '必填' },
          { pattern: anyRule.mobile, message: '不合法' }
        ],
        ownershipFlag: [{ required: true, message: '必填' }],
        ownershipDataId: [{ required: true, message: '必填' }]
      }
    }
  },
  created() {
    this.id && this.refresh()
  },
  mounted() {},
  methods: {
    refresh() {
      getCarById(this.id).then(res => {
        this.form = res.data
      })
    },
    async submit() {
      await this.$refs.form.validate()
      if (!this.id) {
        await createCar(this.form)
        this.$message.success('创建成功')
      } else {
        await updateCar(this.form)
        this.$message.success('修改成功')
      }
      this.$back()
      await this.$store.dispatch('tagsView/delView', this.$route)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.el-form {
  max-width: 800px;
}
</style>
