var express = require('express');
var Video = require('../model/video');
var router = express.Router();


/* 视频列表页面*/
router.get('/', function(req, res, next){
  Video.find(function(err,videoes){
    if(err){
      console.log("视频列表页面出错");
    }
    res.render("videoList",{title:"视频列表页面",videoes:videoes});
  });

});


/* 新增视频页面*/
router.get('/addVideo', function(req, res, next){
  res.render("addVideo",{title:"新增视频"});
});

/* 新增视频页面 请求*/
router.post('/addVideo', function(req, res, next){

  var now = new Date();
  var time = getDetailTime();
  console.log(time.minutes);
  var video = new Video({
    albumImg:req.body.albumImg,
    title:req.body.title,
    author:req.body.author,
    super:req.body.super,
    updateDate:time.minutes,
    url:req.body.url,
    pv:0
  });

  video.save(function(err){
    if(err){
      console.log("视频保存失败");
    }
    res.redirect("/");
  });

});

/* video页 */
router.get('/:id', function(req, res, next) {
  var v_id = req.params.id;
  Video.find({_id:v_id},function(err,videos){
    if(err){
      console.log("没有此文章");
    }
    res.render('video',{title:"视频页",video:videos[0]});
  });

});

function getDetailTime(){
  var now = new Date();
  var time = {
    date:now,
    year:now.getFullYear(),
    month:now.getFullYear() + "-" + (now.getMonth() + 1 ),
    day:now.getFullYear() + "-" + (now.getMonth() + 1 ) + "-" +now.getDate(),
    minutes:now.getFullYear() + "-" + (now.getMonth() + 1 ) + "-" +now.getDate() + " " +
        now.getHours() + ":" + (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes())
  };
  return time;
}

function checkLogin(req,res){
     if(req.session.user){
       res.redirect('back');
     }else{
       res.redirect('/users/login');
     }
}


module.exports = router;
