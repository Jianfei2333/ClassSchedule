const app = getApp()

/* 在每个页面js文件中引用util
 * 可以使用封装的方法util.requests
 * 参数为：即将post的后端url，成功的回调函数，发送的包
 * 方法中会自动封装union_id，无需手动向包中添加
 * 方法中会自动打印日志，无需手动设置输出
 */

const request = (url, func, ...e) => {
  wx.request({
    url: 'https://iambanana.cn' + url,
    method: 'POST',
    data: Object.assign({
      Union_id: app.globalData.union_id,
    }, ...e),
    header: {
      'content-type': 'application/json'
    },
    success: func,
    complete: function (res) {
      console.log('*******************COMPLETE*******************')
      console.log(res)
    },
    fail: function (res) {
      console.log('*******************FAIL*******************')
      console.log(res)
    }
  })
}

module.exports = {
  request: request,
}
