<template>
  <div v-if="!detail.createdAt" class="ui-list-empty"> 暂无数据 </div>
  <div v-else>
    <Row :gutter="10" class="mb10" type="flex">
      <Col span="4" class="tr">发生时间</Col>
      <Col span="8" class="c-8">{{ detail.createdAt | formatDateTime }}</Col>
      <Col span="4" class="tr">页面标题</Col>
      <Col span="8" class="c-8">{{ detail.title || '未知' }}</Col> 
    </Row>
    <Row :gutter="8" class="mb10" type="flex">
      <Col span="4" class="tr">系统</Col>
      <Col span="8" class="c-8">{{ (detail.os + detail.osVersion) || '未知' }}</Col>
      <Col span="4" class="tr">浏览器</Col>
      <Col span="8" class="c-8">{{ (detail.browser + detail.browserVersion) || '未知'}}</Col>
    </Row>
    <Row :gutter="10" class="mb10" type="flex">
      <Col span="4" class="tr">发生页面</Col>
      <Col span="20" class="c-8 brk">{{ detail.page }}</Col>
    </Row>

     <Row :gutter="10" class="mb10" type="flex" v-if="type === 'ajax'">
      <Col span="4" class="tr">API</Col>
      <Col span="20" class="c-8 brk">{{ detail.api }}</Col>
    </Row>

    <div v-if="type === 'script'">
      <Row :gutter="10" class="mb10">
        <Col span="4" class="tr">错误消息</Col>
        <Col span="20" class="c-8 brk">{{ detail.message }}</Col>
      </Row>
      <Row :gutter="10" class="mb10">
        <Col span="4" class="tr">堆栈信息</Col>
        <Col span="20" class="c-8">
          <div>{{detail.stack || '无'}}</div>
        </Col>
      </Row>
    </div>
    <div v-else>
      <Row :gutter="10" class="mb10">
        <Col span="4" class="tr">请求参数</Col>
        <Col span="20" class="c-8 brk">{{ detail.request }}</Col>
      </Row>
      <Row :gutter="10" class="mb10">
        <Col span="4" class="tr">响应参数</Col>
        <Col span="20" class="c-8 brk">
          <div>{{detail.response || '无'}}</div>
        </Col>
      </Row>
    </div>
    
  </div>
</template>

<script>
export default {
  props: {
    detail: Object,
    type: String
  }
}
</script>