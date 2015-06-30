var express = require('express');
var Post = require('../model/post');
var router = express.Router();

/* 首页 */
router.get('/', function(req, res, next) {
  Post.find(function(err, posts){
    if(err){
      console.log("首页文章找寻错误");
    }

    var homeSets = ["css","javascript","html","fear","tool","test"];
    res.render('list',{title:"首页",posts:posts});
  });

});

/* 首页 */
router.get('/:tag', function(req, res, next) {
  var p_tag = req.param.tag;
  Post.find({tags:p_tag},function(err, posts){
    if(err){
      console.log("首页文章找寻错误");
    }
    res.render('list',{title:"首页",posts:posts});
  });

});

module.exports = router;
