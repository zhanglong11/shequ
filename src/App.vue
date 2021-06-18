<template>
  <div id="communityApp">
    <ConfigProvider :locale="locale">
      <router-view />
    </ConfigProvider>
  </div>
</template>

<script>
import { ConfigProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
  name: 'CommunityApp',
  components: { ConfigProvider },
  data() {
    return {
      locale: zhCN
    }
  }
}
</script>
