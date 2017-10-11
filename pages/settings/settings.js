// pages/settings/settings.js
const app = getApp()
const util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  logout: function () {
    console.log('you clicked logout')
    wx.showLoading({
      title: '正在退出',
    })
    util.request('/api/user/logout', function (res) {
      app.globalData.Union_id = null
      app.globalData.Student_info = null
      wx.removeStorageSync('union_id')
      wx.removeStorageSync('student_info')

      wx.redirectTo({
        url: '../login/login',
      })
      wx.hideLoading()
    })
  },

  bind_tap_logout: function () {
    let p = this
    wx.showModal({
      title: '确认退出',
      content: '退出后，您的当前完成情况将会被清空',
      confirmText: "确认",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          p.logout()
        }
      }
    });
  },

})