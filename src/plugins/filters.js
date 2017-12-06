import filters from '@/common/filters'

export default {
  install: Vue => {
    Object.keys(filters).forEach(v => Vue.filter(v, filters[v]))
  }
}
