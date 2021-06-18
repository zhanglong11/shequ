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
          <el-form-item label="地址">{{ detailData.address }}</el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="备注">{{ detailData.remark }}</el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="point-record">
      <h3>积分记录</h3>
      <div class="total-deduct">
        总扣除<span>{{ totalDeductScore }}</span>
      </div>
    </div>
    <vxe-table :data="tableData" size="mini">
      <vxe-table-colgroup title="投诉申诉">
        <vxe-table-column title="投诉单号" field="code"></vxe-table-column>
        <vxe-table-column title="投诉内容" field="content"></vxe-table-column>
        <vxe-table-column title="扣分" field="score"></vxe-table-column>
        <vxe-table-column title="扣分时间" field="createTime"></vxe-table-column>
      </vxe-table-colgroup>
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
      tableData: [],
      detailData: {},
      imgList: [],
      visibleImg: false,
      imgUrl: '',
      totalDeductScore: 0
    }
  },
  mounted() {
    if (this.id) {
      // console.log(this.id)
      this.getMerchantScoreDetail(this.id)
    }
  },
  methods: {
    // 返回
    handleBack() {
      this.$router.back()
    },
    // 获取商户积分详情
    getMerchantScoreDetail(id) {
      Api.getMerchantScoreDetail(id).then(res => {
        // console.log(res)
        this.detailData = res.data
        this.tableData = res.data.complains

        this.tableData.forEach(item => {
          this.totalDeductScore += item.score
        })
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
.point-record {
  h3 {
    margin: 0px;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  .total-deduct {
    font-size: 14px;
    span {
      margin-left: 10px;
    }
  }
}
.btn-con {
  margin-top: 18px;
  text-align: center;
}
</style>
