export function excuteAjax (context, payload, api, type) {
  context.commit(`${type}_LOADING`, payload)

  return api(payload).then(res => {
    context.commit(`${type}_SUCCESS`, res.data)
    return Promise.resolve(res.data)
  }).catch(err => {
    context.commit(`${type}_FAILURE`, err)
    return Promise.reject(err)
  })
}
