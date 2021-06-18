<template>
  <div style="width: 100%; height: 100%">
    <BimView ref="bim" model-id="91BkekYo" @ready="renderModelMark" />
  </div>
</template>

<script>
import BimView from '@/components/BBB/bim'
export default {
  name: 'Test',
  // import引入的组件
  components: { BimView },
  props: {},
  data() {
    // 这里存放数据
    return {}
  },
  // 生命周期 - 挂载完成
  created() {},
  // 方法集合
  methods: {
    refresh() {},
    // 模型添加锚点
    renderModelMark() {
      // 选中构件
      this.$refs.bim.pickElement(['91BkekYo+0/40000'])

      this.$refs.bim.setMark({
        eleAry: ['91BkekYo+0/40000'], // 构件idAry
        imgSrc: '/images/bimIcon/icon_keyPersonLocation.png', // 图标路径
        size: 20, // 图标大小
        props: [{ id: 111, name: '111' }], // 对应参数
        callBack: this.iconClick
      })
    },
    iconClick(id, props) {
      console.log(id)
      console.log(props)
    }
  }
}
</script>
