<template>
  <Row class="log-item"
    @click.native="onClick(item.objectId)" 
    :class="{active: active}" 
    :key="item.objectId">
    <Col span="20" class="log-item-msg">{{ itemTitle }}</Col>
    <Col span="4" class="tr">
      <Icon class="log-item-arrow" type="ios-arrow-right"></Icon>
    </Col>
    <div class="log-item-indicator">
      <div class="log-item-indicator-baffle"></div>
    </div>
  </Row>
</template>

<script>
export default {
  props: {
    item: Object,
    active: Boolean,
    type: String
  },
  methods: {
    onClick () {
      this.$emit('on-click', this.item.objectId)
    }
  },
  computed: {
    itemTitle () {
      return (this.type === 'script' ? this.item.message : this.item.api) || '无'
    }
  }
}
</script>

<style lang="less">
.log-item{
  height: 35px;
  border: 1px solid #F0F0F0;
  line-height: 35px;
  position: relative;
  margin-bottom: 5px;
  margin-right: 1px;
  &:hover,&.active { 
    cursor: pointer;
    border-color: #FBE2E2; 
    .log-item-arrow {
      transform: translateX(0);
      opacity: 1;
    }
  }
  &-msg { padding-left: 5px; }
  &-arrow { padding-right: 5px; opacity: 0; transition: all .3s; transform: translateX(-10px) }
  &-indicator {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background-image: linear-gradient(to left, #FA7070 0%, #F7EAA2 100%);
    &-baffle {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      transition: transform .35s ease-in;
      background: #fff;
      transform: translateX(0%);
    }

  }
}
</style>


