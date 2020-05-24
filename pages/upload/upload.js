// pages/upload/upload.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl:""
  },
  upload(){
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
      cloudPath: 'images/example.png', // 上传至云端的路径
      filePath:imageUrl, // 小程序临时文件路径
      success: res => {
        // 返回文件 ID
        console.log(res.fileID)
        this.setData({
          imageUrl:res.fileID
        })
      },
      fail: console.error
    })
  }
 


})