import AV from '@/common/av'

export default {
  /**
   * 登录
   * @param {string} data.username 登陆用户名
   * @param {string} data.password 登陆密码
   */
  login (data) {
    return AV.User.logIn(data.username, data.password)
  },

  // 注销
  logout () {
    return AV.User.logOut()
  },

  // 注册
  signUp (data) {
    const user = new AV.User()
    user.setUsername(data.username)
    user.setPassword(data.password)
    return user.signUp()
  },

  // 获取当前用户信息
  getUser () {
    return AV.User.current() || {}
  }
}
