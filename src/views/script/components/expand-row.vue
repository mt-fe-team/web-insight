<template>
  <div>
    <div>堆栈信息</div>
    <div>{{row.stack || '无'}}</div>
  </div>
</template>

<script>
export default {
  props: {
    row: Object
  }
}
</script>
