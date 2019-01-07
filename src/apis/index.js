import ajax from './ajax'


// 注册的API
const register = data => ajax('/register', data, 'post')
// 用户登录的API
const login = data => ajax('/login', data, 'post')
// 新增文章
const addArticle = data => ajax('/addArticle', data, 'post')
// 删除
const deleteArticle = data => ajax('/deleteArticle', data, 'post')
// 查询
const queryList = data => ajax('/queryList', data, 'get')
// 编辑展示数据的查询
const editOfQuery = data => ajax('/editOfQuery', data, 'get')
// 数据保存
const saveArticle = data => ajax('/saveArticle', data, 'post')

// 添加分类
const addArticleType = data => ajax('/addArticleType', data, 'post')

// 删除分类
const removeArticleType = data => ajax('/removeArticleType', data, 'post')
// 查询分类
const queryTypeList = data => ajax('/queryTypeList', data, 'get')

// 删除专题
const removeArticleZt = data => ajax('/removeArticleZt', data, 'post')
// 添加专题
const addArticleZt = data => ajax('/addArticleZt', data, 'post')
// 查询分类
const queryZt = data => ajax('/queryZt', data, 'get')

// 时光轴
const timeline = data => ajax('/timeline', data, 'get')
// 分类查找
const findBytype = data => ajax('/findBytype', data, 'get')

var apis = {
    register, login,
    addArticle, deleteArticle,
    queryList, editOfQuery,
    saveArticle, addArticleType,
    queryTypeList, addArticleZt, queryZt, removeArticleType, removeArticleZt, timeline, findBytype
}
export default apis;