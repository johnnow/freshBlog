/**
 * Created by john on 15/6/29.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

var Post = new Schema({
    title:String,
    author:String,
    updateDate:String, // 更新时间
    super:String, // 上一级结构,用于获取 上一篇 和 下一篇
    tags:Array,// 标签
    content:String,
    pv:Number,//阅读数
});

module.exports = mongoose.model('Post', Post);