/**
 * Created by john on 15/7/8.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

var Widget = new Schema({
    title:String,
    source:String,
    updateDate:String, // 更新时间
    cssCode:String,
    divCode:String,
    divRaw:String,
    cssRaw:String

});

module.exports = mongoose.model('Widget', Widget);