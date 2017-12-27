<template lang="html">
  <div class="layout" :class="{'layout-sidebar-closed': !sidebarOpened}">
    <div class="layout-sidebar">
      <Dropdown transfer trigger="click" @on-click="onChangeSystem" class="layout-sidebar-dropdown" :placement="sidebarOpened ? 'bottom' : 'right-start'" >
        <div class="pl10 pr10">
          <div class="layout-sidebar-dropdown-text">
            {{getLetter()}}
          </div>
        </div>
        <DropdownMenu slot="list" :style="{width: sidebarOpened ? '160px' : '60px'}">
          <DropdownItem name="Mobile" :selected="currentSystem === 'Mobile'">Mobile</DropdownItem>
          <DropdownItem name="CRM" :selected="currentSystem === 'CRM'">CRM</DropdownItem>
          <DropdownItem name="OPS" :selected="currentSystem === 'OPS'">OPS</DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <main-sidebar v-if="sidebarOpened" :sidebarOpened="sidebarOpened" :menus="menus" :opened="openedMenus"/>
      <main-sidebar-shrink v-else  :menus="menus"/>
    </div>
		<div class="layout-container">
      <main-header />
			<main-history />
			<main-content />
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import MainSidebar from './components/main-sidebar'
import MainSidebarShrink from './components/main-sidebar-shrink'
import MainHeader from './components/main-header'
import MainFooter from './components/main-footer'
import MainHistory from './components/main-history'
import MainContent from './components/main-content'
import Utils from '@/common/utils'
import Cookies from 'js-cookie'

export default {
  name: 'Layout',
  components: {
    MainSidebar,
    MainHeader,
    MainFooter,
    MainHistory,
    MainContent,
    MainSidebarShrink
  },
  computed: {
    ...mapState({
      sidebarOpened: state => state.app.sidebarOpened,
      menus: state => state.user.menus,
      username: state => state.user.account.username,
      currentSystem: state => state.app.currentSystem,
      openedMenus: state => state.app.openedMenus
    })
  },
  mounted () {
    // 问候信息相关
    if (!Cookies.get('hasGreet')) {
      const now = new Date()
      const hour = now.getHours()
      let greetingWord = {
        title: '',
        words: ''
      }
      const userName = this.username
      if (hour > 5 && hour < 6) {
        greetingWord = { title: '凌晨好~' + userName, words: '早起的鸟儿有虫吃~' }
      } else if (hour >= 6 && hour < 9) {
        greetingWord = { title: '早上好~' + userName, words: '来一杯咖啡开启美好的一天~' }
      } else if (hour >= 9 && hour < 12) {
        greetingWord = { title: '上午好~' + userName, words: '工作要加油哦~' }
      } else if (hour >= 12 && hour < 14) {
        greetingWord = { title: '中午好~' + userName, words: '午饭要吃饱~' }
      } else if (hour >= 14 && hour < 17) {
        greetingWord = { title: '下午好~' + userName, words: '下午也要活力满满哦~' }
      } else if (hour >= 17 && hour < 19) {
        greetingWord = { title: '傍晚好~' + userName, words: '下班没事问候下爸妈吧~' }
      } else if (hour >= 19 && hour < 21) {
        greetingWord = { title: '晚上好~' + userName, words: '工作之余品一品书香吧~' }
      } else {
        greetingWord = { title: '深夜好~' + userName, words: '夜深了，注意休息哦~' }
      }
      this.$Notice.config({
        top: 100
      })
      this.$Notice.info({
        title: greetingWord.title,
        desc: greetingWord.words,
        duration: 4,
        name: 'greeting'
      })
      Cookies.set('hasGreet', 1)
    }

    // 初始化面包屑导航
    const data = Utils.getBreadcrumbData(this.$route)
    this.$store.dispatch(this.$$types.UPDATE_BREADCRUMB, data)
  },
  methods: {
    getLetter () {
      return this.sidebarOpened ? this.currentSystem : this.currentSystem.substring(0, 1).toUpperCase()
    },
    onChangeSystem (name) {
      this.$store.commit(this.$$types.CHANGE_SYSTEM, name)
    }
  },
  watch: {
    '$route' (to) {
      const data = Utils.getBreadcrumbData(to)
      this.$store.dispatch(this.$$types.UPDATE_BREADCRUMB, data)
      this.$store.dispatch(this.$$types.ADD_HISTORY_TAG, to)
    }
  }
}
</script>

<style lang="less">
.layout {
  position: relative;
  height: 100%;
  width: 100%;
  &-sidebar {
    width: 180px;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    transition: all .28s ease-out;
    background: #495060;
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    z-index: 11;
    &-dropdown {
      width: 180px;
      padding: 15px 0;
      position: relative;
      z-index: 1000;
      transition: width .28s ease-out;
      &-text {
        height: 30px;
        line-height: 30px;
        color: #fff;
        background: #2D8CF0;
        border-radius: 3px;
        text-align: center;
      }
    }
  }
  &-sidebar-closed{
    .layout-sidebar{
      width: 60px;
    }
    .layout-sidebar-dropdown {
      width: 70px;
      margin-left: -5px;
      &-text {
        font-size: 20px;
      }
    }
    .layout-container{
      margin-left: 60px;
    }
    .main-sidebar-text {
      opacity: 0;
    }
  }
  &-container{
    min-height: 100%;
    transition: all .28s ease-out;
    margin-left: 180px;
    position: relative;
    background-color: #f0f0f0;
  }
  &-header{
    box-sizing: border-box;
    position: fixed;
    display: block;
    padding-left: 200px;
    width: 100%;
    height: 100px;
    z-index: 1000;
    box-shadow: rgba(99, 99, 99, 0.0980392) 0px 2px 1px 1px;
    padding-left: 180px;
  }
}

</style>
