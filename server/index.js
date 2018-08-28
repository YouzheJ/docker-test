const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./mongodb');

const port = 4000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
                res.send({msg: 'login success', result: true});
            } else {
                res.send({msg: 'name or password is not correct', result: false});
            }
        })
        .catch((error) => {
            res.send({msg: 'system error', result: false});
        });
});

app.listen(port, function () {
    console.log(`server start at port ${port}`);
});