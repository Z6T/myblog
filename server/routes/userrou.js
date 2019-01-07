const express = require('express'),
    User = require('../models/user'),
    Article = require('../models/article'),
    ArticleType = require('../models/articletype'),
    Zhuanti = require('../models/zhuanti'),
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

/*******************************文章API***************************************/
// 查询文章
router.get('/queryList', async (req, res) => {
    var body = req.query
    var page = body.page
    const data = await Article.find({}).skip((page - 1) * 10)
        .limit(10)
        .sort({ '_id': -1 });
    const total = await Article.countDocuments({})
    if (data) {
        res.json({
            error_code: 0,
            data,
            total
        })
    } else {
        res.json({
            error_code: 1,
            msg: '暂无数据'
        })
    }
})
// 编辑时查询某一篇文章
router.get('/editOfQuery', async (req, res) => {
    var body = req.query
    const data = await Article.findOne(body)
    if (data) {
        res.json({
            error_code: 0,
            data
        })
    } else {
        res.json({
            error_code: 1,
            msg: '暂无数据'
        })
    }
})
// 新建文章
router.post('/addArticle', async (req, res) => {
    var body = req.body
    console.log(body)
    // delete body._id;
    const newArticle = await new Article(body).save()
    if (newArticle) {
        res.json({
            error_code: 0,
            msg: '发布成功'
        })
    } else {
        res.json({
            error_code: 1,
            msg: '发布失败'
        })
    }
})
// 保存文章
router.post('/saveArticle', async (req, res) => {
    var body = req.body
    const data = await Article.updateOne({ _id: body._id }, body);
    if (data.ok === 1 && data.nModified >= 1) {
        res.json({
            error_code: 0,
            msg: '修改成功'
        })
    } else if (data.nModified === 0) {
        res.json({
            error_code: 1,
            msg: '数据未改变,无需修改'
        })
    } else {
        res.json({
            error_code: 1,
            msg: '修改失败'
        })
    }
})
// 删除文章
router.post('/deleteArticle', async (req, res) => {
    var body = req.body
    const data = await Article.remove(body)
    if (data.n !== 0 && data.ok === 1) {
        res.json({
            error_code: 0,
            msg: '删除成功'
        })
    } else {
        res.json({
            error_code: 1,
            msg: '删除失败'
        })
    }
})

// 时光轴页面API
router.get('/timeline', async (req, res) => {
    var body = req.query
    const data = await Article.find(body).sort({ a_pubdate: -1 })
    if (data) {
        res.json({
            error_code: 0,
            data
        })
    } else {
        res.json({
            error_code: 1,
            msg: '暂无数据'
        })
    }
})
// 分类目查询API
router.get('/findBytype', async (req, res) => {
    var body = req.query
    const data = await Article.find(body).sort({ a_pubdate: -1 })
    if (data) {
        res.json({
            error_code: 0,
            data
        })
    } else {
        res.json({
            error_code: 1,
            msg: '暂无数据'
        })
    }
})

/*******************************文章API***************************************/
// 新建文章分类
router.post('/addArticleType', async (req, res) => {
    var body = req.body
    const data = await new ArticleType(body).save()
    if (data) {
        res.json({
            error_code: 0,
            msg: '添加成功'
        })
    } else {
        res.json({
            error_code: 1,
            msg: '添加失败'
        })
    }
})
// 删除文章分类
router.post('/removeArticleType', async (req, res) => {
    var body = req.body
    const data = await ArticleType.remove(body)
    if (data.n !== 0 && data.ok === 1) {
        res.json({
            error_code: 0,
            msg: '删除成功'
        })
    } else {
        res.json({
            error_code: 1,
            msg: '删除失败'
        })
    }
})
// 查询文章分类
router.get('/queryTypeList', async (req, res) => {
    var body = req.query
    const data = await ArticleType.find(body)
    if (data) {
        res.json({
            error_code: 0,
            data
        })
    } else {
        res.json({
            error_code: 1,
            msg: '暂无数据'
        })
    }
})
/*******************************文章API***************************************/
// 新建文章专题
router.post('/addArticleZt', async (req, res) => {
    var body = req.body
    const data = await new Zhuanti(body).save()
    if (data) {
        res.json({
            error_code: 0,
            msg: '添加成功'
        })
    } else {
        res.json({
            error_code: 1,
            msg: '添加失败'
        })
    }
})
// 删除文章专题
router.post('/removeArticleZt', async (req, res) => {
    var body = req.body
    const data = await Zhuanti.remove(body)
    if (data.n !== 0 && data.ok === 1) {
        res.json({
            error_code: 0,
            msg: '删除成功'
        })
    } else {
        res.json({
            error_code: 1,
            msg: '删除失败'
        })
    }
})

// 查询文章专题
router.get('/queryZt', async (req, res) => {
    var body = req.query
    const data = await Zhuanti.find(body)
    if (data) {
        res.json({
            error_code: 0,
            data
        })
    } else {
        res.json({
            error_code: 1,
            msg: '暂无数据'
        })
    }
})

module.exports = router
