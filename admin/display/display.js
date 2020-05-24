/*
***微信商城开发
***微信号：k1009756987
***博客：htmlk.cn
***QQ群：654226989
*/
var app = getApp()
Page({
  data: {
    current: 0,
    listgoods: [{
      "id": '0101001',
      "name": "移动开发实验室A001(30人)",
      "price": "修改",
      "type": "计算机中心一楼东区",
      "pic_url": "/labs/A001.jpg"
    }, {
      "id": '0101002',
        "name": "移动开发实验室A002(50人)",
        "pic_url": "/labs/A002.jpg",
        "price": "修改",
        "type": "计算机中心一楼东区"
    }, {
      "id": '0101003',
        "name": "移动开发实验室A003(80人)",
        "price": "修改",
        "type": "计算机实验一楼东区",
        "pic_url": "/labs/A003.jpg"
    }, {
      "id": '0102001',
        "name": "移动开发实验室A004(60人)",
        "price": "修改",
        "type": "计算机实验一楼东区",
        "pic_url": "/labs/A004.jpg"
    }, {
      "id": '0102002',
        "name": "移动开发实验室A005(30人)",
        "pic_url": "/labs/A004.jpg",
        "price": "修改",
        "type": "计算机实验一楼东区"
    }],
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
   /* wx.navigateTo({
      /*url: "/pages/yiguo/detail/detail?id=" + lookid.id
    })*/
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
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  correct(){
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
  },
  delete1(){
    wx.showToast({
      title: '删除成功',
      icon: 'success',
      duration: 2000
    })
  }
})
