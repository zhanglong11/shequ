<template>
  <div class="map-info-wrap">
    <div class="panel">
      <div class="title">
        <div>国内疫情情况</div>
        <div v-if="countryNow.lastUpdateTime">数据更新至{{ countryNow.lastUpdateTime | ymdhm }}</div>
      </div>
      <div class="data-info-wrap-1">
        <div>
          <div>现有确诊</div>
          <div class="color-1">{{ countryNow.nowConfirm }}</div>
          <div>
            较昨日<span class="color-1">+{{ countryYesterday.nowConfirm }}</span>
          </div>
        </div>
        <div>
          <div>无症状</div>
          <div class="color-2">{{ countryNow.noInfect }}</div>
          <div>
            较昨日<span class="color-2">+{{ countryYesterday.noInfect }}</span>
          </div>
        </div>
        <div>
          <div>现有疑似</div>
          <div class="color-3">{{ countryNow.suspect }}</div>
          <div>
            较昨日<span class="color-3">+{{ countryYesterday.suspect }}</span>
          </div>
        </div>
        <div>
          <div>现有重症</div>
          <div class="color-4">{{ countryNow.nowSevere }}</div>
          <div>
            较昨日<span class="color-4">+{{ countryYesterday.nowSevere }}</span>
          </div>
        </div>
      </div>
      <div class="data-info-wrap-2">
        <div>
          <div>累计确诊</div>
          <div class="color-5">{{ countryNow.confirm }}</div>
          <div>
            较昨日<span class="color-5">+{{ countryYesterday.confirm }}</span>
          </div>
        </div>
        <div>
          <div>境外输入</div>
          <div class="color-6">{{ countryNow.importedCase }}</div>
          <div>
            较昨日<span class="color-6">+{{ countryYesterday.importedCase }}</span>
          </div>
        </div>
        <div>
          <div>累计死亡</div>
          <div class="color-7">{{ countryNow.dead }}</div>
          <div>
            较昨日<span class="color-7">+{{ countryYesterday.dead }}</span>
          </div>
        </div>
        <div>
          <div>累计治愈</div>
          <div class="color-8">{{ countryNow.heal }}</div>
          <div>
            较昨日<span class="color-8">+{{ countryYesterday.heal }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="title">
        <div>本省疫情情况</div>
        <div v-if="countryNow.lastUpdateTime">数据更新至{{ countryNow.lastUpdateTime | ymdhm }}</div>
      </div>
      <div class="data-info-wrap-1">
        <div>
          <div>现有确诊</div>
          <div class="color-1">{{ provinceInfo.total.nowConfirm }}</div>
          <div>
            较昨日<span class="color-1">+{{ provinceInfo.today.nowConfirm }}</span>
          </div>
        </div>
        <div>
          <div>累计确诊</div>
          <div class="color-4">{{ provinceInfo.total.confirm }}</div>
          <div>
            较昨日<span class="color-4">+{{ provinceInfo.today.confirm }}</span>
          </div>
        </div>
        <div>
          <div>累计死亡</div>
          <div class="color-5">{{ provinceInfo.total.dead }}</div>
          <div>
            较昨日<span class="color-5">+{{ provinceInfo.today.dead }}</span>
          </div>
        </div>
        <div>
          <div>累计治愈</div>
          <div class="color-8">{{ provinceInfo.total.heal }}</div>
          <div>
            较昨日<span class="color-8">+{{ provinceInfo.today.heal }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    provinceInfo: {
      type: Object,
      default: () => {}
    },
    countryNow: {
      type: Object,
      default: () => {}
    },
    countryYesterday: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.map-info-wrap {
  position: absolute;
  width: calc(100vw - 800px);
  display: flex;
  align-items: flex-start;
  .panel {
    flex: 0 0 50%;
    z-index: 1;
    overflow: hidden;
    .title {
      display: flex;
      align-items: center;
      div:nth-child(1) {
        border: solid 2px #ff3f33;
        color: #ff3f33;
        font-size: 16px;
        border-radius: 12px;
        font-weight: 700;
        padding: 1px 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      div:nth-child(2) {
        color: #b4b2b1;
        font-size: 14px;
        margin-left: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .data-info-wrap-1,
    .data-info-wrap-2 {
      display: flex;
      > div {
        flex: 0 0 23%;
        margin-top: 16px;
        > div {
          display: flex;
          justify-content: center;
        }
        div:nth-child(1) {
          font-weight: 700;
        }
        div:nth-child(2) {
          font-weight: 700;
          font-size: 18px;
        }
        div:nth-child(3) {
          font-weight: 400;
          font-size: 12px;
        }
      }
    }
  }

  .color-1 {
    color: #ff6a57;
  }
  .color-2 {
    color: #e96d48;
  }
  .color-3 {
    color: #ed9217;
  }
  .color-4 {
    color: #545499;
  }
  .color-5 {
    color: #e8395a;
  }
  .color-6 {
    color: #476da0;
  }
  .color-7 {
    color: #4d5054;
  }
  .color-8 {
    color: #10aeb5;
  }
}
</style>
