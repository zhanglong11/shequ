<template>
  <div class="container">
    <Aside v-model="activeId"></Aside>
    <div class="main-content">
      <el-form ref="form" :rules="rules" :model="form" label-width="100px">
        <h3>基本信息</h3>
        <el-form-item label="网格名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="所属上级" prop="parentId">
          <SelectGridDepartment
            v-model="form.parentId"
            :disabled-keys="form.id ? [form.id] : null"
          ></SelectGridDepartment>
        </el-form-item>
        <el-form-item label="网格面积" prop="area">
          <InputNumber v-model="form.area" unit="m²"></InputNumber>
        </el-form-item>
        <el-form-item label="网格长" prop="master">
          <el-input v-model="form.master"></el-input>
        </el-form-item>
        <el-form-item label="网格长手机号" prop="masterMobile">
          <el-input v-model="form.masterMobile"></el-input>
        </el-form-item>
        <el-form-item label="网格颜色" prop="color">
          <el-color-picker v-model="form.color" :predefine="predefineColors"></el-color-picker>
        </el-form-item>
        <el-form-item label="网格管理员" prop="administrators">
          <el-input v-model="form.administrators"></el-input>
        </el-form-item>
        <el-form-item label="管理员手机号" prop="administratorsMobile">
          <el-input v-model="form.administratorsMobile"></el-input>
        </el-form-item>
        <el-form-item label="网格协管员" prop="trafficAssistant">
          <el-input v-model="form.trafficAssistant"></el-input>
        </el-form-item>
        <el-form-item label="协管员手机号" prop="trafficAssistantMobile">
          <el-input v-model="form.trafficAssistantMobile"></el-input>
        </el-form-item>
        <el-form-item label="网格警务员" prop="policeOfficer">
          <el-input v-model="form.policeOfficer"></el-input>
        </el-form-item>
        <el-form-item label="警务员手机号" prop="policeOfficerMobile">
          <el-input v-model="form.policeOfficerMobile"></el-input>
        </el-form-item>
        <el-form-item label="网格监督员" prop="supervisor">
          <el-input v-model="form.supervisor"></el-input>
        </el-form-item>
        <el-form-item label="监督员手机号" prop="supervisorMobile">
          <el-input v-model="form.supervisorMobile"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
        <h3>网格范围</h3>
        <el-form-item label-width="0" style="width: 100%">
          <OLMap
            ref="olmap"
            edit
            style="height: 500px"
            multiple
            multipleEdit
            :value="activeId"
            :multiplePoint.sync="mapMultiplePoint"
            :mapAdd="mapAdd"
            :mapDelete="mapDelete"
            :gridName="form.name"
            :color="form.color"
            :point.sync="form.points"
            :center.sync="form.centerPoint"
            :area.sync="form.area"
            @girdClick="girdClick"
          ></OLMap>
          <!-- <OLMap
            ref="olmap"
            :color="form.color"
            :gridName="form.name"
            edit
            style="height: 500px"
            :point.sync="form.points"
            :center.sync="form.centerPoint"
            :area.sync="form.area"
            :mapAdd="mapAdd"
            :mapDelete="mapDelete"
          ></OLMap> -->
        </el-form-item>
      </el-form>
      <footer-button>
        <el-button v-if="form.id && $hasPower('GridStructUpdate')" v-promise-btn type="primary" @click="submit"
          >保存</el-button
        >
        <el-button v-else-if="$hasPower('GridStructCreate')" v-promise-btn type="primary" @click="submit"
          >创建</el-button
        >
        <el-button v-if="form.id && $hasPower('GridStructRemove')" v-promise-btn type="danger" @click="remove"
          >删除</el-button
        >
      </footer-button>
    </div>
  </div>
</template>

<script>
import Aside from './components/Aside'
import SelectGridDepartment from '../components/SelectGridDepartment'
import GirdApi from '@/views/bigScreen/api/gird'
import {
  createOrganization,
  getOrganizationById,
  removeOrganizationById,
  updateOrganization
} from '@/api/grid/department'
import anyRule from '@/lib/anyRule'

export default {
  name: 'GridStruct',
  components: { Aside, SelectGridDepartment },
  data() {
    return {
      activeId: null,
      form: {
        color: '#ff0000'
      },
      mapMultiplePoint: [],
      rules: {
        name: [{ required: true, message: '必填' }],
        parentId: [{ required: true, message: '必填' }],
        masterMobile: [{ pattern: anyRule.mobile, message: '手机号不合法' }],
        administratorsMobile: [{ pattern: anyRule.mobile, message: '手机号不合法' }],
        trafficAssistantMobile: [{ pattern: anyRule.mobile, message: '手机号不合法' }],
        policeOfficerMobile: [{ pattern: anyRule.mobile, message: '手机号不合法' }],
        supervisorMobile: [{ pattern: anyRule.mobile, message: '手机号不合法' }]
      },
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsv(51, 100, 98)',
        'hsva(120, 40, 94, 0.5)',
        'hsl(181, 100%, 37%)',
        'hsla(209, 100%, 56%, 0.73)',
        '#c7158577'
      ],
      mapAdd: true,
      mapDelete: false
    }
  },
  watch: {
    activeId(val) {
      if (val) this.refresh()
      else {
        this.form = _.cloneDeep(this.initForm)
        this.$refs.form.resetFields()
      }
    }
  },
  created() {
    this.initForm = _.cloneDeep(this.form)
    this.getGirdPlate()
  },
  mounted() {},
  methods: {
    refresh() {
      getOrganizationById(this.activeId).then(res => {
        const datas = res.data
        this.form = datas
      })
    },
    async submit() {
      await this.$refs.olmap.saveDrawPolygon()
      await this.$refs.form.validate()
      this.form.id ? await updateOrganization(this.form) : await createOrganization(this.form)
      this.$message.success(this.form.id ? '修改成功' : '创建成功')
      await this.$store.dispatch('grid/getStructTreeData')
      this.getGirdPlate()
    },
    async remove() {
      await this.$remove(this.form)
      await removeOrganizationById(this.form.id)
      this.$message.success('删除成功')
      this.activeId = null
      await this.$store.dispatch('grid/getStructTreeData')
    },
    // 网格板块信息集合
    async getGirdPlate() {
      const result = await GirdApi.getGirdPlate()
      const datas = result.data
      const multiplePoint = []
      datas.forEach(e => {
        if (e.centerPoint && e.points) {
          multiplePoint.push({
            gridId: e.id,
            id: `grid_${e.wbsCode}_${e.id}`,
            color: e.color,
            gridName: e.name,
            centerPoint: e.centerPoint ? e.centerPoint.split(',') : [],
            points: e.points ? e.points.split(',') : [],
            area: e.area
          })
        }
      })
      this.mapMultiplePoint = multiplePoint
    },
    // 网格点击事件
    girdClick(wbsCode, id) {
      this.mapDelete = false
      if (id === this.activeId) {
        this.mapDelete = true
      }
      // console.log(111, wbsCode, id, this.activeId)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.container {
  display: flex;
}
.aside {
  width: 300px;
  border-right: 1px solid #eee;
  margin-right: 15px;
  padding-right: 15px;
}
.main-content {
  flex: 1;
  .el-form {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      width: 33.3%;
      padding-right: 15px;
    }
  }
}
</style>
