// pages/login/login.js
var app = getApp()
let labs = [];
let pointss=0;
let advice="";
const db = wx.cloud.database();
const points = db.collection('point');//注意，这里就是刚才的集合的名字——user
const users = db.collection('nusers');//注意，这里就是刚才的集合的名字——user
let id = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_No: "",
    shenhe: true,
    shenheing:true,
    shenheed:true,
    used:true,
    input:true,
    lab: []
  },
  gotoindex3() {
    points.doc(id).remove({
      success: function (res) {
        console.log("删除成功")
      }
    })
    wx.showToast({
      title: '删除成功',
      icon: 'success',
      duration: 2000
    })
  },
  gotoindex2(e){
    points.where({
      lab_No: labs.lab_No,
      s_Time: labs.s_Time
    }).get({
      success: (res) => {
        let users = res.data;
        if (users.length == 0) {
          wx.showToast({
            title: '用户名不存在！！',
            icon: 'none',
            duration: 2500
          })
        } else {
          //console.log("safas")
          let id = users[0]._id
          console.log(users[0])
          console.log(id)
          points.doc(id).update({
            data: {
              p_State: "未通过",
              advice:advice
            },
            success(res) {
              wx.showToast({
                title: '申请失败！！',
                icon: 'success',
                duration: 2500
              })
            }
          })
        }
      }
    })
  },
  gotoindex(e) {
    points.where({
      lab_No: labs.lab_No,
      s_Time: labs.s_Time
    }).get({
      success: (res) => {
        let users = res.data;
        if (users.length == 0) {
          wx.showToast({
            title: '用户名不存在！！',
            icon: 'none',
            duration: 2500
          })
        } else {
          //console.log("safas")
          let idi = users[0]._id
          console.log(users[0])
          console.log(idi)
          points.doc(id).update({
            data: {
              p_State:"已通过",
              advice:advice
            },
            success(res) {
              wx.showToast({
                title: '成功！！',
                icon: 'success',
                duration: 2500
              })
            }
          })
        }
      }
    })
  },
  points(e){
    //console.log(e.detail.value)
    pointss = Number(e.detail.value)
  },
  advice(e){
    console.log(e.detail.value)
    advice = e.detail.value
  },
  gotoindex1(e){
    if(pointss<6){
      console.log("该用户不能预约")
      console.log(this.data.lab.user_No)
      users.where({
        user_No: this.data.lab.user_No
      }).get({
        success: (res) => {
          let user = res.data;
          if (user.length == 0) {
            wx.showToast({
              title: '用户名不存在！！',
              icon: 'none',
              duration: 2500
            })
          } else {
            let id = user[0]._id
            //console.log(users[0])
            users.doc(id).update({
              data: {
                p_State: "不能预约"
              },
              success(res) {
                wx.showToast({
                  title: '操作成功！！',
                  icon: 'success',
                  duration: 2500
                })
              }
            })
    }
    }
    })
    }
    points.where({
      lab_No: labs.lab_No,
      s_Time:labs.s_Time
    }).get({
      success: (res) => {
        let users = res.data;
        if (users.length == 0) {
          wx.showToast({
            title: '用户名不存在！！',
            icon: 'none',
            duration: 2500
          })
        }else{
          //console.log("safas")
          let idi=users[0]._id
          //console.log(users[0])
          //console.log(idi)
          points.doc(id).update({
            data: {
              points: pointss,
              advice:advice
            },
            success(res) {
              wx.showToast({
                title: '评分成功！！',
                icon: 'success',
                duration: 2500
              })
            }
          })
          this.setData({
            input: true,
            used:true
          })
        }
     }
    })
  },
  onLoad: function (e) {
    let str = e.userStr
    let user = JSON.parse(str);
    labs = user
    console.log(labs)
    this.setData({
      user_No: "N2016110401",
      lab: labs
    })
    id = labs._id
    if (labs.p_State == "审核中") {
      this.setData({
        shenheing:false,
        input:false
      })
    } else if (labs.p_State == "未通过"){
      this.setData({
        shenheing: true,
        input: true,
        used:true
      })
      }else if(labs.p_State == "已通过"){
      this.setData({
        shenheing: true,
        input: true,
        used: true
      })
    } else if (labs.p_State == "已使用"){
      this.setData({
        shenheing: true,
        input: false,
        used: false
      })
    }
  }
})