/**
 * Created by john on 15/6/29.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

var Video = new Schema({
    albumImg:String,
    title:String,
    author:String,
    updateDate:String,
    super:String, // 上一级结构，用于获取上一部，下一部
    pv:Number,//观看数
    url:String//优酷地址
});

module.exports = mongoose.model('Video', Video);