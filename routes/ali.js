var express = require('express');
var Post = require('../model/post');
var router = express.Router();


/* 阿里路首页 */
router.get('/', function(req, res, next) {
  res.render('ali-wanted',{title:"阿里路呀"});
});


/* 阿里路文章首页 */
router.get('/:id', function(req, res, next) {
  var a_id = req.params.id;
  console.log(a_id);
  res.render('ali-post',{title:"阿里路呀-文章"});
});

module.exports = router;
