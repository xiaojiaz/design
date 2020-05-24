const app=getApp();
const db = wx.cloud.database();
const labs = db.collection('labs');
const points = db.collection('point');
const users = db.collection('nusers');
const _ = db.command;
let use_reason="";
let date=""
let s_time=""
let e_time=""
let date1 = ""
let s_time1 = ""
let e_time1 = ""
let date2=""       //date类型的开始时间
let date3=""       //date类型的截止时间
let user_count=0;
let user_count_string="";
let introduction="";
Page({
  data: {
    show:false,
    onshow:true,
    dates: '2020-01-01',
    times: '00:00',
    timese: '00:00',
    objectArray: ['安卓开发', '苹果开发', '网络测试', '教育技术', '数字电路', '计算机组成', '计算机基础教学'],
    index: 0,
    num:0,
    listgoods: [],
    /*{
      "id": '0101001',
      "name": "移动开始实验室A001(移动开发)",
      "type": "计算机实验中心一楼东区",
      "pic_url": "/labs/A001.jpg"
    }*/
  },
  //  点击时间组件确定事件  
  bindTimeChange: function (e) {
    this.setData({
      times: e.detail.value
    })
    s_time=e.detail.value
  },
  bindTimeChanges: function (e) {
    this.setData({
      timese: e.detail.value
    })
    e_time=e.detail.value
  },
  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
    })
    date=e.detail.value
  },
  //  点击城市组件确定事件  
  bindPickerChange: function (e) {
    //console.log(e);
    this.setData({
      index: e.detail.value
    })
    use_reason = this.data.objectArray[this.data.index];
    //console.log(use_reason)

  },
  bindNumChange: function (e) {
   // console.log(e.detail.value)
    this.setData({
      num: e.detail.value
    })
  },
  get_num:function(e){
    //console.log(e.detail.value)
    user_count_string = e.detail.value;
    //console.log(user_count_string);
  },
  get_introduction: function (e){
    introduction=e.detail.value;
   // console.log(introduction);
  },
  use_reason:function(e){
    use_reason=e.detail.value
    console.log("用途是"+use_reason)
  },
  gotoindex: function (e) {
    //检查时间输入合法
    users.where({
      user_No:app.globalData.user_No
    }).get({
      success: (res) => {
        if(res.data.length!=0){
          let user = res.data
          if(user[0].p_State=="不能预约"){
            //return;
            wx.showToast({
              title: '评分过低，不能预约!',
              icon: 'none',
              duration: 2500
            })
          }else{
            if (!this.compareTimeTrue(s_time, e_time)) {
              wx.showToast({
                title: '时间输入不合法',
                icon: 'none',
                duration: 2500
              })
              return;
            }
            if (use_reason == "") {
              wx.showToast({
                title: '未输入用途',
                icon: 'none',
                duration: 2500
              })
              return;
            }
            //先去labs表中查询
            if (!Number(user_count_string)) {
              wx.showToast({
                title: '使用人数输入不合法',
                icon: 'none',
                duration: 2500
              })
            } else {
              user_count = Number(user_count_string);
              console.log(user_count)
              console.log(use_reason)
              console.log("用途是" + use_reason)
              labs.where({
                use: db.RegExp({//使用正则查询，实现对搜索的模糊查询
                  regexp: use_reason,
                  //从搜索栏中获取的value作为规则进行匹配。
                  options: 'i' //大小写不区分
                }),
                lab_Size: _.gte(user_count)
              }).get({
                success: (res) => {
                  let labss = res.data;
                  console.log(labss)
                  if (labss.length == 0) {
                    this.setData({        //将筛选出来的实验室赋值给对象数组
                      listgoods: []
                    })
                    return;
                  } else {
                    console.log("开始时间:" + date + " " + s_time)
                    console.log("截止时间:" + date + " " + e_time)

                    for (let i = 0; i < labss.length; i++) {
                      console.log("111")
                      points.where({
                        lab_No: labss[i].lab_No,
                        //p_State:_.neq("已使用")
                      }).get({
                        success: (res) => {
                          //console.log(res.data)
                          let point = res.data;
                          if (point.length == 0) {
                            //无数据
                          } else {
                            for (let j = 0; j < point.length; j++) {
                              date2 = point[j].s_Time
                              //console.log(date2)
                              date3 = point[j].e_Time
                              //console.log(date3)
                              //console.log(this.compareDate(date,date2))
                              //console.log(this.compareTime(s_time,date2,date3))
                              //console.log(this.compareTime(e_time,date2,date3))
                              if (this.compareDate(date, date2)) {
                              } else {
                                if (this.compareTime(s_time, date2, date3) && this.compareTime(e_time, date2, date3)) {
                                } else {
                                  console.log("预约时间重叠")
                                  labss.splice(i, 1)
                                }
                              }
                            }
                            this.setData({        //将筛选出来的实验室赋值给对象数组
                              listgoods: labss
                            })
                            //console.log(listgoods)
                            if (this.data.listgoods.length == 0) {
                              wx.showToast({
                                title: '结果为空',
                                icon: 'none',
                                duration: 2500
                              })
                            }
                          }
                        }
                      })
                      /*
                       console.log(this.data.listgoods[0].lab_No)*/
                    }
                    // for (let i = 0; i < users.length; i++) {  
                  }
                }
              })
              this.setData({
                show: true,
                onshow: false
              })
            }
          }
        }
      }
    })

    },
  back:function(e){
    this.setData({
      show:false
    })
  },
    yuyue(e){
      var index = parseInt(e.currentTarget.dataset.index)
      console.log(index)
      var user = this.data.listgoods[index];
      console.log(user)
      //将json转成字符串
      let userStr = JSON.stringify(user);
      console.log(userStr);
      userStr=userStr+"|"+introduction+"|"+s_time+"|"+e_time+"|"+date
      wx.navigateTo({
        url: '/pages/yuyues/yuyues?userStr='+userStr,
      })
    },
    onshow:function(e){
      use_reason=this.data.objectArray[0];
     // console.log(use_reason)
      date='2020-01-01';
      s_time='00:00';
      e_time='00:00';
    },
    onLoad: function (options) {
      use_reason = this.data.objectArray[0];
      console.log(use_reason)
      date = '2020-01-01';
      s_time = '00:00';
      e_time = '00:00';
    },
    compareDate:function(e1,e2){//日期比较
    console.log(e1)
      console.log(e2)
      let arr=e2.split(":")
      if(e1!=arr[0]){
        return true
      }else{
        return false
      }
    },
  compareTime: function (e1,e2,e3) {//时间比较
    console.log(e1)
    console.log(e2)
    console.log(e3)
    let arr1 = e1.split(":")
    let arr2 = e2.split(":")
    let arr3 = e3.split(":")
    let hour1 = parseInt(arr1[0])
    let minute1 = parseInt(arr1[1])
    let hour2 = parseInt(arr2[1])
    let minute2 = parseInt(arr2[2])
    let hour3 = parseInt(arr3[1])
    let minute3 = parseInt(arr3[2])
    //console.log("时:"+hour1+"分:"+minute1)
    //console.log("时:"+hour2+"分:"+minute2)
    //console.log("时:"+hour3 +"分:"+minute3)
    if(hour1<hour2||hour1>hour3){     //早于或者晚于
      return true
    }else if(hour1>hour2&&hour1<hour3){ //位于两者之间
      return false
    }else if(hour1==hour2){        //开始小时相同
      if(minute1<minute2){
        return true
      }else{
        return false
      }
    }else if(hour1==hour3){
      if(minute1>minute3){
        return true
      }else{
        return false
      }
    }
  },
  compareTimeTrue: function (e1, e2) {//输入时间合法检验
    let arr1 = e1.split(":")
    let arr2 = e2.split(":")
    let hour1 = parseInt(arr1[0])
    let minute1 = parseInt(arr1[1])
    let hour2 = parseInt(arr2[0])
    let minute2 = parseInt(arr2[1])
    //console.log("时:" + hour1 + "分:" + minute1)
    //console.log("时:" + hour2 + "分:" + minute2)
    if(hour1<hour2){
      return true
    }else if(hour1==hour2&&minute1<minute2){
      return true
    }else{
      return false
    }
  }
  })
  