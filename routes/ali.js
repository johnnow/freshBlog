var express = require('express');
var Post = require('../model/post');
var router = express.Router();


/* 阿里路首页 */
router.get('/', function(req, res, next) {
  Post.find({super:"ali"},function(err, posts){
    if(err){
      console.log("阿里文章找寻错误");
    }

    res.render('ali-wanted',{title:"阿里路呀",posts:posts});
  });

});


/* 阿里路文章首页 */
router.get('/:id', function(req, res, next) {
  var a_id = req.params.id;
  Post.find({_id:a_id},function(err,post){
    if(err){
      console.log("阿里文章点击失败");
    }
    res.render('ali-post',{title:"阿里路呀-文章",post:post});
  });


});

module.exports = router;
