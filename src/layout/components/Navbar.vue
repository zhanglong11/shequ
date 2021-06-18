<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-switch
        v-if="ignorePermissionsVisible"
        v-model="ignorePermissions"
        class="custom-switch"
        title="显示所有菜单和按钮"
        inactive-text="开发者模式"
        style="margin-right: 15px"
      >
      </el-switch>
      <router-link to="/bigScreen" target="_blank" style="color: #fff; margin-right: 10px">
        <span class="el-icon-office-building" style="margin-right: 5px"></span>
        社区驾驶舱
      </router-link>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item> 首页 </el-dropdown-item>
          </router-link>
          <router-link to="/personalCenter">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from './Breadcrumb'
import Hamburger from './Hamburger'
import { logout } from '@/api/system/user'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar']),
    // 忽视权限,显示所有菜单和按钮
    ignorePermissions: {
      get() {
        return process.env.NODE_ENV === 'development' && localStorage.getItem('ignorePermissions') === 'true'
      },
      set(val) {
        localStorage.setItem('ignorePermissions', '' + val)
        location.reload()
      }
    },
    // 是否显示开发者模式按钮
    ignorePermissionsVisible() {
      return process.env.NODE_ENV === 'development'
    },
    // 权限
    power() {
      return this.$store.state.userPower.power
    }
  },
  mounted() {
    this.$store.dispatch('getSystemPower')
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    // 安全退出
    async logout() {
      await logout()
      this.logoutSuccess()
    },
    async logoutSuccess() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-switch {
  ::v-deep .el-switch__label {
    color: #fff;
  }
}
.navbar {
  height: 60px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  background: url('~@/assets/images/top-bg.png') no-repeat;
  background-size: cover;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    display: inline-flex;
    align-items: center;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
          color: #fff;
        }
      }
    }
  }
}
</style>
