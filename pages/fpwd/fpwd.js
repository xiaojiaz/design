// pages/fpwd/fpwd.js
var Mcaptcha = require('../../utils/mcaptcha.js');
const db = wx.cloud.database();
const user = db.collection('nusers');
let no = null;//变量，用于存放用户输入的账号
let password = null;//变量，用于存放用户输入的密码
let id ="fddd30c55eae7da8004ae86a1451ff5b"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgCode:""
  },
  //刷新验证码
  onTap() {
    this.mcaptcha.refresh();
  },
  onReady: function () {
    this.mcaptcha = new Mcaptcha({
      el: 'canvas',
      width: 80,
      height: 35,
      createCodeImg: ""
    });
  },
  codeImg:function(e){
    this.setData({
      imgCode:e.detail.value
    })
  },
  formSubmit: function (e) {
    var res = this.mcaptcha.validate(this.data.imgCode);
    if (this.data.imgCode == '' || this.data.imgCode == null) {
  wx.showToast({ title: '请输入图形验证码'})
  return;
}
if (!res) {
  toast.showToast({ title: '图形验证码错误'})
  return;
}
    var that=this;
    no=e.detail.value.no;
    if (e.detail.value.pwd == e.detail.value.pwd1){
      password = e.detail.value.pwd
      console.log("账号" + no+" 密码"+password)
      user.where({
        user_No:no
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
            id = users[0]._id
            console.log(users[0])
            user.doc(id).update({
              data: {
                user_Password:password
              },
              success(res) {
                wx.showToast({
                  title: '重置成功！！',
                  icon: 'success',
                  duration: 2500
                })
              }
            })
          }
        }
      })
    }else{
      wx.showToast({
        title: '输入密码不一致！！',
        icon: 'none',
        duration: 2500
      })
    }
  }
  
 
})