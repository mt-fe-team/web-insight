import AV from 'leancloud-storage'

const appId = 'GAHOQoW5LU5k5MstvbjHJiQn-gzGzoHsz'
const appKey = 'IQ7Je02a33Mm5AVkAikKwxL2'

AV.init({
  appId: appId,
  appKey: appKey
})

window.localStorage.setItem('debug', 'leancloud*')

export default AV
