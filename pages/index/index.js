const app = getApp()
const util = require('../../utils/util')

Page({
  data: {
    motto: 'Hello World',
    Student_info: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    let info = app.globalData.Student_info
    this.setData({
      Student_info: info
    })
    let v = app.globalData.Union_id
    if (!v) {
      wx.redirectTo({
        url: './pages/login/login',
      })
    }
  },

  onShow: function () {
    let v = app.globalData.Union_id
    if (!v) {
      wx.showLoading({
        title: '请先登录'
      })
      setTimeout(()=>{
        wx.hideLoading()
      }, 3000)
      wx.redirectTo({
        url: '../login/login',
      })
    }
  },

  logout: function() {
    console.log('you clicked logout')
    wx.showLoading({
      title: '正在退出',
    })
    util.request('/api/user/logout', function (res) {
      app.globalData.Union_id = null
      app.globalData.Student_info = null
      wx.hideLoading()
      wx.removeStorageSync('union_id')
      wx.removeStorageSync('student_info')
      wx.redirectTo({
        url: '../login/login',
      })
    })
  },

})
