// pages/myinformation/myinformation.js
const app = getApp()
let user_No = ""
const db = wx.cloud.database();
const nusers = db.collection('nusers');
const gusers = db.collection('gusers');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    admin_Login: false,
    users:[],
    update:true
  },
  addLab(){
    this.setData({
      update:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    user_No = app.globalData.user_No
    console.log("当前登录用户:" + user_No)
    if (app.globalData.admin_Login == true) {//管理员登录
      gusers.where({
        user_No: user_No
      }).get({
        success: (res) => {//普通用户登录
          let user = res.data;
          console.log(user)
          if (user.length == 0) {

          } else {
            this.setData({
              users: user[0]
            })
          }
        }
      })
    }else{
      nusers.where({
        user_No: user_No
      }).get({
        success: (res) => {//普通用户登录
          let user = res.data;
          console.log(user)
          if (user.length == 0) {

          } else {
            this.setData({
              users: user[0]
            })
          }
        }
      })
    }
  },
  gotoindex:function(e){
    this.setData({
      update:true
    })
  },
  formSubmit:function(e){
    console.log(e.detail.value)
    if(app.globalData.admin_Login==false){
    nusers.where({
      user_No: e.detail.value.no
    }).get({
      success: (res) => {
        let users = res.data;
        if (users.length == 0) {
          wx.showToast({
            title: '用户名不存在！！',
            icon: 'none',
            duration: 2500
          })
        } else {
          let id = users[0]._id
          console.log(users[0])
          console.log("id是" + id)
          nusers.doc(id).update({
            data: {
              user_Email: e.detail.value.email,
              user_Phone:e.detail.value.phone
            },
            success(res) {
              wx.showToast({
                title: '修改成功!',
              })
            }
          })
        }
      }
    })
    }else{
      gusers.where({
        user_No: e.detail.value.no
      }).get({
        success: (res) => {
          let users = res.data;
          if (users.length == 0) {
            wx.showToast({
              title: '用户名不存在！！',
              icon: 'none',
              duration: 2500
            })
          } else {
            let id = users[0]._id
            console.log("id是"+id)
            console.log(users[0])
            gusers.doc(id).update({
              data: {
                user_Email: e.detail.value.email,
                user_Phone: e.detail.value.phone
              },
              success(res) {
                wx.showToast({
                  title: '修改成功!',
                })
              }
            })
          }
        }
      })
    }
          
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
    this.setData({
      admin_Login: app.globalData.admin_Login
    })
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

  }
})