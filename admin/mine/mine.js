var app = getApp()
Page({
  data: {
    userInfo: {},
    projectSource: 'https://github.com/liuxuanqiang/wechat-weapp-mall',
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
  bindViewTap() {
    wx.navigateTo({
      url: '/pages/myinformation/myinformation',
    })
  },
  bindViewTap1() {
    wx.navigateTo({
      url: '/pages/mynews/mynews',
    })
  }



})