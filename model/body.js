/**
 * Created by john on 15/6/29.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

var Body = new Schema({
    fatContent:Number, // 单位100
    weight:Number,// 单位kg
    basalMeta:Number, // 基础代谢
    updateDate:String
});

module.exports = mongoose.model('Body', Body);