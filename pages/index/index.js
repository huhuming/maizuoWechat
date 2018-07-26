//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [],
    nowPlaying: [],
    comingSoon:[]
  },
  onReady() {
    //https://m.maizuo.com/v4/api/billboard/home?
    this.getBannerUrl();
    this.getNowPlayingData();
    this.getcomingSoonData();
  },
  getBannerUrl() {
    wx.request({
      url: 'https://m.maizuo.com/v4/api/billboard/home', //仅为示例，并非真实的接口地址
      data: {
        "__t": 1532398799119
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: this.handleGetBannerSucc.bind(this)
    })
  },
  handleGetBannerSucc(res) {
    let data = res.data.data.billboards;
    let urls = []
    for (var i = 0; i < data.length; i++) {
      urls.push(data[i].imageUrl);
    }

    this.setData({
      imgUrls: [...urls]
    })
  },
  getNowPlayingData() {
    //https://m.maizuo.com/v4/api/film/now-playing?
    wx.request({
      url: "https://m.maizuo.com/v4/api/film/now-playing",
      data: {
        "__t" : 1532500055021,
        "page" : 1,
        "count" : 5
      },
      header:{
        "content-type":"application/json"
      },
      success:this.handleGetnowPlaying.bind(this)
    })
  },
  handleGetnowPlaying(res){
    let data =res.data.data.films;
    this.setData({
      nowPlaying:[...this.data.nowPlaying,...data]
    })
  },
  getcomingSoonData(){
    //https://m.maizuo.com/v4/api/film/coming-soon
    //__t=1532500055031
    //page=1
    //count=3
    wx.request({
      url:"https://m.maizuo.com/v4/api/film/coming-soon",
      data:{
        "__t":1532500055031,
        "page":1,
        "count":3
      },
      header:{
        "content-type":"application/json"
      },
      success:this.handleGetcomingSoon.bind(this)
    })
  },
  handleGetcomingSoon(res){
    let data=res.data.data.films;
    this.setData({
      comingSoon:[...this.data.comingSoon,...data]
    })
  }
})