<template>
  <div>
    <div @click="visible = true">
      <slot>
        <el-input disabled :value="text">
          <template slot="append">点击选择</template>
        </el-input>
      </slot>
    </div>

    <el-dialog :visible.sync="visible" class="beauty" width="1200px" title="选择居民">
      <div class="wrap">
        <CommunityTree
          v-model="filterForm.nodeId"
          :type.sync="filterForm.nodeType"
          class="scroll-beauty aside"
        ></CommunityTree>
        <div class="main-content">
          <div class="tooltips">
            <el-form inline>
              <el-form-item>
                <el-input v-model="filterForm.name" placeholder="请输入企业名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input
                  v-model="filterForm.unifiedSocialCreditCode"
                  style="width: 200px"
                  placeholder="请输入统一社会信用代码"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="filterForm.legalPerson" placeholder="请输入法人"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
                <el-button icon="el-icon-refresh-left" @click="$refs.table.reset()">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
          <Grid
            ref="table"
            :request="request"
            :filterForm.sync="filterForm"
            :radioConfig="{
              highlight: true,
              trigger: 'row',
              checkRowKey: checkRowKeys
            }"
            :checkboxConfig="{
              checkRowKeys: checkRowKeys,
              highlight: true,
              reserve: true,
              range: true,
              trigger: 'row'
            }"
            @checkboxChange="handleCheckboxChange"
            @radioChange="handleRadioChange"
          >
            <vxe-table-column v-if="!multiple" key="1" type="radio" width="60px"></vxe-table-column>
            <vxe-table-column v-else key="2" type="checkbox" width="60px"></vxe-table-column>
            <vxe-table-column title="企业名称" field="name"></vxe-table-column>
            <vxe-table-column title="统一社会信用代码" field="unifiedSocialCreditCode"></vxe-table-column>
            <vxe-table-column title="企业类型" field="companyTypeName"></vxe-table-column>
            <vxe-table-column title="行业类别" field="companyIndustryName"></vxe-table-column>
            <vxe-table-column title="法人" field="legalPerson"></vxe-table-column>
            <vxe-table-column title="联系人" field="linkman"></vxe-table-column>
            <vxe-table-column title="联系电话" width="120" field="linkmanMobile"></vxe-table-column>
          </Grid>
        </div>
      </div>
      <footer slot="footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </footer>
    </el-dialog>
  </div>
</template>

<script>
import { residentStatusOptions, residentTypeOptions } from '@/views/grid/lib/options'
import { sexOptions } from '@/lib/otions'
import { getEnterpriseById, getEnterpriseList } from '@/api/grid/company'
export default {
  name: 'SelectCommunityCompany',
  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      visible: false,
      filterForm: {},
      request: getEnterpriseList,
      sexOptions,
      residentTypeOptions,
      residentStatusOptions,
      checkedList: [],
      radioRecord: null,
      text: ''
    }
  },
  computed: {
    checkRowKeys() {
      return this.value ? this.value.split(',') : null
    }
  },
  watch: {
    label: {
      immediate: true,
      handler(val) {
        if (!this.text) {
          this.text = val
        }
      }
    },
    value: {
      immediate: true,
      handler(val) {
        if (val && !this.text && !this.multiple) {
          getEnterpriseById(val).then(res => {
            this.text = res.data.name
          })
        }
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    refresh() {
      this.$refs.table.refresh()
    },
    handleCheckboxChange(list) {
      this.checkedList = list
    },
    handleRadioChange(record) {
      this.radioRecord = record
    },
    submit() {
      if (this.multiple) {
        this.text = _.map(this.checkedList, 'name').join(',')
        this.$emit('input', _.map(this.checkedList, 'id').join(','))
        this.$emit('change', this.checkedList)
      } else {
        this.text = this.radioRecord.name
        this.$emit('input', this.radioRecord.id)
        this.$emit('change', this.radioRecord)
      }
      if (this.elFormItem?.validate) {
        this.$nextTick().then(() => {
          this.elFormItem.validate()
        })
      }
      this.visible = false
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.wrap {
  display: flex;
}
.aside {
  width: 260px;
  border-right: 1px solid #eee;
  margin-right: 15px;
  padding-right: 15px;
  max-height: calc(100vh - 210px);
  overflow: auto;
}
.main-content {
  flex: 1;
  overflow: auto;
}
</style>
