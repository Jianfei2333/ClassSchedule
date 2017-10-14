
App({
  onLaunch: function () {

    let v = wx.getStorageSync('union_id')
    let info = wx.getStorageSync('student_info')
    if (!v) {
      wx.redirectTo({
        url: './pages/login/login',
      })
    } else {
      this.globalData.Student_info = info
      this.globalData.Union_id = v
      wx.redirectTo({
        url: './pages/index/index',
      })
    }
    
  },
  globalData: {
    Student_info: null,
    Union_id: null
  }
})