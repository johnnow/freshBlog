var express = require('express');
var Post = require('../model/post');
var formidable = require('formidable');
var router = express.Router();

/* 首页 */
router.get('/', function(req, res, next) {
  Post.find(function(err, posts){
    if(err){
      console.log("首页文章找寻错误");
    }

    var homeSets = ["css","javascript","html","fear","tool","test"];
    res.render('index',{title:"首页",posts:seperatePosts(posts,homeSets)});
  });
});

function seperatePosts(arr,keySets){
  var obj = {};
  var i,ln;
  for(i = 0,ln=keySets.length;i<ln;i++){
    obj[keySets[i]] = [];
  }
  for(i = 0,ln = arr.length; i < ln; i++){
    var tag = arr[i].tags[0];
    if(obj[tag].length <= 8){
      obj[tag].push(arr[i]);
    }
  }
  return obj;
}



module.exports = router;
