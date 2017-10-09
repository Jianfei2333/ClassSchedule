// pages/login/login.js
const app = getApp()
const util = require('../../utils/util.js')



Page({

  data: {
    Student_info: {
      Net_id: null,
      Password: null,
      Student_id: null,
      Name: null,
      Email: null,
    },
    show_password: true,
  },

  bind_input_Net_id:function(e) {
    this.setData({
      "Student_info.Net_id": e.detail.value
    })
  },

  bind_input_Password:function(e) {
    this.setData({
      "Student_info.Password": e.detail.value
    })
  },

  bind_input_Student_id:function(e) {
    this.setData({
      "Student_info.Student_id": e.detail.value
    })
  },

  bind_input_Name:function(e) {
    this.setData({
      "Student_info.Name": e.detail.value
    })
  },

  bind_input_Email:function(e) {
    this.setData({
      "Student_info.Email": e.detail.value
    })
  },

  change_hide_password: function(e) {
    if (e.detail.value) {
      this.setData({
        show_password: false
      })
    } else {
      this.setData({
        show_password: true
      })
    }
  },

  updateData:function(dataPack){
    app.globalData.Union_id = dataPack.Union_id
    app.globalData.Student_info = dataPack.Student_info
    wx.setStorageSync("union_id", dataPack.Union_id)
    wx.setStorageSync("student_info", dataPack.Student_info)
  },

  register: function () {
    console.log('you clicked register')
    let p = this

    wx.showLoading({
      title: '正在登陆',
    })
    util.request('/api/user/register', function (res) {
      wx.hideLoading()
      if (res.data.status === 'SUCCESS') {
        var that = p;
        p.setData({
          showDialogSuccess: true
        });
        setTimeout(function () {
          that.setData({
            showDialogSuccess: false
          });
        }, 2000);
        
        p.updateData(res.data.content)
        if (!res.data.content.Student_info.student_id) {
          wx.switchTab({
            url: '../modify/modify',
          })
        } else {
          wx.switchTab({
            url: '../index/index',
          })
        }
        

      } else if (res.data.status === 'FAIL') {
        var that = p;
        p.setData({
          showDialogFail: true
        });
        setTimeout(function () {
          that.setData({
            showDialogFail: false
          });
        }, 2000);
      } else if (res.data.status === 'ERROR') {
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
    }, this.data.Student_info)
    
  },

  onShow: function() {
    let v = app.globalData.Union_id
    
    if (!!v) {
      wx.switchTab({
        url: '../index/index',
      })
    }
  },


})