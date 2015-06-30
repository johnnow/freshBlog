/**
 * Created by john on 15/6/29.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

var Super = new Schema({
    code:String, // 集合code
    type:String // 集合类型
});

module.exports = mongoose.model('Super', Super);