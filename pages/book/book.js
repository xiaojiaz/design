var Charts = require('../../lab/wxcharts.js');       //引入wxcharts.js  
const db = wx.cloud.database();
const labss = db.collection('labs');//注意，这里就是刚才的集合的名字——user
// 为了使canvas在不同屏幕自适应进行以下换算
const W = wx.getSystemInfoSync().windowWidth;
const rate = 750.0 / W;
const code_w =700 / rate;
const code_h = 1000 / rate;
let lab=[]
let datas=[]
Page({

  data: {
    code_w: code_w,      //柱状图的宽
    code_h: code_h,        //柱状图的高
  },

  onLoad: function (e) {
      datas=[]
      lab=[]
      let user = JSON.parse(e.userStr);
      console.log(user);
      for(let i=0;i<user.length;i++){
          lab.push(user[i].lab_No)
          datas.push(user[i].yuyue)
      }
      console.log(lab);
   /* for(let j=0;j<user.length;j++){
      labss.where({
        lab_No:user[i].lab_No
      }).get({
        success: (res) => {
          let labs=res.data
          if(labs.length==0){

          }else{
            datas.push(labs[0].)
          }
        }
      })
    }*/
    
    this.charts()
  },

  charts: function () {
    let _this = this
    return new Promise(function () {

      new Charts({
        canvasId: 'columnCanvas',
        dataPointShape: false,
        type: 'column',
        legend: false,
        categories: lab,
        xAxis: {
          disableGrid: true,
          type: 'calibration'
        },
        series: [{
          name: '预约数量',
          data: datas,
          color: "rgba(255,90,87,1)"
          // color: "rgba(254,129,84,1)"
        }
        ],
        yAxis: {
          disableGrid: false,
          gridColor: "#ffffff",
          fontColor: "#ffffff",
          min: 0,
          max: _this.data.max,
          disabled: true,
          fontColor: "#ff6700"
        },
        dataItem: {
          color: "#ff6700"
        },
        width: code_w,
        height: code_h,
        extra: {
          column: {
            width: 25
          },

        }

      })
    })
  }
})
