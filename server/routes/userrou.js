const express = require('express'),
    User = require('../models/user'),
    scret_config = require('../common/screte_config'),
    router = express.Router(),
    md5 = require('md5'),
    jwt = require('jsonwebtoken')

// 注册
router.post('/register', async (req, res) => {
    var body = req.body
    if (body.secret !== scret_config.register_secret) {
        return res.json({
            error_code: 1,
            msg: '不是自己人,出门右拐!!!'
        })
    }
    try {
        let user = await User.findOne({
            uname: body.uname
        })
        if (!user) {
            body.psd = md5(md5(body.psd))
            // 返回新增的数据
            let data = await new User(body).save()
            res.json({
                error_code: 0,
                msg: '注册成功'
            })
        } else {
            res.json({
                error_code: 1,
                msg: '用户名已存在,请更换'
            })
        }
    } catch (error) {
        res.json({
            error_code: 1,
            msg: '服务器繁忙,刷新重试'
        })
    }
})
// 登录
router.post('/login', async (req, res) => {
    var body = req.body
    body.psd = md5(md5(body.psd))
    let user = await User.findOne(body)
    if (!user) {
        res.json({
            error_code: 1,
            msg: '用户名或密码错误'
        })
    } else {
        let token = jwt.sign({
            uname: user.uname
        }, scret_config.token_secret, {
                expiresIn: 60 * 60 * 24 * 3// 授权时效 3 天
            });
        res.json({
            uname: user.uname,
            error_code: 0,
            msg: '登录成功',
            token: token
        })
    }
})

router.post('/checktoken', (req, res) => {
    let token = req.body.token || req.query.token
    jwt.verify(token, scret_config.token_secret, function (err, decoded) {
        if (decoded && decoded.exp > new Date() / 1000) {
            //验证通过
            res.json({
                token_errcode: 0
            })
        } else {
            res.json({
                token_errcode: 1
            })
        }
    })
})

module.exports = router
