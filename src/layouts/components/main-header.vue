<template lang="html">
  <div class="main-header">
    <div class="main-header-left">
      <Button type="text" @click="toggleSidebar" class="main-header-toggleicon" :class="{active: sidebarOpened}">
        <!-- <Icon type="navicon" size="32"></Icon> -->
        <i class="iconfont icon-zhankaicaidan-copy f32"></i>
        
      </Button>
    </div>
    <div class="main-header-middle">
      <Breadcrumb class="main-header-middle-inner">
        <BreadcrumbItem
          v-for="item in breadCrumbData"
          :href="item.path"
          :key="item.name"
        >{{item.title}}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="main-header-right">
      <div class="full-screen" @click="toggleFullScreen">
        <Tooltip :content="isFullScreen ? '退出全屏' : '全屏'" placement="bottom">
            <Icon :type="isFullScreen ? 'arrow-shrink' : 'arrow-expand'" :size="23"></Icon>
        </Tooltip>
      </div>
      <div class="lock-screen" @click="lockScreen">
        <Tooltip content="锁屏" placement="bottom">
          <Icon type="locked" :size="20"></Icon>
        </Tooltip>
      </div>
      <!-- <div class="message-box">
        <Tooltip :content="'无未读消息'" placement="bottom">
          <Badge :count="0" dot>
            <Icon type="ios-bell" :size="22"></Icon>
          </Badge>
        </Tooltip>
      </div> -->
      <div class="user-menu">
        <Row type="flex" justify="end" align="middle" class="user-menu-inner">
          <Dropdown trigger="click" @on-click="handleClickUserDropdown" placement="bottom-end">
            <span class="main-user-name f16 tc">{{ account.username }}</span>
            <DropdownMenu slot="list">
              <DropdownItem name="logout">退出登录</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Cookies from 'js-cookie'

export default {
  name: 'MainNavbar',
  data () {
    return {
      lockScreenSize: 0
    }
  },
  computed: {
    ...mapState({
      account: state => state.user.account,
      sidebarOpened: state => state.app.sidebarOpened,
      breadCrumbData: state => state.app.breadCrumb,
      isFullScreen: state => state.app.isFullScreen
    })
  },
  mounted () {
    // 锁屏相关
    const lockScreenBack = document.getElementById('lock_screen_back')
    const x = document.body.clientWidth
    const y = document.body.clientHeight
    const r = Math.sqrt(x * x + y * y)
    const size = parseInt(r)
    this.lockScreenSize = size
    window.addEventListener('resize', () => {
      const x = document.body.clientWidth
      const y = document.body.clientHeight
      const r = Math.sqrt(x * x + y * y)
      const size = parseInt(r)
      this.lockScreenSize = size
      lockScreenBack.style.transition = 'all 0s'
      lockScreenBack.style.width = lockScreenBack.style.height = size + 'px'
    })
    lockScreenBack.style.width = lockScreenBack.style.height = size + 'px'
  },
  methods: {
    toggleSidebar () {
      this.$store.dispatch(this.$$types.TOGGLE_SIDEBAR)
    },
    toggleFullScreen () {
      this.$store.commit(this.$$types.TOGGLE_FULL_SCREEN, { changeState: false })
    },
    handleClickUserDropdown (name) {
      if (name === 'logout') {
        this.$store.dispatch(this.$$types.LOGOUT).then(res => {
          this.$router.push({ name: 'login' })
        })
      }
    },
    lockScreen () {
      const lockScreenBack = document.getElementById('lock_screen_back')
      lockScreenBack.style.transition = 'all 3s'
      lockScreenBack.style.zIndex = 10000
      lockScreenBack.style.boxShadow = '0 0 0 ' + this.lockScreenSize + 'px #667aa6 inset'
      this.showUnlock = true
      // 本地存储锁屏之前打开的页面以便解锁后打开
      Cookies.set('last_page_name', this.$route.name)

      // 退出登录状态
      this.$store.dispatch(this.$$types.LOGOUT).then(res => {
        Cookies.set('locking', 1)
        setTimeout(() => {
          lockScreenBack.style.transition = 'all 0s'
          this.$router.push({
            name: 'locking'
          })
        }, 800)
      })
    }
  }
}
</script>

<style lang="less">
.main-header {
  height: 60px;
  box-shadow: rgba(99, 99, 99, 0.0980392) 0px 2px 1px 1px;
  position: relative;
  z-index: 10;
  background: rgb(255, 255, 255);
  &-toggleicon.active {
    transform: rotate(180deg);
  }
  &-left {
    display: inline-block;
  }
  &-middle {
    position: absolute;
    left: 60px;
    top: 0px;
    right: 340px;
    bottom: 0px;
    padding: 10px;
    overflow: hidden;
    &-inner{
      padding: 8px 15px 0px;
    }
  }
  &-right {
    position: absolute;
    right: 0px;
    top: 0px;
    height: 100%;
    .full-screen, .lock-screen, .message-box{
      display: inline-block;
      width: 30px;
      text-align: center;
      cursor: pointer;
      padding: 18px 0px;
      vertical-align: top;
    }
    .user-menu {
      height: 100%;
      display: inline-block;
      &-inner {
        height: 100%;
        padding-right: 14px;
      }
    }
  }
}
</style>
