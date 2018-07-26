// pages/detail/detail.js
Page({
  data:{
    filmId:"",
    filminfos:[]
  },
  onLoad(options){
    this.setData({
      filmId:options.id
    })
    this.getfimlCont(this.data.filmId)
  },
  getfimlCont(filmId){
    var url="https://m.maizuo.com/v4/api/film/";
    wx.request({
      //https://m.maizuo.com/v4/api/film/4266__t=1532507912315
      url:url+filmId,
      data:{
        "__t":1532507912315
      },
      header:{
        "content-type":"application/json"
      },
      success:this.getfilminfoSuc.bind(this)
    })
  },
  getfilminfoSuc(res){
    let data=res.data.data.film;
    let infos=[];
      infos.push(data)
    this.setData({
      filminfos:infos
    })
    console.log(infos)
  }
})