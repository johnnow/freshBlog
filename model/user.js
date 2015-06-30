/**
 * Created by john on 15/6/29.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

var User = new Schema({
    username:String,
    password:String,
    role:String
});




module.exports = mongoose.model('User', User);