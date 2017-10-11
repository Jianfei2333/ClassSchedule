const app = getApp()
const util = require('../../utils/util')

Page({
  data: {
    motto: 'Hello World',
    Student_info: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    today: '10.11'
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
        url: '../login/login',
      })
    }
  },

  onShow: function () {
    let v = app.globalData.Union_id
    this.setData({
      Student_info: app.globalData.Student_info
    })
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

})
