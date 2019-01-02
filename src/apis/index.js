import ajax from './ajax'


// 注册的API
const register = data => ajax('/register', data, 'post')
// 用户登录的API
const login = data => ajax('/login', data, 'post')

var apis = {
    register, login
}
export default apis;