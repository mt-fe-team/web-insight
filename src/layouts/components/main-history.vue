<template lang="html">
  <div class="main-history">
    <div class="main-history-inner">
      <Tag
          type="dot"
          v-for="(item, index) in historyTags"
          :key="item.name"
          :name="item.name"
          @on-close="closePage"
          @click.native="linkTo(item)"
          :closable="item.name !== 'home-dashboard'"
          :color="item.name === currPageName ? 'blue' : 'default'"
      >{{ item.title }}</Tag>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MainHistory',
  computed: {
    currPageName () {
      return this.$route.name
    },
    ...mapState({
      historyTags: state => state.app.historyTags
    })
  },
  methods: {
    closePage (e, name) {
      this.$store.dispatch(this.$$types.DEL_HISTORY_TAG, { name })
      if (name === this.currPageName) {
        this.$router.push({ name: 'home-dashboard' })
      }
    },
    linkTo (item) {
      this.$router.push(item)
    }
  }
}
</script>

<style lang="less">
.main-history {
  height: 40px;
  z-index: 2;
  position: relative;
  padding: 2px 10px;
  overflow: hidden;
  background: rgb(240, 240, 240);
  box-shadow: 0 2px 1px 1px hsla(0,0%,39%,.1);
  &-inner {
    position: relative;
    box-sizing: border-box;
    padding-right: 120px;
    width: 100%;
    height: 100%;
  }
}
</style>
