<template>
<div>
  <div v-if="!list.length" class="ui-list-empty"> 暂无数据 </div>
  <div v-else>
    <log-list-item 
      v-for="item in list" 
      @on-click="onReadMore"
      :item="item"
      :key="item.objectId"
      :type="type"
      :active="item.objectId === activeId">
    </log-list-item>
  </div>
</div>
</template>

<script>
import LogListItem from '../log-list-item'

export default {
  props: {
    list: Array,
    activeId: String,
    type: String
  },
  components: {
    LogListItem
  },
  methods: {
    onReadMore (objectId) {
      const detail = this.list.filter(v => v.objectId === objectId)[0] || {}
      this.$emit('on-checked', detail)
    }
  }
}
</script>

