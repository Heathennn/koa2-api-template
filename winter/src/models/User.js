const mongoose = require('mongoose')
const db = mongoose.connect("mongodb://localhost:27017/fodder", {useNewUrlParser: true, useUnifiedTopology: true, user: 'gnak', pass: 'godkang75'})

// 账户的数据库模型
const UserSchema = new mongoose.Schema({
    _id: String,
    user_name: String,
    user_id: String,
    password: String,
    user_account: String
}); 

// mongoose第三个参数为真实表名
const User = mongoose.model('User', UserSchema, 'user');

export default User