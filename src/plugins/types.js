import * as types from '@/store/types'

export default {
  install: Vue => {
    Vue.prototype['$$types'] = types
  }
}
