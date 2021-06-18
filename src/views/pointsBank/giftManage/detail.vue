<template>
  <div class="container">
    <el-form ref="form" label-width="120px">
      <h3>基本信息</h3>
      <el-row>
        <el-col :span="24">
          <el-form-item label="礼品图片">
            <ul v-if="form.giftImages != ''" class="picture">
              <li v-for="(item, index) in imgList" :key="index">
                <img :src="item.url" />
                <div class="mask">
                  <i class="el-icon-zoom-in" @click="handlePreview(item)"></i>
                </div>
              </li>
            </ul>
            <span v-else>暂无图片</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="礼品名称">
            <span>{{ form.giftName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="库存量">
            <span>{{ form.inventory }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="兑换积分">
            <span>{{ form.convertScore }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="状态">
            <span>{{ $getLabel(giftStatusList, form.status) }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="商品描述">
            <span>{{ form.describe }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <h3>出库记录</h3>
      <vxe-table :data="form.deliveryList">
        <vxe-table-column title="出库单编号" field="outWarehouseNumber"></vxe-table-column>
        <vxe-table-column title="出库商品" field="giftName"></vxe-table-column>
        <vxe-table-column title="出库数量" field="convertCount"></vxe-table-column>
        <vxe-table-column title="兑换人" field="realName"></vxe-table-column>
        <vxe-table-column title="出库时间" field="updateTime"></vxe-table-column>
        <vxe-table-column title="扣除积分" field="deductScore"></vxe-table-column>
        <vxe-table-column title="关联兑换订单" field="score"></vxe-table-column>
      </vxe-table>
    </el-form>
    <div class="btn-con">
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
import { getBankGiftManagement } from '../api/pointsBand.js'
import { giftStatusList } from '../lib/options'
import { getFileUrlByIds } from '@/api/file'
export default {
  name: 'GiftManageDetail',
  components: {},
  data() {
    return {
      visibleImg: false,
      form: {},
      imgList: [],
      imgUrl: '',
      giftStatusList,
      deliveryList: [],
      id: this.$route.params.id || ''
    }
  },
  created() {},
  mounted() {
    this.getBankGiftManagement(this.id)
  },
  methods: {
    // 返回
    handleBack() {
      this.$router.back()
    },
    // 获取礼品详情
    async getBankGiftManagement(id) {
      const res = await getBankGiftManagement(id)
      this.form = res.data
      // 图片信息回显
      console.log(res.data.giftImages)
      getFileUrlByIds(res.data.giftImages.split(',')).then(res => {
        if (res.data && res.data.length) {
          for (let i = 0; i < res.data.length; i++) {
            this.imgList.push({
              url: res.data[i].fileUrl
            })
          }
        }
      })
    },
    // 礼品信息图片预览
    handlePreview(item) {
      this.imgUrl = item.url
      this.visibleImg = true
    },
    refresh() {}
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.btn-con {
  margin-top: 18px;
  text-align: center;
}
.container {
  padding: 20px 50px;
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
.el-form {
  .vxe-table {
    margin: 30px auto;
    max-width: 1200px;
  }
}
</style>
