/**
 * Created by john on 15/6/29.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

var Mock = new Schema({
    albumImg:String,
    title:String,
    author:String,
    updateDate:String,
    pv:Number,//观看数
    url:String// 仿物志地址
});

module.exports = mongoose.model('Mock', Mock);