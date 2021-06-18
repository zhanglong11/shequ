# 智慧社区



### 注意

时间格式化库请使用dayjs

业务中部分需要参数回显的统一由后端带回，避免使用接口获取所有参数然后自行回显

### Grid组件用法
建议需要分页的列表使用，自带分页功能
```vue
<template>
  <div class="container">
    <div class="tooltips">
      <el-form inline>
        <el-form-item>
          <el-input v-model="filterForm.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
          <el-button type="primary" icon="el-icon-refresh"  @click="()=>$refs.table.reset()">重置</el-button>
          <button-link to="member/new" type="primary" icon="el-icon-plus">新建</button-link>
        </el-form-item>
      </el-form>
    </div>
    <Grid ref="table" :request="request" :filter-form.sync="filterForm">
      <vxe-table-column title="党组织名称" field="organizationName"></vxe-table-column>
      <vxe-table-column title="姓名" field="realName"></vxe-table-column>
      <vxe-table-column title="性别" field="sex"></vxe-table-column>
      <vxe-table-column title="手机号" field="mobile"></vxe-table-column>
      <vxe-table-column title="身份证" field="identityCardNumber"></vxe-table-column>
      <vxe-table-column title="状态" field="status"></vxe-table-column>
      <vxe-table-column title="党内职务" field="post"></vxe-table-column>
    </Grid>
  </div>
</template>
<script >
function getPartyMemberManagementList(filterForm){
  return axios.post('blabla',filterForm)
}
export default {
  name: 'CcpDepartment',
  data() {
    return {
      filterForm: {},
      request: getPartyMemberManagementList
    }
  },
  methods: {
    refresh() {
      this.$refs.table.refresh()
    },
  }
}
</script>
```

### 默认页面请在根元素加上 class="container"


### 地图选点
```vue
<Map :longitude.sync="form.longitude" :latitude.sync="form.latitude"></Map>
```

### 参数选择器
1 在系统参数中添加所需的参数分组，然后添加选项，记住分组的key

2 使用Select (已注册在全局)

```vue
<Select v-model="form.blabla" argGroup="workerProperty" />
```

### 一个实用的弹框样式优化class   

你所要做的就是在el-dialog的class中加上beauty,弹框将会上下居中，并且过高的话，会在dialog-body区域出现滚动条

![image-20201030142127980](http://static.doveaz.xyz/screenshotimage-20201030142127980.png)

![30abe6de-0087-41ca-b43d-04adc4ccbd52](http://static.doveaz.xyz/screenshot30abe6de-0087-41ca-b43d-04adc4ccbd52.gif)



### v-promise-btn指令

使用了 v-promise-btn 指令，https://stukh.github.io/vue-promise-btn/，几乎跟element的按钮加载状态效果一样

```vue
<el-button v-promise-btn type="primary" @click="save">保存</el-button>
<el-button loading>哈哈</el-button>

async save(){
  await api.save()
}
```

![image-20200908143728216](http://static.doveaz.xyz/screenshotimage-20200908143728216.png)

默认绑定click事件，对应事件处理器(上图中save方法)需要返回一个promise