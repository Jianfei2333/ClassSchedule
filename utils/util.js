const app = getApp()

/* 在每个页面js文件中引用util
 * 可以使用封装的方法util.requests
 * 参数为：即将post的后端url，成功的回调函数，发送的包
 * 方法中会自动封装union_id，无需手动向包中添加
 * 方法中会自动打印日志，无需手动设置输出
 */

const request = (url, func, ...e) => {
  let obj = Object.assign({ Union_id: app.globalData.Union_id }, ...e)
  wx.request({
    url: 'https://iambanana.cn' + url,
    method: 'POST',
    data: obj,
    header: {
      'content-type': 'application/json'
    },
    success: func,
    complete: function (res) {
      console.log('*******************COMPLETE*******************')
      console.log(res)
      if (res.data.description === 'NOT_LOGIN' && url !== '/api/user/logout') {
        /* 
         * 在此处添加登陆失效后数据清理操作 
         */
        wx.removeStorageSync('union_id')
        wx.removeStorageSync('student_info')
        app.globalData.Union_id = null
        app.globalData.Student_info = null

        wx.showModal({
          content: '登陆状态过期，请重新登陆！',
          showCancel: false,
          success: function (res) {
            wx.redirectTo({
              url: '/pages/login/login'
            })
          }
        });
      }
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
