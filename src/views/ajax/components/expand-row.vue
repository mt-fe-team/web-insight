<template>
  <div>
    <div>请求参数</div>
    <div class="mb15">{{row.request || '无'}}</div>
    <div class="bdr-t pt15">响应参数</div>
    <div>{{row.response || '无'}}</div>
  </div>
</template>

<script>
export default {
  props: {
    row: Object
  }
}
</script>
