// pages/register/register.js
const db=wx.cloud.database();
const nuser=db.collection("nusers");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  formSubmit:function(event){
      nuser.add({
        data:{
          user_Id:"N001",
          user_No:event.detail.value.zhanghao,
          user_Password: event.detail.value.pwd,
          user_Name: event.detail.value.name,
          user_Email: event.detail.value.email,
          user_Grade: event.detail.value.grade,
          user_Phone: event.detail.value.phone
        },
        success(res) {
          wx.showToast({
            title: '注册成功',
            icon: 'success',
            duration: 2000
          })
        }, fail(res) {
          wx.showToast({
            title: '注册失败',
            icon: 'success',
            duration: 2000
          }) 
        }
      })
    }
})