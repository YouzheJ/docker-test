const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const mongodb = require('./mongodb');

const port = 4000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    store: new RedisStore({

    }),
    secret: 'docker-test',
    resave: false,
    name: 'docker-test-session',
    cookie: {
        maxAge: 60 * 1000, // 毫秒 只做测试用，所以设为1分钟
    }
}));

mongodb.init();

app.post('/api/login', function (req, res) {
    const { name = '', password: pwd = '' } = req.body || {};
    if (!name || !pwd) return res.send({msg: 'name and password is require', result: false});
    mongodb.get({ name })
        .then((result) => {
            if (!result) {
                res.send({msg: 'user not found', result: false});
                return;
            }

            if (result.pwd === pwd) {
                req.session.user = result._id;
                res.send({msg: 'login success', result: true});
            } else {
                res.send({msg: 'name or password is not correct', result: false});
            }
        })
        .catch((error) => {
            console.log(error);
            res.send({msg: 'system error', result: false});
        });
});

app.get('/api/userinfo/get', function (req, res) {
    const useId = req.session.user;
    console.log(useId)
    if (!useId) return res.send({msg: 'has not login', result: false});
    mongodb.get({ _id: useId })
        .then((result) => {
            if (!result) {
                res.send({msg: 'has not login', result: false});
                return;
            }
            res.send({msg: 'has login', result: true});
        })
        .catch((error) => {
            console.log(error);
            res.send({msg: 'system error', result: false});
        });
});

app.get('/api/logout', function (req, res) {
    const userId = req.session.user;
    console.log(userId)
    req.session = null;
    res.send({msg: 'logout success', result: true});
});

app.listen(port, function () {
    console.log(`server start at port ${port}`);
});