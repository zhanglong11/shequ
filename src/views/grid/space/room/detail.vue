<template>
  <div class="container">
    <el-form label-width="95px">
      <h3>基本信息</h3>
      <el-form-item label="所属区域">
        <span>{{ form.regionName }}</span>
      </el-form-item>
      <el-form-item label="所属建筑">
        <span>{{ form.buildName }}</span>
      </el-form-item>
      <el-form-item label="所属单元">
        <span>{{ form.unitName }}</span>
      </el-form-item>
      <el-form-item label="所属楼层">
        <span>{{ form.floorName }}</span>
      </el-form-item>
      <el-form-item label="房间号">
        <span>{{ form.name }}</span>
      </el-form-item>
      <el-form-item label="房间状态">
        <span>{{ $getLabel(roomStatusOptions, form.status) }}</span>
      </el-form-item>
      <el-form-item label="建筑面积">
        <span>{{ form.area }}m²</span>
      </el-form-item>
      <h3>
        <span>业主信息</span>
      </h3>
      <vxe-table :data="form.ownerList">
        <vxe-table-column field="name" title="姓名"></vxe-table-column>
        <vxe-table-column field="sex" title="性别" formatter="sex"></vxe-table-column>
        <vxe-table-column field="phone" title="手机号"></vxe-table-column>
        <vxe-table-column field="identityCardNumber" title="身份证"></vxe-table-column>
        <vxe-table-column title="操作">
          <template #default="{ row }">
            <router-link :to="'/grid/resident/' + row.identityCardNumber + '/detail'">查看详情</router-link>
          </template>
        </vxe-table-column>
      </vxe-table>
      <h3 style="margin-top: 15px">
        <span>居住信息</span>
      </h3>
      <vxe-table :data="form.residentList">
        <vxe-table-column field="name" title="姓名"></vxe-table-column>
        <vxe-table-column field="sex" title="性别" formatter="sex"></vxe-table-column>
        <vxe-table-column field="phone" title="手机号"></vxe-table-column>
        <vxe-table-column field="identityCardNumber" title="身份证"></vxe-table-column>
        <vxe-table-column field="ownersRelationshipName" title="与业主关系"></vxe-table-column>
        <vxe-table-column title="操作">
          <template #default="{ row }">
            <router-link :to="'/grid/resident/' + row.identityCardNumber + '/detail'">查看详情</router-link>
          </template>
        </vxe-table-column>
      </vxe-table>

      <footer-button>
        <el-button @click="$back">取消</el-button>
      </footer-button>
    </el-form>
  </div>
</template>

<script>
import { buildingsTypeOptions, roomStatusOptions } from '../../lib/options'
import { getRoomById } from '@/api/grid/space'

export default {
  name: 'GridRoom',
  components: {},
  data() {
    return {
      id: this.$route.params.id,
      form: {
        floorId: this.$route.query.floorId,
        ownerList: [],
        residentList: []
      },
      list: [],
      buildingsTypeOptions,
      roomStatusOptions
    }
  },
  computed: {},
  created() {
    if (this.id) {
      this.refresh()
    }
  },
  mounted() {},
  methods: {
    refresh() {
      getRoomById(this.id).then(res => {
        this.form = res.data
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.el-form {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  .el-form-item {
    width: 33.3%;
    padding-right: 15px;
  }
  .vxe-table {
    width: 100%;
  }
  h3 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    a {
      font-size: 14px;
    }
    ::v-deep .el-dialog {
      font-weight: normal;
    }
  }
}
</style>
