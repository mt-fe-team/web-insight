import AV from './av'

export default {
  isLogged () {
    return !!AV.User.current()
  },
  getAccount () {
    return AV.User.current().toJSON()
  }
}
