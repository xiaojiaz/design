// pages/fankui/fankui.js
var util = require('../../utils/util.js');
var app = getApp()
let fankui=""
let people=""
const db = wx.cloud.database();
const news = db.collection('new');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  //  点击管理员确定事件  
  jieshouren: function (e) {
    people=e.detail.value
    console.log("接受人是"+people)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  fankui:function(e){
    console.log(e.detail.value)
    fankui=e.detail.value
  },
  onLoad: function (options) {

  },
  tijiao:function(e){
    var time = util.formatTime(new Date());
    console.log(time)
    news.add({
      data: {
        fuser_No:app.globalData.user_No,
        suser_No: people,
        news: fankui,
        time:time.toString(),
        state:"未读"
      },
      success(res) {
        wx.showToast({
          title: '发送成功',
          icon: 'success',
          duration: 2000
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