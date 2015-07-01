var express = require('express');
var Body = require('../model/body');
var router = express.Router();


/* 身体数据列表页面*/
router.get('/', function(req, res, next){
  Body.find(function(err,bodies){
    if(err){
      console.log("身体数据列表页面出错");
    }

    var drawData = getDrawData(bodies);
    res.render("body",{title:"身体数据列表页面",drawData:drawData,bodies:bodies});
  });
});


/* 新增身体数据页面*/
router.get('/addBody', function(req, res, next){
  res.render("addBody",{title:"新增身体数据"});
});

/* 新增身体数据页面 请求*/
router.post('/addBody', function(req, res, next){

  var now = new Date();
  var time = getDetailTime();
  var body = new Body({
    fatContent:req.body.fatContent,
    weight:req.body.weight,
    basalMeta:req.body.basalMeta,
    updateDate:time.day
  });

  body.save(function(err){
    if(err){
      console.log("身体数据保存失败");
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

/** 获取绘图数据**/
function getDrawData(arr){
    var drawData = {
        dateArr:[],
        weights:[],
        fatContents:[],
        basalMetas:[]
    };
    var bodyData;
    for(var i = 0,ln = arr.length;i<ln;i++){
        bodyData = arr[i];
        drawData.dateArr.push(bodyData.updateDate);
        drawData.fatContents.push(bodyData.fatContent);
        drawData.weights.push(bodyData.weight);
        drawData.basalMetas.push(bodyData.basalMeta);
    }
    return drawData;
}

module.exports = router;
