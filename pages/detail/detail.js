// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  gotoindex() {
    wx.showToast({
      title: '修改成功',
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
  }
})