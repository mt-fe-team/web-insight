<template>
  <count-to ref="counter" :startVal="startVal" :endVal="endVal" :duration="duration" />
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  props: {
    startVal: {
      type: Number,
      default: 0
    },
    endVal: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 3000
    }
  },
  components: {
    CountTo
  },
  watch: {
    'endVal' () {
      this.$refs.counter.start()
    }
  }
}
</script>
