/**
 * 封装网络请求,使用promise语法
 */
import axios from 'axios'
const base_url = '/api'
export default function ajax(url = '', data = {}, type = 'get') {
    return new Promise((resolve, reject) => {
        let promise;
        if (type === 'get') {
            promise = axios.get(base_url + url, {
                params: data
            })
        } else if (type === 'post') {
            promise = axios.post(base_url + url, data)
        }
        promise.then(res => resolve(res.data)).catch(err => reject(err))
    })
}