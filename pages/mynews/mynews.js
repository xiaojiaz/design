// pages/mynews/mynews.js
const app = getApp();
const db = wx.cloud.database();
const news = db.collection('new');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    index:0,
    userListInfo1:[],
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
    }],
    newss:[]//接收的消息
  },
  lookNews:function(e){
    var index = parseInt(e.currentTarget.dataset.index)
    console.log(index)
    var user = this.data.userListInfo1[index];
    console.log(user)
    let id=user._id
    news.doc(id).update({
      data: {
        state: "已读"
      },
      success(res) {
      }
    })
    //将json转成字符串
    let userStr = JSON.stringify(user);
    wx.navigateTo({
      url: '/pages/look_Fankui/look_Fankui?userStr=' + userStr,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    news.where({
      suser_No: app.globalData.user_No
    }).get({
      success: (res) => {
        console.log(res.data)
        this.setData({
          userListInfo1:res.data
        })
      }
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