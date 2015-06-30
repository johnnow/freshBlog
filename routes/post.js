var express = require('express');
var Post = require('../model/post');
var router = express.Router();



/* 增加文章页面*/
router.get('/addPost', function(req, res, next){
  res.render("addPost",{title:"新增文章"});
});

/* 增加文章页面 请求*/
router.post('/addPost', function(req, res, next){

  var now = new Date();
  var time = getDetailTime();
  console.log(time.minutes);
  var post = new Post({
    title:req.body.title,
    author:req.body.author,
    super:req.body.super,
    tags:[req.body.tags],
    content:req.body.content,
    updateDate:time.minutes,
    pv:0
  });

  post.save(function(err){
    if(err){
      console.log("文章保存失败");
    }
    res.redirect("/");
  });

});

/* 文章首页 */
router.get('/:id', function(req, res, next) {
  var p_id = req.params.id;
  Post.find({_id:p_id},function(err,posts){
    if(err){
      console.log("没有此文章");
    }
    res.render('post',{title:"文章首页",post:posts[0]});
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
