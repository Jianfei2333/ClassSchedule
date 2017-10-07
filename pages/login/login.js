// pages/login/login.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Net_id: null,
    Password: null,
    Student_id: null,
    Name: null,
    Email: null,
  },

  bind_input_Net_id:function(e) {
    this.setData({
      Net_id: e.detail.value
    })
  },

  bind_input_Password:function(e) {
    this.setData({
      Password: e.detail.value
    })
  },

  bind_input_Student_id:function(e) {
    this.setData({
      Student_id: e.detail.value
    })
  },

  bind_input_Name:function(e) {
    this.setData({
      Name: e.detail.value
    })
  },

  bind_input_Email:function(e) {
    this.setData({
      Email: e.detail.value
    })
  },

  register: function () {
    console.log('you clicked register')
    let p = this
    this.setData({
      showLoading: true
    })
    wx.request({
      url: 'https://iambanana.cn/api/user/register',
      method: 'POST',
      data: {
        Net_id: "xingjf3",
        Student_id: "15336204",
        Password: "7endOrse$d",
        Name: "邢剑飞",
        Email: "xjf999999@hotmail.com"
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //console.log(res)
        p.setData({
          showLoading: false
        })
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

          app.globalData.union_id = res.data.content.Union_id
          
          wx.setStorageSync("union_id", res.data.content.Union_id)
          console.log('success')
          console.log(res.data.content.Union_id)
          wx.redirectTo({
            url: '../index/index',
          })

        } else if (res.data.status === 'FAIL') {

        }
        
        //console.log(app.globalData.union_id)
      }
    })
  },

/*
  register: function() {
      var that = this;
      this.setData({
        showDialogSuccess: true
      });
      setTimeout(function () {
        that.setData({
          showDialogSuccess: false
        });
      }, 2000);
  },
*/
/*
  register: function () {
    wx.showModal({
      title: '弹窗标题',
      content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
      confirmText: "主操作",
      cancelText: "辅助操作",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击主操作')
        } else {
          console.log('用户点击辅助操作')
        }
      }
    });
  },
*/
})