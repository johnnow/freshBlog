var express = require('express');
var User = require('../model/user');
var router = express.Router();

// 注册
router.get('/reg', function(req, res) {
  res.render("reg",{title:"注册"});
});

// 注册提交
router.post('/reg', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var role = username == "johnchat" ? "admin" : "tourist";
    var user = new User({"username":username,"password":password,"role":role});
    user.save(function(err){
        if(err){
           console.log("注册失败！");
        }
        res.redirect("/");
    });
});

// 登陆
router.get('/login', function(req, res) {
    res.render("login",{title:"登陆"});
});

// 登陆
router.post('/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var role = username == "johnchat" ? "admin" : "tourist";
    var user = new User({"username":username,"password":password,"role":role});
    User.find(user,function(err,docs){
        if(!err){
            if(docs!=''){
                req.session.user = user;
                res.redirect("/");
            }else{
                res.redirect("/users/login");
            }
        }else{
            console.log("登陆失败！");
        }
    });
});



module.exports = router;
