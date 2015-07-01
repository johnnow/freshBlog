var express = require('express');
var Mock = require('../model/mock');
var router = express.Router();


/* 仿物志列表页面*/
router.get('/', function(req, res, next){
  Mock.find(function(err,mocks){
    if(err){
      console.log("仿物志列表页面出错");
    }
    res.render("mockList",{title:"仿物志列表页面",mocks:mocks});
  });

});


/* 新增仿物志*/
router.get('/addMock', function(req, res, next){
  res.render("addMock",{title:"新增仿物志"});
});

/* 新增仿物志页面 请求*/
router.post('/addMock', function(req, res, next){

  var now = new Date();
  var time = getDetailTime();
  console.log(time.minutes);
  var mock = new Mock({
    albumImg:req.body.albumImg,
    title:req.body.title,
    author:req.body.author,
    super:req.body.super,
    updateDate:time.minutes,
    url:req.body.url,
    pv:0
  });

  mock.save(function(err){
    if(err){
      console.log("新增仿物志失败");
    }
    res.redirect("/");
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
