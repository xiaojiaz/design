// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  gotoindex() {
    wx.switchTab({
      url: '/pages/search/search',
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
  }
})