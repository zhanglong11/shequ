<template>
  <div class="message-list">
    <ul>
      <li v-for="(item, i) in listData" :key="i">
        <div class="message-head">
          <p class="title" @click="toDetails(item)">
            {{ item.meetingSubject }}
          </p>
          <p class="desc">
            <span class="room">
              <i class="el-icon-location"></i>
              会议室：{{ item.meetingAddress }}
            </span>
            <span>
              <i class="el-icon-date"></i>
              会议开始时间：{{ item.startTime }}
            </span>
          </p>
        </div>
        <div class="message-body">
          <div class="user-avatar">
            <el-avatar icon="el-icon-user-solid" :src="item.creatorImage"></el-avatar>
            <span class="name">{{ item.creatorName }}</span>
          </div>
          <div class="btn-group">
            <span class="btn btn-info" @click="toDetails(item)">查看详情</span>
            <span class="btn btn-delete" @click="deleteMeeting(item)">移除</span>
          </div>
        </div>
      </li>
    </ul>
    <MessageDetail v-if="details" :id="details.id" :visible.sync="detailDialogVisible" :status="details.status" />
  </div>
</template>

<script>
import homeApi from '../api'
import MessageDetail from '@/views/workbench/meetingManage/components/Detail'
export default {
  components: {
    MessageDetail
  },
  props: {
    // 会议统计
    messageCount: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    // 这里存放数据
    return {
      detailDialogVisible: false,
      details: '',
      listData: []
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.init()
  },
  // 方法集合
  methods: {
    // 初始化
    init() {
      this.queryMeetingCount()
      this.queryMeetingListAll()
    },
    // 查询全部列表
    async queryMeetingListAll() {
      const params = {
        module: 1
      }
      const result = await homeApi.queryMeetingListAll(params)
      const datas = result.data || []
      this.listData = datas
    },
    // 首页计数调用
    async queryMeetingCount() {
      const params = {
        module: 1
      }
      const result = await homeApi.queryMeetingCount(params)
      const datas = result.data || 0
      this.$emit('update:messageCount', datas)
    },
    // 查看详情
    toDetails(item) {
      this.details = Object.assign({}, item)
      this.detailDialogVisible = true
    },
    // 删除会议信息
    deleteMeeting(item) {
      this.$confirm(`确定要移除 <b>${item.meetingSubject}</b> 会议吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(async () => {
        await homeApi.deleteMeeting(item.id)
        this.$message({
          type: 'success',
          message: '移除成功!'
        })
        this.init()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/mixin';
p {
  margin: 0;
  padding: 0;
}
.message-list {
  height: 100%;
  ul {
    height: 100%;
    overflow-y: auto;
    @include scrollBar;
    li {
      display: flex;
      align-items: center;
      border-bottom: 1px #eee solid;
      transition: all 0.3s;
      height: 80px;
      overflow: hidden;
      .message-head {
        padding: 0 30px;
        flex: 1;
        overflow: hidden;
        .title {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 10px;
          @include ellipsis;
          cursor: pointer;
        }
        .desc {
          color: #7f7f7f;
          font-size: 14px;
          .room {
            margin-right: 40px;
          }
        }
      }
      .message-body {
        display: flex;
        align-items: center;
        height: 100%;
        margin-right: -200px;
        transition: all 0.3s;
        .user-avatar {
          display: flex;
          align-items: center;
          .name {
            margin: 0 15px 0 10px;
            color: #5c5c5c;
          }
        }
      }
      .btn-group {
        display: flex;
        align-items: center;
        height: 100%;
        transition: all 0.3s;
        position: relative;
        opacity: 0;
        .btn {
          color: #fff;
          width: 100px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          transition: all 0.3s;
          cursor: pointer;
          &.btn-info {
            background: #fcb959;
          }
          &.btn-delete {
            background: #ff8275;
          }
          &:hover {
            opacity: 0.8;
          }
        }
      }
      &:hover {
        background: #f9f8f8;
        .message-body {
          margin: 0;
          .btn-group {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
