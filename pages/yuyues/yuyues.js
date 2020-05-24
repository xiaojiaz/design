const app = getApp();
const db = wx.cloud.database();
const points = db.collection('point');//注意，这里就是刚才的集合的名字——user
const labss = db.collection('labs');//注意，这里就是刚才的集合的名字——user
const shoucang = db.collection('shoucang');//注意，这里就是刚才的集合的名字——user
const yuyue = db.collection('reserve');//注意，这里就是刚才的集合的名字——user
let labs=[];
let user_Nos="N201611041"
let id=""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collected:true,
    lab_brief:"无",
    s_time:"",
    e_time:"",
    user_No:"",
    date:"",
    lab:[]
  },
  shoucang() {
    shoucang.where({
      user_No:app.globalData.user_No
    }).get({
      success: (res) => {
        if(res.data.length==0){
          shoucang.add({
            data: {                //在收藏表中新增一条收藏记录
              lab_No: labs.lab_No,
              user_No: app.globalData.user_No,
            },
            success(res) {
              wx.showToast({
                title: '收藏成功',
                icon: 'success',
                duration: 2000
              })
            }
          })
        }else{
          wx.showToast({
            title: '您已经收藏了',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
   
},
   /* labss.where({
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
  },*/
  gotoindex() {
    let time=this.data.e_time
    /*wx.showToast({
      title: '预约成功',
      icon: 'success',
      duration: 2000
    })*/
    points.add({
      data: {                //在预约表中新增一条预约记录
        lab_No:labs.lab_No,
        p_State:"审核中",
        lab_reservation: this.data.lab_brief,
        user_No:user_Nos,
        s_Time: this.data.s_time,
        e_Time: this.data.e_time,
        imageUrl:labs.imageUrl,
        points:0,
        advice:""
      },
      success(res) {
        wx.showToast({
          title: '预约成功',
          icon: 'success',
          duration: 2000
        })
        labss.where({         
          lab_No:labs.lab_No
        }).get({
          success: (res) => {
            let lab = res.data;
            if (lab.length == 0) {
            }else{
              id=lab[0]._id
              console.log("ID是"+id)
              console.log(lab[0])
              labss.doc(id).update({        //将预约数量加一
                data:{
                  yuyue:lab[0].yuyue+1,
                },
                success(res) {
                  //console.log(res)
                },fail(res){
                  console.log(res)
                }
              })
            }
          }
        })
        /*wx.switchTab({
          url: '/pages/mine/mine',
        })*/
        var timerName = setTimeout(function () {
          console.log("定时任务")//定时查询审核状态
          //let labvatory=this.data.lab
          //console.log(labvatory)
          points.where({
            lab_No: labs.lab_No,
            e_Time: time
          }).get({
            success: (res) => {
              if(res.data.length!=0){
                let point=res.data[0]
                console.log(point.p_State)
                if (point.p_State=="审核中"){
                  //因长时间未得到管理员审核,所以预约失败
                  console.log("预约失败!")
                  let id = point._id
                  console.log(id)
                  points.doc(id).update({
                    data: {
                      p_State: "未通过",
                      advice:"管理员未审核，预约记录超时"
                    },
                      success(res) {
                        }
                      })
                    }
                }
            }
          })
        }, 120000)
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
  zhuce() {
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },
  onLoad:function(e){
    user_Nos = app.globalData.user_No
    console.log(user_Nos)
    console.log(e.userStr)
    let str=e.userStr.split("|")
    let user = JSON.parse(str[0]);
    console.log(user);
    labs=user;
    this.setData({
      lab_brief:str[1],
      s_time:str[4]+":"+str[2],
      e_time: str[4] + ":" +str[3],
      lab:labs
    })
    //console.log(labs);
    console.log(str[1])
  }
})