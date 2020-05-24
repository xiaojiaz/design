var app = getApp()
let user_No=""
const db = wx.cloud.database();
const nuser = db.collection('nusers');
const gusers = db.collection('gusers');
const news = db.collection('new');
Page({
  data: {
    users:[],
    num:0,
    display:false,
    userInfo: {},
    userListInfo: [{
      text: '我的资料',
      isunread: true,
      unreadNum: 0
    }, {
      text: '我的消息',
      isunread: false,
      unreadNum: 1
    }, {
      text: '意见反馈',
      isunread: true,
      unreadNum: 0
    }, {
      text: '敬请期待'
    }]
  },
  gotologin() {
    wx.reLaunch({
      url: '/pages/login/login',
    })
  },
  bindViewTap(){
    wx.navigateTo({
      url: '/pages/myinformation/myinformation',
    })
  },
  onShow: function (e){
    console.log("当前登录"+app.globalData.user_No)
    news.where({
      suser_No:app.globalData.user_No,
      state:"未读"
    }).get({
      success: (res) => {
        //console.log("哈哈哈")
        //console.log(res.data)
        if (res.data.length!=0){
          this.setData({
            num: res.data.length,
            display:false
          })
        }else{
          this.setData({
            //num: res.data.length,
            display: true
          })
        }
      }
    })

  },
  onLoad: function (e) {
    console.log("当前登录" + app.globalData.user_No)
    news.where({
      suser_No: app.globalData.user_No,
      state: "未读"
    }).get({
      success: (res) => {
        //console.log("哈哈哈")
        //console.log(res.data)
        if (res.data.length != 0) {
          this.setData({
            num: res.data.length,
            display: false
          })
        } else {
          this.setData({
            //num: res.data.length,
            display: true
          })
        }
      }
    })

  },
  bindViewTap1() {
    wx.navigateTo({
      url: '/pages/mynews/mynews',
    })
  },
  fankui:function(e){
    wx.navigateTo({
      url: '/pages/fankui/fankui',
    })
  }
 

})