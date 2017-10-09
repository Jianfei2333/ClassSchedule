// pages/modify/modify.js
const app = getApp()
const util = require('../../utils/util')

Page({

  data: {
    Student_info: null,
    disable_change: true,
    data_to_change: {
      Name: null,
      Student_id: null,
      Email: null
    },
    inputClass: "weui-input_disabled"
  },

  onLoad: function (options) {
    this.setData({
      Student_info: app.globalData.Student_info,
      "data_to_change.Name": app.globalData.Student_info.name,
      "data_to_change.Student_id": app.globalData.Student_info.student_id,
      "data_to_change.Email": app.globalData.Student_info.email
    })
  },

  switch_disable: function (e) {
    console.log(e.detail.value)
    this.setData({
      disable_change: !e.detail.value,
    })
    if (!e.detail.value) {
      this.setData({
        inputClass: "weui-input_disabled"
      })
    } else {
      this.setData({
        inputClass: "weui-input"
      })
    }
  },

  bind_input_Student_id: function (e) {
    this.setData({
      "data_to_change.Student_id": e.detail.value
    })
  },

  bind_input_Name: function (e) {
    this.setData({
      "data_to_change.Name": e.detail.value
    })
  },

  bind_input_Email: function (e) {
    this.setData({
      "data_to_change.Email": e.detail.value
    })
  },

  submit_modify: function () {
    console.log('you clicked submit modify')
    let p = this
    wx.showLoading({
      title: '正在修改',
    })
    /*
    util.request('/api/user/modify', function(res){

    }, this.data.data_to_change)
    */
  }

})