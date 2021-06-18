<template>
  <aside>
    <el-button v-if="$hasPower('ArgNewAdd')" class="add-group" type="primary" @click="visible = true"
      >新建分组</el-button
    >
    <el-input v-model="q" class="search" icon="el-icon-search" placeholder="搜索"></el-input>
    <transition-group name="list-complete" tag="ul" class="scroll-beauty">
      <li
        v-for="item in computedList"
        :key="item.id"
        class="list-complete-item item"
        :class="{ active: activeArgGroup.id === item.id }"
        @click="activeArgGroup = item"
      >
        <span class="name" v-html="item.argText"></span>
        <span v-if="item.argSource === 2" class="actions">
          <i v-if="$hasPower('ArgsEdit')" class="el-icon-edit" title="编辑" @click="handleEdit(item)"></i>
          <i v-if="$hasPower('ArgsRemove')" class="el-icon-delete" title="删除" @click="handleRemove(item)"></i>
        </span>
      </li>
    </transition-group>
    <GroupEdit :visible.sync="visible" @change="refresh"></GroupEdit>
  </aside>
</template>

<script>
import { getGroupList, removeGroupById, updateGroup } from '@/api/system/args'
import Fuse from 'fuse.js'
import { highlight } from '@/utils/fuseHighlight'
import GroupEdit from './GroupEdit'

export default {
  name: 'Aside',
  components: { GroupEdit },
  data() {
    return {
      q: '',
      list: [],
      fuse: null,
      activeArgGroup: {},
      visible: false
    }
  },
  computed: {
    computedList() {
      if (!this.q) {
        return this.list
      } else {
        return highlight(this.fuse.search(this.q))
      }
    }
  },
  watch: {
    activeArgGroup(val) {
      this.$emit('change', val)
    }
  },
  created() {
    this.refresh()
  },
  mounted() {},
  methods: {
    refresh() {
      getGroupList().then(res => {
        this.list = res.data
        this.fuse = new Fuse(this.list, {
          keys: ['argGroup', 'argCode', 'argText'],
          threshold: '0.5',
          includeMatches: true
        })
      })
    },
    handleEdit(row) {
      this.$prompt('请输入新名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputErrorMessage: '必填',
        inputPattern: /\S+/,
        inputValue: row.argText
      })
        .then(({ value }) => {
          return updateGroup({
            id: row.id,
            argText: value
          })
        })
        .then(() => {
          this.$message.success('修改成功')
          this.refresh()
        })
    },
    async handleRemove(row) {
      await this.$remove([row], 'argText')
      await removeGroupById(row.id)
      this.$message.success('删除成功')
      this.refresh()
    }
  }
}
</script>

<style scoped lang="less">
aside {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 15px;
}
.add-group {
  margin-bottom: 10px;
}
.search {
  margin-bottom: 10px;
}
ul {
  list-style: none;
  flex: 1;
  overflow: auto;
  margin-bottom: 0;
  li {
    padding: 3px 10px;
    cursor: pointer;
    background-color: #fff;
    &:hover,
    &.active {
      background-color: #ec3f4f;
      color: #fff;
      /deep/.highlight {
        color: #fff;
      }
    }
    display: flex;
    align-items: center;
    .name {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .actions {
      i {
        padding: 5px;
      }
    }
  }
}
</style>
