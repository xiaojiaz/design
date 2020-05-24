// pages/login/login.js
var util = require('../../utils/util.js');
const app=getApp();
const db = wx.cloud.database();
const admin = db.collection('gusers');//注意，这里就是刚才的集合的名字——user
const user = db.collection('nusers');
const points = db.collection('point');
let no = null;//变量，用于存放用户输入的账号
let password = null;//变量，用于存放用户输入的密码
let nusers="N001";
let no_user=true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nuser:true
  },
  formSubmit: function (e) {
    //this.setData({
     // no:e.detail.value.no,
     // password: e.detail.value.pwd
    //})
    //console.log(no+password)
    var that = this;
    if(that.data.nuser==true){
      //app.update();
      user.where({
        user_No: e.detail.value.no
      }).get({
        success: (res) => {
          let users = res.data;
          console.log(users);
          if (users.length==0){
            wx.showToast({
              title: '用户名不存在！！',
              icon: 'none',
              duration: 2500
            })
          }else{
            console.log(users[0].user_Password);
            console.log(password);
            if (e.detail.value.pwd == users[0].user_Password){
              //var user = app.globalData;
              app.globalData.admin_Login = false
              app.globalData.user_No = e.detail.value.no
              console.log("当前登录用户"+app.globalData.user_No)
              wx.showToast({
                title: '登陆成功！！',
                icon: 'success',
                duration: 2500
              })
              wx.switchTab({
                url: '/pages/mine/mine',
              })
            }else{
              wx.showToast({
                title: '密码错误！！',
                icon: 'none',
                duration: 2500
              })
            }
          }
          /*for (let i = 0; i < users.length; i++) {  //遍历数据库对象集合*/
        } 
         
      })
    }else{
      //管理员登录
      console.log("aaaaa");
      admin.where({
        user_No: e.detail.value.no
      }).get({
        success: (ress) => {
          let guser = ress.data;
          console.log(guser);
          if (guser.length == 0) {
            wx.showToast({
              title: '用户名不存在！！',
              icon: 'none',
              duration: 2500
            })
          } else {
            console.log(guser[0].user_Password);
            console.log(password);
            if (e.detail.value.pwd == guser[0].user_Password) {
              app.globalData.admin_Login = true
              app.globalData.user_No = e.detail.value.no
              console.log("当前登录用户" + app.globalData.user_No)
              wx.showToast({
                title: '登陆成功！！',
                icon: 'success',
                duration: 2500
              })
              wx.switchTab({
                url: '/pages/mine/mine',
              })
            } else {
              wx.showToast({
                title: '密码错误！！',
                icon: 'none',
                duration: 2500
              })
            }
          }
          /*for (let i = 0; i < users.length; i++) {  //遍历数据库对象集合*/
        },
        fail: (res) =>{
          console.log(res)
        }
      })
    }
  },
  gotoindex(event) {
    /* console.log(event.detail.value)
   wx.switchTab({
      url: '/pages/mine/mine',
    })*/
  },
  findpwd() {
    wx.navigateTo({
      url: '/pages/fpwd/fpwd'
    })
  },
  zhuce(){
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },
  changId(){
    this.setData({
      nuser:true
    })
  },
  changId1(){
    this.setData({
      nuser: false
    })
  },
  compare: function (time, timess) {
    let times = time.split(" ")
    console.log(times)
    let time2 = times[0]
    let time3 = times[1]
    let time1 = time2.split("/")
    let year = Number(time1[0])
    let month = Number(time1[1])
    let day = Number(time1[2])
    console.log(day)
    let time4 = time3.split(":")
    let hour = Number(time4[0])
    let minute = Number(time4[1])
    //let second = time4[2]
    console.log("当前时间" + year + month + day + hour + minute)
    //console.log(timess)
    let time5 = timess.split(":")
    let time6 = time5[0]
    let hour1 = Number(time5[1])
    let minute1 = Number(time5[2])
    let time7 = time6.split("-")
    let year1 = Number(time7[0])
    let month1 = Number(time7[1])
    let day1 = Number(time7[2])
    console.log("当前时间" + year1 + month1 + day1 + hour1 + minute1)
    if (year == year1 && month == month1 && day == day1 && hour == hour1) {
      if (minute > minute1) {
        return true
      }
    } else {
      return false
    }

  },
  onLoad:function(e){
    this.startReportHeart();
    //var time = util.formatTime(new Date());
    //time = time.toString()
    //this.compare(time,"2020-01-01:00:00")
  },
  startReportHeart() {
    var time = util.formatTime(new Date());
    time=time.toString()
    //console.log(time)
    setInterval(function () {
      console.log("循环")
      points.get({
        success: (res) => {
          let point=res.data
          console.log(point)
          if(point.length!=0){
            for(let i=0;i<point.length;i++){
              console.log("循环中"+i)
              let timess=point[i].s_Time
              //this.compare(time,"2020-01-01:10:00")
              let times = time.split(" ")
              console.log(times)
              let time2 = times[0]
              let time3 = times[1]
              let time1 = time2.split("/")
              let year = Number(time1[0])
              let month = Number(time1[1])
              let day = Number(time1[2])
              console.log(day)
              let time4 = time3.split(":")
              let hour = Number(time4[0])
              let minute = Number(time4[1])
              //let second = time4[2]
              console.log("当前时间" + year + month + day + hour + minute)
              //console.log(timess)
              let time5 = timess.split(":")
              let time6 = time5[0]
              let hour1 = Number(time5[1])
              let minute1 = Number(time5[2])
              let time7 = time6.split("-")
              let year1 = Number(time7[0])
              let month1 = Number(time7[1])
              let day1 = Number(time7[2])
              console.log("当前时间" + year1 + month1 + day1 + hour1 + minute1)
              if (year == year1 && month == month1 && day == day1 && hour == hour1) {
                if(minute>minute1){
                  console.log("改变状态")
                  if(point[i].p_State=="已通过"){
                    let id = point[i]._id
                    points.doc(id).update({
                      data: {
                        p_State: "已使用",
                      },
                      success(res) {
                      }
                    })
                  }

                }
              }else{
                console.log("不改变状态")
              }
            } 
          }   
        }
      })
    }, 100000) //循环时间 这里是1秒
 }
})