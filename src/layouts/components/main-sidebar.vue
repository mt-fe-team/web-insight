<template lang="html">
  <Menu ref="sideMenu" class="main-sidebar" theme="dark" width="auto"
    :active-name="pageName"
    :open-names="openedMenus"
    @on-select="changeMenu">
    <template v-for="item in menus">
      <MenuItem v-if="item.children.length === 1" :name="item.children[0].name" :key="item.path">
          <Icon :type="item.icon" :size="sidebarOpened?18:20" :key="item.path"></Icon>
          <span class="main-sidebar-text" :key="item.path">{{ item.meta.title }}</span>
      </MenuItem>

      <Submenu v-if="item.children.length > 1" :name="item.name" :key="item.path">
          <template slot="title">
              <Icon :type="item.icon" :size="sidebarOpened?18:20"></Icon>
              <span class="main-sidebar-text">{{ item.meta.title }}</span>
          </template>
          <template v-for="child in item.children">
              <MenuItem :name="child.name" :key="child.name">
                <Icon :type="child.icon" :size="sidebarOpened?18:20" :key="child.name"></Icon>
                <span class="main-sidebar-text" :key="child.name">{{ child.meta.title }}</span>
              </MenuItem>
          </template>
      </Submenu>
    </template>
  </Menu>
</template>
<script>

export default {
  name: 'MainSidebar',
  props: {
    sidebarOpened: Boolean,
    menus: Array,
    opened: Array
  },
  data () {
    return {
      pageName: this.$route.name,
      openedMenus: []
    }
  },
  watch: {
    '$route' (to) {
      this.pageName = to.name
    },
    opened () {
      this.openedMenus = this.opened.slice()
      this.$nextTick(() => {
        this.$refs.sideMenu.updateOpened()
      })
    }
  },
  methods: {
    changeMenu (name) {
      this.$router.push({ name })
    }
  }
}
</script>

<style scoped>
.ivu-col{
  transition: width .2s ease-in-out;
}
.ivu-menu-item, .ivu-menu-submenu {
  white-space: nowrap;
}
</style>
