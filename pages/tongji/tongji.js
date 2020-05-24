// pages/tongji/tongji.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listgoods: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    let user = JSON.parse(e.userStr);
    console.log("传")
    console.log(user);
    this.setData({
      listgoods:user
    })
  },
  yuyue(e) {
    var index = parseInt(e.currentTarget.dataset.index)
    console.log(index)
    var user = this.data.listgoods[index];
    console.log(user)
    //将json转成字符串
    let userStr = JSON.stringify(user);
    console.log(userStr);
    wx.navigateTo({
      url: '/pages/tongji_detail/tongji_detail?userStr=' + userStr,
    })
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