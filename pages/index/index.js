const app = getApp()
const util = require('../../utils/util')
const moment = require('../../package/moment/moment')

Page({
  data: {
    motto: 'Hello World',
    Student_info: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    date: [moment().startOf('week').format('MM.DD'),
      moment().startOf('week').add(1, 'd').format('MM.DD'),
      moment().startOf('week').add(2, 'd').format('MM.DD'),
      moment().startOf('week').add(3, 'd').format('MM.DD'),
      moment().startOf('week').add(4, 'd').format('MM.DD'),
      moment().startOf('week').add(5, 'd').format('MM.DD'),
      moment().startOf('week').add(6, 'd').format('MM.DD'),],
    semester_picker:[['2015', '2016', '2017', '2018', '2019'], ['春季', '秋季']],
    year_semester: [0, 0],
  },

  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    let info = app.globalData.Student_info
    let ys = wx.getStorageSync('year_semester')
    this.setData({
      Student_info: info,
      year_semester: ys
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

  change_selector: function(e) {
    console.log(e.detail.value)
    let p = this
    this.setData({
      year_semester: e.detail.value
    })
    wx.setStorageSync('year_semester', e.detail.value)
  },

})
