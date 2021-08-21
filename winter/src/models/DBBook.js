const mongoose = require('mongoose')
const db = mongoose.connect("mongodb://localhost:27017/fodder", {useNewUrlParser: true, useUnifiedTopology: true})
// user: 'gnak', pass: 'godkang75'

// 账户的数据库模型
const BookSchema = new mongoose.Schema({
    _id: String,
    user_name: String,
    user_id: String,
    password: String,
    user_account: String
}); 

// mongoose第三个参数为真实表名,如果不传,mongoose就会把第一个参数加上s当成是表名
const DBBook = mongoose.model('DoubanBook', BookSchema, 'DoubanBook');

export default DBBook