<template>
  <div class="input-address">
    <el-cascader :value="computedValue" style="width: 300px" :options="addressList" filterable @change="handleChange" />
    <el-input
      v-model="computedAddress"
      :maxlength="50"
      class="ml10"
      @input="handleAddressInput"
      @change="calculateLocation(true)"
    />
    <i class="el-icon-location" @click="mapDialogVisible = true" />
    <el-dialog
      v-if="mapDialogVisible"
      custom-class="map-container"
      title="地图选点"
      :visible.sync="mapDialogVisible"
      width="1000px"
    >
      <div class="map-container">
        <CommonMap
          :lng.sync="computedLng"
          :lat.sync="computedLat"
          :address.sync="computedAddress"
          :pcaLabel.sync="computedValueLabel"
          :pca.sync="computedValue"
          @close="mapDialogVisible = false"
        ></CommonMap>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pca, { getPcaName } from '@/lib/pca'
import treeFind from '@/utils/treeFind'
import axios from 'axios'
const tk = window.tk
export default {
  name: 'InputAddress',
  components: {},
  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },
  props: {
    province: {
      type: String,
      default: ''
    },
    city: {
      type: String,
      default: ''
    },
    district: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      addressList: pca,
      mapDialogVisible: false,
      computedLng: this.location ? this.location.split(',')[0] : '',
      computedLat: this.location ? this.location.split(',')[1] : '',
      computedAddress: this.address || '',
      computedValueLabel: ''
    }
  },
  computed: {
    computedValue: {
      get: function () {
        return [this.province, this.city, this.district]
      },
      // setter
      set: function (val) {
        if (!val.length || _.every(val, item => _.isNil(item))) return
        this.$emit('update:province', val[0])
        this.$emit('update:city', val[1])
        this.$emit('update:district', val[2])
      }
    }
  },
  watch: {
    location(val) {
      if (val) {
        this.computedLng = val.split(',')[0]
        this.computedLat = val.split(',')[1]
      } else {
        this.computedLng = ''
        this.computedLat = ''
      }
    },
    address() {
      this.computedAddress = this.address
    },
    computedLng(val) {
      if (!val) return
      this.$emit('update:location', `${this.computedLng},${this.computedLat}`)
      this.$emit('update:address', this.computedAddress)
    },
    computedAddress(val) {
      if (!val) return
      this.$emit('update:address', this.computedAddress)
    },
    computedValue: {
      immediate: true,
      deep: true,
      async handler(val) {
        if (!val.length || _.every(val, item => _.isNil())) return
        await this.$nextTick()
        const province = treeFind(this.addressList, item => item.value === this.province).label
        const city = treeFind(this.addressList, item => item.value === this.city).label
        const district = treeFind(this.addressList, item => item.value === this.district).label
        this.computedValueLabel = province + city + district
      }
    }
  },
  created() {},
  methods: {
    async handleChange([province, city, district]) {
      this.$emit('update:address', '')
      this.$emit('update:province', province)
      this.$emit('update:city', city)
      this.$emit('update:district', district)
      await this.$nextTick()
      await this.calculateLocation(false)
    },
    handleAddressInput(value) {
      this.$emit('update:address', value)
      if (this.elFormItem?.validate) {
        this.$nextTick().then(() => {
          this.elFormItem.validate()
        })
      }
    },
    async calculateLocation(hasAddr = true) {
      const addr =
        getPcaName(this.province) +
        getPcaName(this.city) +
        getPcaName(this.district) +
        (hasAddr ? this.computedAddress : '')
      const res = await axios.get(`http://api.tianditu.gov.cn/geocoder?ds={"keyWord":"${addr}"}&tk=${tk}`)
      this.$emit('update:location', res.data.location.lon + ',' + res.data.location.lat)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.input-address {
  display: flex;
  align-items: center;
}
.el-icon-location {
  font-size: 20px;
  color: $primary-color;
}
::v-deep .el-dialog {
  .el-dialog__body {
    padding: 0;
  }
}
.map-container {
  min-height: 400px;
  height: 0;
  position: relative;
}
::v-deep .tdt-search {
  color: red;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  max-height: 100%;
  overflow: auto;
}
</style>
