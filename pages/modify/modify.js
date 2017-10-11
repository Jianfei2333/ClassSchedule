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
      Email: null,
      Password: null
    },
    inputClass: "weui-input_disabled",
    showDialogSuccess: false,
    showDialogFail: false,
    showDialogError: false,
  },

  onShow: function (options) {
    this.setData({
      Student_info: app.globalData.Student_info,
      "data_to_change.Name": app.globalData.Student_info.name,
      "data_to_change.Student_id": app.globalData.Student_info.student_id,
      "data_to_change.Email": app.globalData.Student_info.email,
      "data_to_change.Password": app.globalData.Student_info.password
    })
  },

  switch_disable: function (e) {
    console.log(e.detail.value)
    if (!e.detail.value) {
      this.setData({
        disable_change: true,
        inputClass: "weui-input_disabled"
      })
    } else {
      this.setData({
        disable_change: false,
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

  updateData: function(p) {
    app.globalData.Student_info.name = p.data.data_to_change.Name
    app.globalData.Student_info.email = p.data.data_to_change.Email
    app.globalData.Student_info.student_id = p.data.data_to_change.Student_id
    app.globalData.Student_info.Password = p.data.data_to_change.Password
    wx.setStorageSync("student_info", app.globalData.Student_info)
    p.setData({
      Student_info: app.globalData.Student_info,
      disable_change: true,
      inputClass: "weui-input_disabled",
    })
  },

  submit_modify: function () {
    console.log('you clicked submit modify')
    let p = this
    
    wx.showLoading({
      title: '请稍后',
    }) 
    
    util.request('/api/user/modify', function(res){
      if (res.data.status === 'SUCCESS') {
        p.updateData(p)
        
        p.setData({
          showDialogSuccess: true
        });
        console.log(p.data.showDialogSuccess)
        setTimeout(function () {
          p.setData({
            showDialogSuccess: false
          })
        }, 2000)
      } else if (res.data.status === 'FAIL'){
        var that = p;
        p.setData({
          showDialogFail: true
        });
        setTimeout(function () {
          that.setData({
            showDialogFail: false
          });
        }, 2000);
      } else {
        var that = p;
        p.setData({
          showDialogError: true
        });
        setTimeout(function () {
          that.setData({
            showDialogError: false
          });
        }, 2000);
      }
      wx.hideLoading()
      
    }, this.data.data_to_change)
    
  }

})