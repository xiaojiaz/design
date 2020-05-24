const db = wx.cloud.database();
const points = db.collection('point');//注意，这里就是刚才的集合的名字——user
const labss = db.collection('labs');//注意，这里就是刚才的集合的名字——user
let user_Nos=""
var app = getApp()
let lab_No=""
Page({
  data: {
    admin_Login:true,
    show:false,
    current: 0,
    listgoods: [],
    listgoodss:[],
    swiper: {
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 1000
    }
  },
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh')
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    //ajax请求数据
    // wx.request({
    //         url: 'http://www.htmlk.cn/json-test/lists.json',
    //         header: {
    //             'Content-Type': 'application/json'
    //         },
    //         success: function(res) {
    //            switch1(res.data);
    //            console.log(res.data);
    //            that.setData({
    //                listgoods:res.data
    //            });
    //         }
    //     })
    //对商品进行价格排序
    console.log(this.data.listgoods);
    switch1(this.data.listgoods);
    function switch1(odata) {
      for (var i = 0; i < odata.length - 1; i++) {
        //console.log(odata[i].price);
        for (var j = 0; j < odata.length - i - 1; j++) {
          // console.log(parseInt(odata[j].price)+"-----"+parseInt(odata[j+1].price));
          if (parseInt(odata[j].price) > parseInt(odata[j + 1].price)) {
            var temp = odata[j];
            odata[j] = odata[j + 1];
            odata[j + 1] = temp;
          }
        }
      }
    }
  },
  //详情页跳转
  lookdetail: function (e) {
    var lookid = e.currentTarget.dataset;
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: "/pages/yiguo/detail/detail?id=" + lookid.id
    })
  },
  switchSlider: function (e) {
    this.setData({
      current: e.target.dataset.index
    })
  },
  changeSlider: function (e) {
    this.setData({
      current: e.detail.current
    })
  },
  onPullDownRefresh: function () {
    user_Nos = app.globalData.user_No
    console.log(user_Nos)
    points.where({
      user_No: app.globalData.user_No
    }).get({
      success: (ress) => {
        let point = ress.data;
        //console.log(ress.data)
        //console.log("aaa")
        this.setData({
          listgoods: point
        })
      }
    })
  },
  onShow: function () {
    console.log(app.globalData.admin_Login)
    this.setData({
      admin_Login: app.globalData.admin_Login
    })
    points.where({
      user_No: app.globalData.user_No
    }).get({
      success: (ress) => {
        let point = ress.data;
        //console.log(ress.data)
        //console.log("aaa")
        this.setData({
          listgoods: point
        })
        console.log(listgoods)
      }
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onLoad: function () {
    user_Nos=app.globalData.user_No
    //console.log(user_Nos)
    points.where({
      user_No: app.globalData.user_No
    }).get({
      success: (ress) => {
        let point = ress.data;
        //console.log(ress.data)
        //console.log("aaa")
        this.setData({
          listgoods:point
        })
      }
    })
  },
  cancel(e){
    var index = parseInt(e.currentTarget.dataset.index)
    //console.log(index)
    var lab = this.data.listgoods[index];
    //console.log(lab)
    //将json转成字符串
    let userStr = JSON.stringify(lab);
    wx.navigateTo({
      url: '/pages/cancel/cancel?userStr='+userStr,
    })
  },
  gotoindex() {
    /*wx.showToast({
      title: '预约成功',
      icon: 'success',
      duration: 2000
    })*/
    this.setData({
      show: true,
      onshow: false
    })
  },
  yuyue() {
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
  },
  addLab(e){
    wx.navigateTo({
      url: '/pages/addLab/addLab',
    })
  },
  labno(e){
    lab_No = e.detail.value
    console.log(lab_No)
  },
  gotoindex(e){
    //console.log("aaa")
    labss.where({
      lab_No: lab_No
    }).get({
      success: (res) => {
        let lab = res.data;
        if (lab.length == 0) {
          this.setData({
            listgoodss: []
          })
          wx.showToast({
            title: '无结果',
            icon: 'none',
            duration: 2000
          })
        }else{
          console.log("asd")
          this.setData({
            listgoodss:lab
          })
          console.log(this.data.listgoodss)
        }
      }
  })
  },
  manageLab(e){
    var index = parseInt(e.currentTarget.dataset.index)
    console.log(index)
    var user = this.data.listgoodss[index];
    console.log(user)
    let userStr = JSON.stringify(user);
    wx.navigateTo({
      url: '/pages/manageLab/manageLab?userStr=' + userStr,
    })
  }
})
