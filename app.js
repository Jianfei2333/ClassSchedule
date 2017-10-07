//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    let v = wx.getStorageSync('union_id')
    if (!v) {
      wx.redirectTo({
        url: './pages/login/login',
      })
    } else {
      wx.redirectTo({
        url: './pages/index/index',
      })
    }
    
  },
  globalData: {
    userInfo: null,
    union_id: null
  }
})