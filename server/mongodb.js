/**
 * 这里只做一个简单的实现
 * 
 * 默认初始化一个test用户
 * 只提供get方法供查询用
 */
const mongoose = require('mongoose');

// mongoose 会缓存所有的命令，所以不需要关心命令是否连接成功后执行
mongoose.connect('mongodb://mongodb/docker-test');

const Schema = mongoose.Schema;
 
const UserSchema = new Schema({
  name: String,
  pwd: String
});

const UserModel = mongoose.model('UserModel', UserSchema);
const userModal = new UserModel();

const get = (data) => {
    return new Promise((resolve, reject) => {
        UserModel.findOne(data, function (err, result) {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

const init = () => {
    get({name: 'test'})
        .then((result) => {
            if (result) {
                console.log('user test is exist');
                return;
            }

            userModal.name = 'test';
            userModal.pwd = '123456';
            userModal.save(function (err) {
            if (!err) console.log('user test init success!');
            });
        })
        .catch((error) => {
            console.log(error);
        });
}


module.exports = {
    init,
    get,
}