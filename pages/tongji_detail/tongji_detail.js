const app = getApp();
const db = wx.cloud.database();
const points = db.collection('point');//注意，这里就是刚才的集合的名字——user
const labss = db.collection('labs');//注意，这里就是刚才的集合的名字——user
let labs = [];
let user_Nos = "N201611041"
let id = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collected: true,
    lab_brief: "无",
    s_time: "",
    e_time: "",
    user_No: "",
    date: "",
    lab: []
  },
  shoucang() {
    wx.showToast({
      title: '收藏成功',
      icon: 'success',
      duration: 2000
    })
    labss.where({
      lab_No: labs.lab_No
    }).get({
      success: (res) => {
        let lab = res.data;
        if (lab.length == 0) {
        } else {
          id = lab[0]._id
          console.log("ID是" + id)
          console.log(lab[0])
          labss.doc(id).update({        //将预约数量加一
            data: {
              sc: lab[0].sc + 1,
            },
            success(res) {
              //console.log(res)
            }, fail(res) {
              console.log(res)
            }
          })
        }
      }
    })
  },
  gotoindex() {
    /*wx.showToast({
      title: '预约成功',
      icon: 'success',
      duration: 2000
    })*/
    points.add({
      data: {                //在预约表中新增一条预约记录
        lab_No: labs.lab_No,
        p_State: "审核中",
        lab_reservation: this.data.lab_brief,
        user_No: user_Nos,
        s_Time: this.data.s_time,
        e_Time: this.data.e_time,
        imageUrl: labs.imageUrl,
        pionts: 0,
        advice: ""
      },
      success(res) {
        wx.showToast({
          title: '预约成功',
          icon: 'success',
          duration: 2000
        })
        labss.where({
          lab_No: labs.lab_No
        }).get({
          success: (res) => {
            let lab = res.data;
            if (lab.length == 0) {
            } else {
              id = lab[0]._id
              console.log("ID是" + id)
              console.log(lab[0])
              labss.doc(id).update({        //将预约数量加一
                data: {
                  yuyue: lab[0].yuyue + 1,
                },
                success(res) {
                  //console.log(res)
                }, fail(res) {
                  console.log(res)
                }
              })
            }
          }
        })
        wx.switchTab({
          url: '/pages/mine/mine',
        })
      }, fail(res) {
        wx.showToast({
          title: '预约失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  findpwd() {
    wx.navigateTo({
      url: '/pages/fpwd/fpwd'
    })
  },
  onLoad: function (e) {
    let user = JSON.parse(e.userStr);
    console.log(user);
    labs = user;
    this.setData({
      lab: labs
    })
    //console.log(labs);
  }
})