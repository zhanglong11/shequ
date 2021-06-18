<template>
  <div class="container">
    <h3>基本信息</h3>
    <el-form ref="form" :model="form" :rules="rules" label-width="144px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="统一社会信用代码" prop="unifiedSocialCreditCode">
            <el-select
              v-model="form.unifiedSocialCreditCode"
              placeholder="请输入关键词"
              filterable
              remote
              :remote-method="getGridEnterpriseList"
              :loading="searchLoading"
              style="width: 100%"
              :disabled="form.id ? true : false"
              @change="handleChange"
            >
              <el-option
                v-for="(enterpriseItem, index) in enterpriseList"
                :key="index"
                :label="enterpriseItem.unifiedSocialCreditCode"
                :value="enterpriseItem.unifiedSocialCreditCode"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商户名称" prop="name">
            <el-input v-model="enterpriseInfo.name" :disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="法人" prop="person">
            <el-input v-model="enterpriseInfo.person" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="商户类型" prop="type">
            <el-select v-model="form.type" multiple style="width: 100%">
              <el-option
                v-for="(item, index) in merchantTypeList"
                :key="index"
                :label="item.argText"
                :value="item.argCode"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="营业时间" prop="openTime">
            <el-input v-model="form.openTime" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="地址" prop="address">
            <!--<el-input v-model="form.address" placeholder="请输入" />-->
            <InputAddress
              :province.sync="form.province"
              :city.sync="form.city"
              :district.sync="form.district"
              :address.sync="form.address"
              :location.sync="form.location"
            ></InputAddress>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="商户图片" required>
            <el-upload
              :action="action"
              :headers="headers"
              list-type="picture-card"
              :file-list="fileList"
              :on-error="handleError"
              :on-success="handleSuccess"
              :on-remove="handleRemove"
              :on-preview="handlePreview"
              :before-upload="beforeUpload"
              :accept="suffix"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input v-model="form.remark" type="textarea" resize="none" :rows="3" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div class="btn-con">
      <el-button type="primary" :loading="btnLoading" @click="handleSave">保存</el-button>
      <el-button @click="handleBack">返回</el-button>
    </div>

    <!-- 图片预览模态框组件 start -->
    <ModalImgPreview :visible.sync="visibleImg" :imgUrl="imgUrl" />
    <!-- 图片预览模态框组件 end -->
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { fileUploadUrl } from '@/plugins/axios'
import Api from '@/api/handyService'
import { getFileUrlByIds } from '@/api/file'
import { getGroupArgByArgGroup } from '@/api/system/args'
import anyRules from '@/lib/anyRule'
import ModalImgPreview from '../components/ModalImgPreview'
import InputAddress from '@/views/grid/components/InputAddress'
export default {
  components: { ModalImgPreview, InputAddress },
  data() {
    return {
      id: this.$route.params.id || '',
      merchantTypeList: [],
      action: fileUploadUrl,
      headers: {
        'x-access-token': getToken()
      },
      fileList: [],
      suffix: '.png,.jpg,.jpeg',
      form: {
        id: '',
        unifiedSocialCreditCode: '',
        type: [],
        openTime: '',
        phone: '',
        province: '',
        city: '',
        district: '',
        address: '',
        location: '',
        remark: ''
      },
      rules: {
        unifiedSocialCreditCode: [{ required: true, message: '必填' }],
        type: [{ required: true, message: '必选' }],
        openTime: [{ required: true, message: '必填' }],
        phone: [
          { required: true, message: '必填' },
          { pattern: anyRules.mobile, message: '请输入正确的手机号' }
        ],
        address: [{ required: true, message: '必填' }]
      },
      fileIdArray: [],
      btnLoading: false,
      visibleImg: false,
      imgUrl: '',
      enterpriseList: [], // 企业列表
      searchLoading: false,
      enterpriseInfo: {
        name: '',
        person: '',
        id: ''
      }
    }
  },
  mounted() {
    // 商户类型下拉框数据填充
    getGroupArgByArgGroup('merchantType').then(res => {
      // console.log(res)
      if (res.data && res.data.length) {
        this.merchantTypeList = res.data
        if (this.id) {
          // console.log(this.id)
          this.getMerchantDetail(this.id)
        }
      }
    })
  },
  methods: {
    // 获取企业信息列表
    getGridEnterpriseList: _.debounce(function (query) {
      this.enterpriseList = []
      if (query === '') {
        this.form.unifiedSocialCreditCode = ''
        this.enterpriseInfo = {
          name: '',
          person: '',
          id: ''
        }
        return
      }
      const params = {
        unifiedSocialCreditCode: query,
        page: 0,
        rows: 0
      }
      this.searchLoading = true
      Api.getGridEnterpriseList(params).then(res => {
        this.searchLoading = false
        if (res.data && res.data.records && res.data.records.length) {
          this.enterpriseList = res.data.records
        }
      })
    }, 100),
    // 社会信用代码下拉框变更
    handleChange(val) {
      for (let i = 0; i < this.enterpriseList.length; i++) {
        if (val === this.enterpriseList[i].unifiedSocialCreditCode) {
          this.enterpriseInfo.name = this.enterpriseList[i].name
          this.enterpriseInfo.person = this.enterpriseList[i].legalPerson
          this.enterpriseInfo.id = this.enterpriseList[i].id
          break
        }
      }
    },
    // 获取商户信息详情
    async getMerchantDetail(id) {
      const res = await Api.getMerchantDetail(id)
      // console.log(res)
      this.form.id = res.data.id
      this.form.unifiedSocialCreditCode = res.data.unifiedSocialCreditCode
      this.form.type = res.data.type.split(',')
      this.form.openTime = res.data.openTime
      this.form.phone = res.data.phone
      this.form.province = res.data.province
      this.form.city = res.data.city
      this.form.district = res.data.district
      this.form.location = res.data.location
      this.form.address = res.data.address
      this.form.remark = res.data.remark
      // 企业信息回显
      this.enterpriseInfo = {
        name: res.data.name,
        person: res.data.legalPerson,
        id: res.data.enterpriseId
      }
      // 图片文件信息回显
      getFileUrlByIds(res.data.fileIds.split(',')).then(res => {
        // console.log(res)
        if (res.data && res.data.length) {
          const fileArray = res.data
          for (let i = 0; i < fileArray.length; i++) {
            this.fileList.push({
              name: fileArray[i].fileName,
              url: fileArray[i].fileUrl,
              response: {
                data: fileArray[i].id
              }
            })
            this.fileIdArray.push(fileArray[i].id)
          }
        }
      })
    },
    // 图片上传失败
    handleError(error) {
      this.$message.error(error.status + '：' + error.message)
    },
    // 图纸上传成功
    handleSuccess(res, file, fileList) {
      // console.log(res)
      // console.log(file)
      // console.log(fileList)
      if (res.code === 200) {
        // this.$message.success('上传成功')
        this.fileIdArray.push(res.data)
      } else {
        this.$message.error('文件上传失败，请联系管理员')
        fileList.pop()
      }
      // console.log(file)
    },
    // 图片删除
    handleRemove(file, fileList) {
      // console.log(file)
      let index = null
      for (let i = 0; i < this.fileIdArray.length; i++) {
        if (this.fileIdArray[i] === file.response.data) {
          index = i
          break
        }
      }
      if (index !== null) {
        this.fileIdArray.splice(index, 1)
      }
    },
    // 图片上传前
    beforeUpload(file) {
      // console.log(file)
      const suffixArr = this.suffix.split(',')
      const curSuffix = file.name.substring(file.name.lastIndexOf('.'), file.name.length)
      if (suffixArr.includes(curSuffix.toLowerCase())) {
        return true
      } else {
        this.$message.error('仅支持' + this.suffix + '格式的文件')
        return false
      }
    },
    // 图片预览
    handlePreview(file) {
      // console.log(file)
      this.imgUrl = file.url
      this.visibleImg = true
    },
    // 保存
    handleSave() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.fileIdArray.length === 0) {
            this.$message.error('请上传图片，再做该操作')
            return
          }
          const params = {
            id: this.form.id,
            province: this.form.province,
            city: this.form.city,
            district: this.form.district,
            address: this.form.address,
            location: this.form.location,
            companyId: this.$store.state.user.companyId,
            enterpriseId: this.enterpriseInfo.id,
            fileIds: this.fileIdArray.join(','),
            openTime: this.form.openTime,
            phone: this.form.phone,
            remark: this.form.remark,
            type: this.form.type.join(',')
          }
          this.btnLoading = true
          if (this.id) {
            // 修改
            // console.log(params)
            Api.updateMerchant(params).then(
              res => {
                this.$message.success('操作成功')
                this.btnLoading = false
                this.$back()
              },
              err => {
                console.log(err)
                this.btnLoading = false
              }
            )
          } else {
            // 新增
            // console.log(params)
            Api.addMerchant(params).then(
              res => {
                this.$message.success('操作成功')
                this.btnLoading = false
                this.$back()
              },
              err => {
                console.log(err)
                this.btnLoading = false
              }
            )
          }
        }
      })
    },
    // 返回
    handleBack() {
      this.$back()
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-loading-spinner {
  margin-top: -16px;
}
h3 {
  margin-bottom: 10px;
}
.btn-con {
  text-align: center;
}

/deep/ .el-upload-list img {
  width: 148px !important;
  height: 148px !important;
  object-fit: contain;
}
</style>
