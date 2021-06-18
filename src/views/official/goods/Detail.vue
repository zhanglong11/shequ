<template>
  <div class="container has-footer">
    <div class="inner-wrapper">
      <h3>基本信息</h3>
      <el-form label-width="140px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="物品图片">
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
            <el-form-item label="物品名称">{{ detailData.name }}</el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="详细描述">{{ detailData.details }}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="发布人">{{ detailData.realName }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发布人手机号">{{ detailData.phone }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发布时间">{{ detailData.createTime }}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="交换状态">{{ $getLabel(exchangeStatusList, detailData.exchangeStatus) }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="审核状态">{{ $getLabel(statusList, detailData.auditStatus) }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="审核人">{{ detailData.auditPersonName }}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="审核时间">{{ detailData.auditTime }}</el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="说明">{{ detailData.explain }}</el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="footer-button">
      <el-button @click="handleBack">返回</el-button>
    </div>
    <!-- 图片预览模态框 start -->
    <el-dialog :visible.sync="visibleImg" width="800px">
      <div class="img-dialog-con">
        <img :src="imgUrl" alt="" />
      </div>
    </el-dialog>
    <!-- 图片预览模态框 end -->
  </div>
</template>

<script>
import Api from '../api'
import { getFileUrlByIds } from '@/api/file'
export default {
  components: {},
  data() {
    return {
      id: this.$route.query.id || '',
      detailData: {},
      imgList: [],
      visibleImg: false,
      imgUrl: '',
      exchangeStatusList: [
        { value: 0, label: '未交换' },
        { value: 1, label: '已交换' }
      ],
      statusList: [
        { value: 0, label: '审核中' },
        { value: 1, label: '审核通过' },
        { value: 2, label: '审核驳回' }
      ]
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
      Api.getinformGoodsDetail(id).then(res => {
        this.detailData = res.data
        // 图片信息回显
        getFileUrlByIds(res.data.images.split(',')).then(res => {
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
.img-dialog-con {
  border: solid 1px #e5e5e5;
  padding: 10px;
  img {
    width: 760px !important;
    height: 400px !important;
    object-fit: contain;
  }
}
</style>
