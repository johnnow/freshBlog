var express = require('express');
var Widget = require('../model/widget');
var router = express.Router();

/* 插件文章首页 */
router.get('/c3cactus/', function(req, res, next) {
    Widget.find({source:"selector"},function(err,widgets){
        if(!err){
            res.render("c3cactus/selector",{title:"selector",widgets:widgets});
        }
    });

});

router.get('/c3cactus/:id', function(req, res, next) {
    var a_id = req.params.id ? req.params.id : "selector";
    Widget.find({source:a_id},function(err,widgets){
        if(!err){
            res.render("c3cactus/selector",{title:"selector",widgets:widgets});
        }
    });
});

module.exports = router;

/* 新增组件页面*/
router.get('/addWidget', function(req, res, next){
    res.render("c3cactus/addWidget",{title:"新增插件"});
});

/* 新增组件页面 请求*/
router.post('/addWidget', function(req, res, next){

    var now = new Date();
    var time = getDetailTime();
    console.log(time.minutes);

    console.log("自己解析：",handleWrap(req.body.cssCode));
    var hstr = decodeHtml(req.body.divCode);
    var cstr = decodeHtml(req.body.cssCode);


    var widget = new Widget({
        title:req.body.title,
        desc:req.body.desc,
        source:req.body.source,
        divCode:req.body.divCode,
        cssCode:req.body.cssCode,
        divRaw:hstr,
        cssRaw:cstr,
        updateDate:time.minutes
    });

    widget.save(function(err){
        if(err){
            console.log("组件保存失败");
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

// 转义
function decodeHtml(s){
    var HTML_DECODE = {
        "&lt;" : "<",
        "&gt;" : ">",
        "&amp;" : "&",
        "&nbsp;": " ",
        "&quot;": "'",
        "<p>":"",
        "</p>":"",
        "©": "",
        "&#39;":"'"

        // Add more
    };

    s = (s != undefined) ? s : this.toString();
    return (typeof s != "string") ? s :
        s.replace(/&\w+;|&#(\d+);|^(<p>)|(<\/p>)$|\s{2}|<pre(?:\s+.*\s*=\s*["'].*["'])?\s*>|<code(?:\s+\.*=['"].*['"])?\s*>|<\/pre>|<\/code>/g,
            function($0, $1){
                var c = HTML_DECODE[$0];
                if(c == undefined){
                    // Maybe is Entity Number
                    if(!isNaN($1)){
                        if($1 == 160){
                            c = String.fromCharCode($1 == 160);
                        }else{
                            c = "";
                        }
                    }else{
                        c = "";
                    }
                }
                return c;
            });
}

var handleWrap =function(s){
    console.log("s:",s);
    var c = "";
    return s.replace(/&\w+;|&#(?:\d)+|\s{2}|<pre(?:\s+.*\s*=\s*["'].*["'])?\s*>|<code(?:\s+\.*=['"].*['"])?\s*>|<\/pre>|<\/code>/g,
        function($0){
            if($0 == '&quot;'){
                c = "'";
            }else if($0 == '&#39'){
                c = "'";
            }else{
                c = "";
            }
            console.log("$0",$0,"c:",c);
        return c;
    });
};