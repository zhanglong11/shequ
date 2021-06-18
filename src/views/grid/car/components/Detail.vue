<template>
  <el-dialog width="850px" title="车辆详情" class="beauty" :visible="visible" @close="close">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="车牌号" prop="licensePlateNumber">
        <span>{{ form.licensePlateNumber }}</span>
      </el-form-item>
      <el-form-item label="车辆所属" prop="ownershipFlag">
        <span>{{ $getLabel(carBelongType, form.ownershipFlag) }}</span>
      </el-form-item>
      <el-form-item label="个人/企业" prop="ownershipDataName">
        <span>{{ form.ownershipDataName }}</span>
      </el-form-item>
      <el-form-item label="车辆类型" prop="type">
        <span>{{ form.typeName }}</span>
      </el-form-item>
      <el-form-item label="联系电话" prop="mobile">
        <span>{{ form.mobile }}</span>
      </el-form-item>
      <el-form-item label="日常停放地点" prop="dailyParkingPlace">
        <span>{{ form.dailyParkingPlace }}</span>
      </el-form-item>
      <el-form-item label-width="0" style="width: 100%" prop="pictureFileId">
        <img :key="form.pictureFileId" :src="form.pictureFileId | imgUrl" alt="" />
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { carBelongType } from '../../lib/options'
import { getCarById } from '@/api/grid/car'

export default {
  name: 'CarDetail',
  components: {},
  props: {
    id: {
      type: String,
      default: null
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      form: {},
      carBelongType
    }
  },
  watch: {
    visible(val) {
      if (val && this.id) this.refresh()
    }
  },
  created() {},
  mounted() {},
  methods: {
    async refresh() {
      this.form = await getCarById(this.id).then(res => res.data)
    },
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
img {
  max-width: 100%;
}
.el-form {
  display: flex;
  flex-wrap: wrap;
}
.el-form-item {
  width: 25%;
}
</style>
