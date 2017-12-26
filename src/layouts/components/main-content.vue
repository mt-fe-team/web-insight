<template lang="html">
  <div class="main-content">
    <div class="main-content-inner">
         <transition name="fade" mode="out-in">
          <router-view :key="key"></router-view>
        </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainContent',
  computed: {
    key () {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  }
}
</script>

<style lang="less">
.main-content {
  position: absolute;
  top: 100px;
  right: 0;
  left: 0;
  bottom: 0;
  overflow: auto;
  background-color: #f0f0f0;
  z-index: 1;
  transition: left .3s;
  &-inner {
    margin: 10px;
  }
}
</style>
