// pages/film/film.js
Page({
  data: {
    type: "now-playing",
    nowPlaying: [],
    page: 1
  },
  staticData: {
    flag: true
  },
  handleChangeType() {
    if (this.data.type === "now-playing") {
      this.setData({
        type: "coming-soon"
      })
      return;
    }

    if (this.data.type === "coming-soon") {
      this.setData({
        type: "now-playing"
      })
      return;
    }
  },
  onReady() {
    this.handleGetNowplaying()
  },
  handleGetNowplaying() {
    //https://m.maizuo.com/v4/api/film/now-playing
    //page=1
    //count=7
    wx.request({
      url: 'https://m.maizuo.com/v4/api/film/now-playing',
      data: {
        "page": 1,
        "count": 7
      },
      header: {
        'content-type': 'application/json'
      },
      success: this.handleGetNowplayingData.bind(this)
    })
  },
  handleGetNowplayingData(res) {
    let data = res.data.data.films;
        if(data.length!==0){
            this.setData({
                nowPlaying:[...this.data.nowPlaying,...data],
                page:this.data.page+1
            })
           
        }
        console.log(this.data.page)
  },
  handleScrollBottom() {
    this.getNowplayingmoreData()
  },
  getNowplayingmoreData() {
    if (this.data.page < 6 && this.staticData.flag) {
      this.staticData.flag = false;
      setTimeout(this.handleRuquestData, 500)
    }
  },
  handleRuquestData() {
    wx.request({
      url: 'https://m.maizuo.com/v4/api/film/now-playing',
      data: {
        "page": this.data.page,
        "count": 7
      },
      header: {
        'content-type': 'application/json'
      },
      success: this.handleGetNowplayingData.bind(this)
    })
    this.staticData.flag = true;
  },
  handledetail(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    })
  }
})