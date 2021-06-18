<template>
  <div class="container">
    <h3>基本信息</h3>
    <el-form label-width="140px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="商户图片">
            <ul class="picture">
              <li v-for="(item, index) in imgList" :key="index">
                <img :src="item.url" />
                <div class="mask">
                  <i class="el-icon-zoom-in" @click="handlePreview(item)"></i>
                </div>
              </li>
            </ul>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="商户名">{{ detailData.name }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="统一社会信用代码">{{ detailData.unifiedSocialCreditCode }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="法人">{{ detailData.legalPerson }}</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="商户类型">{{ detailData.typeName }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="营业时间">{{ detailData.openTime }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话">{{ detailData.phone }}</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="地址">
            {{ detailData.province | pcaName }} - {{ detailData.city | pcaName }} -
            {{ detailData.district | pcaName }} -
            {{ detailData.address }}
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="备注">{{ detailData.remark }}</el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <h3>投诉列表</h3>
    <vxe-table :data="tableData" size="mini">
      <vxe-table-column title="投诉单号" field="code"></vxe-table-column>
      <vxe-table-column title="投诉类型" field="typeName"></vxe-table-column>
      <vxe-table-column title="投诉内容" field="content"></vxe-table-column>
      <vxe-table-column title="投诉人" field="complainerName"></vxe-table-column>
      <vxe-table-column title="投诉时间" field="createTime"></vxe-table-column>
      <vxe-table-column title="单据状态" field="status">
        <template slot-scope="scope">
          <span v-if="scope.row.status === '0'">未处理</span>
          <span v-else-if="scope.row.status === '1'">待处理</span>
          <span v-else-if="scope.row.status === '2'">已处理</span>
        </template>
      </vxe-table-column>
      <vxe-table-column title="操作">
        <template #default="{ row }">
          <el-button type="text" @click="handleDetail(row)">查看详情</el-button>
        </template>
      </vxe-table-column>
    </vxe-table>

    <div class="btn-con">
      <el-button @click="handleBack">返回</el-button>
    </div>

    <!-- 图片预览模态框组件 start -->
    <ModalImgPreview :visible.sync="visibleImg" :imgUrl="imgUrl" />
    <!-- 图片预览模态框组件 end -->
  </div>
</template>

<script>
import Api from '@/api/handyService'
import { getFileUrlByIds } from '@/api/file'
import ModalImgPreview from '../components/ModalImgPreview'
export default {
  components: { ModalImgPreview },
  data() {
    return {
      id: this.$route.params.id || '',
      detailData: {},
      tableData: [],
      imgList: [],
      visibleImg: false,
      imgUrl: ''
    }
  },
  mounted() {
    if (this.id) {
      // console.log(this.id)
      this.getMerchantDetail(this.id)
    }
  },
  methods: {
    // 获取商户信息详情
    getMerchantDetail(id) {
      Api.getMerchantDetail(id).then(res => {
        // console.log(res)
        this.detailData = res.data
        this.tableData = res.data.complainDTOs
        // 图片信息回显
        getFileUrlByIds(res.data.fileIds.split(',')).then(res => {
          // console.log(res)
          if (res.data && res.data.length) {
            for (let i = 0; i < res.data.length; i++) {
              this.imgList.push({
                url: res.data[i].fileUrl
              })
            }
          }
        })
      })
    },
    // 查看详情
    handleDetail(row) {
      // console.log(row)
      this.$router.push({ name: 'BusinessComplaintDetail', params: { id: row.id } })
    },
    // 返回
    handleBack() {
      this.$router.back()
    },
    // 商户信息图片预览
    handlePreview(item) {
      // console.log(item)
      this.imgUrl = item.url
      this.visibleImg = true
    }
  }
}
</script>

<style lang="less" scoped>
h3 {
  margin-bottom: 10px;
}
/deep/ .el-form-item__label {
  color: #999999;
}
.picture {
  display: flex;
  flex-wrap: wrap;
  li {
    width: 148px;
    height: 148px;
    border-radius: 6px;
    background: #fbfdff;
    border: 1px solid #c0ccda;
    margin: 0px 8px 8px 0px;
    overflow: hidden;
    position: relative;
    img {
      width: 146px;
      height: 146px;
      object-fit: contain;
    }
    .mask {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 148px;
      height: 148px;
      background: rgba(0, 0, 0, 0);
      transition: background 0.3s;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        color: #ffffff;
        width: 20px;
        height: 20px;
        font-size: 20px;
        opacity: 0;
        transition: opacity 0.3s;
        cursor: pointer;
      }
    }
  }
  li:hover .mask {
    background: rgba(0, 0, 0, 0.5);
    i {
      opacity: 1;
    }
  }
}
.btn-con {
  margin-top: 18px;
  text-align: center;
}
</style>
