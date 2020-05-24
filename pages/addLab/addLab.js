// pages/addLab/addLab.js
let lab_No="";//实验室编号
let size=0;//容量
let describe="";
let use="";
let location=""
const db = wx.cloud.database();
const labss = db.collection('labs');//注意，这里就是刚才的集合的名字——user
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageShow:true,
    imageUrl: ""
  },
  num(e){
    lab_No=e.detail.value
  },
  size(e) {
    size = Number(e.detail.value)
  },
  description(e) {
    describe = e.detail.value
  },
  location(e) {
    location = e.detail.value
  },
  use(e) {
    use = e.detail.value
  },
  upload() {
    this.setData({
      imageShow:false
    })
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.uploadImage(res.tempFilePaths[0])
      }
    })
  },
  uploadImage(imageUrl) {
    wx.cloud.uploadFile({
      cloudPath: 'images/example.png' + Math.random(), // 上传至云端的路径
      filePath: imageUrl, // 小程序临时文件路径
      success: res => {
        // 返回文件 ID
        console.log(res.fileID)
        this.setData({
          imageUrl: res.fileID
        })
      },
      fail: console.error
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  addLab(e){
    labss.add({
      data: {
        lab_No: lab_No,
        lab_Size: size,
        imageUrl: this.data.imageUrl,
        lab_location: location,
        use:use,
        describe: describe,
        yuyue: 0,
        sc: 0
      },
      success(res) {
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 2000
        })
      }, fail(res) {
        wx.showToast({
          title: '添加失败',
          icon: 'success',
          duration: 2000
        })
      }
    })
  }
})