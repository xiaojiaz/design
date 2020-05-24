// pages/login/login.js
var app = getApp()
let labs=[];
const db = wx.cloud.database();
const points = db.collection('point');//注意，这里就是刚才的集合的名字——user
let id=""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_No: "",
    shenhe: true,
    shenheing: true,
    shenheed: true,
    used: true,
    input: true,
    lab:[]
  },
  gotoindex() {
    points.doc(id).remove({
      success: function (res) {
        console.log("删除成功")
      }
    })
    wx.showToast({
      title: '删除成功',
      icon: 'success',
      duration: 2000
    })
  },
  findpwd() {
    wx.navigateTo({
      url: '/pages/fpwd/fpwd'
    })
  },
  zhuce() {
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },
  onLoad:function(e){
    let str = e.userStr
    let user = JSON.parse(str);
    labs=user
    console.log(labs)
    this.setData({
      user_No:"N2016110401",
      lab:labs
    })
    id=labs._id
    if(labs.p_State=="已使用"){
      this.setData({
        shenhe:false,
        used:false,
        shenheing:true
      })
    } else if (labs.p_State == "审核中"){
      this.setData({
        shenheing: false,
        used: true,
        shenhe:true
      })
      }else if (labs.p_State == "未通过"){
      this.setData({
        shenheing: true,
        used: true,
        shenhe: false
      })
    } else if (labs.p_State == "已通过"){
      this.setData({
        shenheing: true,
        used: true,
        shenhe: false
      })
    }
  }
})