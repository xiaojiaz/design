var app = getApp()
const db = wx.cloud.database();
const labss = db.collection('labs');//注意，这里就是刚才的集合的名字——user
const _ = db.command;
let yuyues=[];
let scs=[];
let tongji=0;
let xuehao="";
let bianhao="";
let use="";
let size=0;
let s_Time ="2020-01-01";
let e_Time ="2020-01-01";
let labs=[];
let lab1=[];
let navigate=true
let length=0;
Page({
  data: {
    show: false,
    onshow: true,
    dates: '2020-01-01',
    datess: '2020-01-01',
    times: '00:00',
    timese: '00:00',
    objectArray: ['不输入', '安卓开发', '苹果开发', '网络测试', '教育技术', '数字电路', '计算机组成', '计算机基础教学'],
    objectArray1: ['不输入','A001', 'A002', 'A003', 'A004', 'B001', 'B002', 'B003'],
    objectArray2: ['默认', '柱状图'],
    index: 0,
    index: 0,
    num: 0,
    admin_Login:false,
    current: 0,
    listgoods: [],
    labotory: [],
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
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    //console.log(app.globalData.admin_Login)
    this.setData({
      admin_Login: app.globalData.admin_Login
    })
  },
  onLoad: function () {
    labss.where({
      yuyue: _.gte(0)
    }).orderBy('yuyue','desc').get({
      success: (ress) => {
          yuyues = ress.data;
        // console.log(yuyues)
          //console.log("aaa")
          this.setData({
            listgoods: yuyues
          })
      }
    })
    labss.where({
      sc: _.gte(0)
    }).orderBy('sc', 'desc').get({
      success: (ress) => {
        scs = ress.data;
        //console.log(yuyues)
        //console.log("aaa")
        this.setData({
          listgoodss: scs
        })
      }
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  //  点击时间组件确定事件  
  bindTimeChange: function (e) {
    console.log("谁哦按")
    this.setData({
      times: e.detail.value
    })
  },
  bindTimeChanges: function (e) {
    console.log("谁哦按")
    this.setData({
      timese: e.detail.value
    })
  },
  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    console.log(e.detail.value)
    s_Time=e.detail.value
    this.setData({
      datess: e.detail.value
    })
   
  },
  bindDateChanges: function (e) {
    console.log(e.detail.value)
    e_Time=e.detail.value
    this.setData({
      dates: e.detail.value
    })
  },
  //  点击城市组件确定事件  
  bindPickerChange: function (e) {
   // console.log(e.detail.value)
    this.setData({
      index: e.detail.value
    })
    use=this.data.objectArray[e.detail.value]
    //console.log("使用"+use)
  },
  bindPickerChange2: function (e) {
    //console.log(e.detail.value)
    this.setData({
      index: e.detail.value
    })
    tongji = e.detail.value
    //console.log(tongji)
  },
  xuehao: function (e){
    //console.log(e.detail.value)
    xuehao=e.detail.value
  },
  size: function (e) {
    //console.log(e.detail.value)
    size = Number(e.detail.value)
  },
  compare: function (s_Time,e_Time){
    let time = s_Time.split("-")
    let time1 = e_Time.split("-")
    let year = Number(time[0])
    let month = Number(time[1])
    let day = Number(time[2])
    let year1 = Number(time1[0])
    let month1 = Number(time1[1])
    let day1 = Number(time1[2])
    //console.log(time)
    //console.log(time1)
    if (year > year1) {
      return false;
    } else if (year == year1) {
      if (month > month1) {
        return false;
      } else if (month == month1) {
        if (day > day1) {
          return false;
        }
      }
    }
    return true;
  },//日期比较
  compareThree: function (s_Time1,s_Time, e_Time) {
    //console.log("jasjfa")
    //console.log("比较时间"+s_Time1)
    //console.log("开始时间" + s_Time)
    //console.log("截止时间" + e_Time)
    let date2=s_Time1.split(":")
    let time2 =date2[0].split("-")
    let time = s_Time.split("-")
    let time1 = e_Time.split("-")
    let year2 = Number(time2[0])
    let month2 = Number(time2[1])
    let day2 = Number(time2[2])//预约日期
    let year = Number(time[0])
    let month = Number(time[1])
    let day = Number(time[2])//开始日期
    let year1 = Number(time1[0])
    let month1 = Number(time1[1])
    let day1 = Number(time1[2])//截止日期
    ///console.log(time2)
    //console.log(time)
    //console.log(time1)
    if(year2<year||year2>year1){//年份比较
      return false;
    }else if(year2==year&&year2==year1){
      if(month2<month||month2>month1){//年份相同月份比较
        return false;
      }else if(month2==month&&month2==month1){
        if(day2<day||day2>day1){//年月份都相同日期比较
          return false;
        }
      }else if(month2==month&&month2<month1){
        if(day2<day){
          return false;
        }
      }else if(month2>month&&month2==month){
        if(day2>day1){
          return false;
        }
      }
    }else if(year2==year&&year2<year1){//比较年份与开始年份相同
        if(month2<month){//比较月份较小
          return false;
        }else if(month2==month){
          if(day2<day){  //月份相同，日期较小
            return false;
          }
        }
    } else if (year2 > year && year2 == year1) {//比较年份与结束年份相同
         if(month2>month1){//月份较大
           return false;
         }else if(month2==month1){
           if(day2>day1){
             return false;//月份相同，日期较大
           }
         }
    }
    return true;
  },
  bianhao: function (e) {
    //console.log(e.detail.value)
    bianhao=e.detail.value
  },
  //条件组合查询过滤
  filter: function (e) {
    const _ = db.command;
    const that = this;
    let filterObj = {}
    if (xuehao=="") {
    }else{
      filterObj.user_No=xuehao;
    }
    if (bianhao=="") {
    }else{
      filterObj.lab_No = bianhao;
    }
    filterObj.p_State = "已通过"
    //console.log("筛选条件")
    //console.log(filterObj)
    lab1=[]
    db.collection("point").where(filterObj).get({
      success: function (res) {
        //console.log(res.data)
        labs=res.data
        //console.log(labs)
        for(let i=0;i<labs.length;i++){
          //console.log(labs[i].e_Time)
          //console.log("aaaaa")
          if (!that.compareThree(labs[i].e_Time,s_Time,e_Time)){
            //console.log("时间合格")
            labs.splice(i, 1)
          }
        }
        console.log("现在的实验室")
        console.log(labs)
        if(labs.length==0){
          navigate=false;
          wx.showToast({
            title: '结果为空！',
          })
        }else{
          //navigate=true;
          //console.log("labs长度是"+labs.length)
          for(let j=0;j<labs.length;j++){
            //console.log("每次的实验室编号" + labs[j].lab_No)
            labss.where({
              lab_No: labs[j].lab_No
            }).get({
              success: (res) => {
                let lab=res.data;
                if(lab.length==0){

                }else{
                  let uses=lab[0].use
                  //console.log("使用信息"+uses+"容纳人数"+lab[0].lab_Size)
                  if (lab[0].lab_Size < size || uses.indexOf(use)<0){
                    //console.log("容量太小")
                    lab1.splice(j,1)
                    //console.log("现在长度为" + that.data.labotory.length)
                  }else{
                    console.log("可以加入")
                    lab1.push(lab[0])
                    console.log("长度为"+lab1.length)
                    //length=lab1.length
                  }
                }
              }
          })
          }
         // console.log("现在有" + lab1.length)
        }
      }
    });
  },
  gotoindex1:function(){
    //console.log("jsdjasasfasfasvg")
    if(lab1.length==0){
      wx.showToast({
        title: '结果为空!!!',
      })
      return;
    }
    var that=this
    let userStr = JSON.stringify(lab1)
    if (tongji == 1) {
      console.log(userStr)
      wx.navigateTo({
        url: '/pages/book/book?userStr='+userStr,
      })
    } else {
      //console.log("统计" + tongji)
      //console.log("现在有" +lab1.length)
     ;
      console.log(userStr)
      wx.navigateTo({
        url: '/pages/tongji/tongji?userStr=' + userStr,
      })
    }
  },
  gotoindex() {
    lab1=[]
    length=0;
    /*wx.showToast({
      title: '预约成功',
      icon: 'success',
      duration: 2000
    })*/
    //console.log(s_Time+e_Time)
    if(!this.compare(s_Time,e_Time)){
      wx.showToast({
        title: '日期输入错误！！',
        icon: 'none',
        duration: 2500
      })
      return;
    }
    //that.filter()
    const _ = db.command;
    const that = this;
    let filterObj = {}
    if (xuehao == "") {
    } else {
      filterObj.user_No = xuehao;
    }
    if (bianhao == "") {
    } else {
      filterObj.lab_No = bianhao;
    }
    filterObj.p_State = "已使用"
    //console.log("筛选条件")
    //console.log(filterObj)
    //lab1 = []
    db.collection("point").where(filterObj).get({
      success: function (res) {
        //console.log(res.data)
        labs = res.data
        //console.log(labs)
        for (let i = 0; i < labs.length; i++) {
          //console.log(labs[i].e_Time)
          //console.log("aaaaa")
          if (!that.compareThree(labs[i].e_Time, s_Time, e_Time)) {
            //console.log("时间合格")
            labs.splice(i, 1)
          }
        }
        //console.log("现在的实验室")
        //console.log(labs)
        if (labs.length == 0) {
          //navigate = false;
          wx.showToast({
            title: '结果为空！',
          })
        } else {
          //navigate=true;
          //console.log("labs长度是"+labs.length)
          for (let j = 0; j < labs.length; j++) {
            //console.log("每次的实验室编号" + labs[j].lab_No)
            labss.where({
              lab_No: labs[j].lab_No
            }).get({
              success: (res) => {
                let lab = res.data;
                if (lab.length == 0) {

                } else {
                  let uses = lab[0].use
                  //console.log("使用信息"+uses+"容纳人数"+lab[0].lab_Size)
                  if(use=="不输入"){
                    use=""
                  }
                  if (lab[0].lab_Size < size || uses.indexOf(use) < 0) {
                    console.log("容量太小")
                    lab1.splice(j, 1)
                    //console.log("现在长度为" + that.data.labotory.length)
                  } else {
                    console.log("可以加入")
                    lab1.push(lab[0])
                    console.log("长度为" + lab1.length)
                    //length=lab1.length
                  }
                }
              }
            })
          }
          // console.log("现在有" + lab1.length)
        }
      }
    });
  },
  bindNumChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      num: e.detail.value
    })
  }
})
