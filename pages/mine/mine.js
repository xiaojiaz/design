//index.js
//获取应用实例
const app = getApp()
const db = wx.cloud.database();
const points = db.collection('point');//注意，这里就是刚才的集合的名字——user
Page({
  data: {
    //轮播图
    admin_Login:false,
    imgUrls: [
      '../../images/lab1.jpg',
      '../../images/lab2.jpg',
      '../../images/lab3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    current: 0,
    listgoods: [{
      "id": '0101001',
      "name": "移动开始实验室A001(2020.3月21日 9:00-10:00)",
      "price": "待审核",
      "type": "2016110454张小佳",
      "pic_url": "/labs/A001.jpg"
    }, {
      "id": '0101002',
      "name": "移动开始实验室A002(2020.3月21日 9:00-10:00)",
      "pic_url": "/labs/A002.jpg",
      "price": "待审核",
      "type": "2016110454张小佳"
    }, {
      "id": '0101003',
      "name": "移动开始实验室A003(2020.3月21日 9:00-10:00)",
      "price": "待审核",
      "type": "2016110454张小佳",
      "pic_url": "/labs/A003.jpg"
    }, {
      "id": '0102001',
      "name": "移动开始实验室A004(2020.3月21日 9:00-10:00)",
      "price": "待审核",
      "type": "2016110454张小佳",
      "pic_url": "/labs/A004.jpg"
    }, {
      "id": '0102002',
      "name": "移动开始实验室A005(2020.3月21日 9:00-10:00)",
      "pic_url": "/labs/A004.jpg",
      "price": "待审核",
      "type": "2016110454张小佳"
    }],
    swiper: {
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 1000
    }
  },
  onLoad: function () {
  },
  onShow: function () {
    console.log(app.globalData.admin_Login)
    this.setData({
      admin_Login: app.globalData.admin_Login
    })
    points.get({
      success: (ress) => {
        let point = ress.data;
        console.log(point)
        //console.log("aaa")
        this.setData({
          listgoods: point
        })
      }
    })
  },
  golist: function () {
    wx.navigateTo({
      url: '/pages/reserve/reserve'
    })
  },
  gobrief(){
    wx.navigateTo({
      url: '/pages/brief/brief'
    })
  },
  delete1(){
    wx.showToast({
      title: '已通过！！',
      icon: 'success',
      duration: 2500
    })
  },
  look(e){
    var index = parseInt(e.currentTarget.dataset.index)
    console.log(index)
    var lab = this.data.listgoods[index];
    //console.log(lab)
    //将json转成字符串
    let userStr = JSON.stringify(lab);
    wx.navigateTo({
      url: '/pages/admin_check/admmin_check?userStr=' + userStr,
    })
  }
})
