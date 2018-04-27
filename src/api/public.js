import axios from 'axios'
let qs = require('qs')
axios.defaults.timeout = 10000
axios.defaults.withCredentials = true
let baseURL = 'http://www.ng2.site/index.php'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
export default {
  fetchGet (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(`${baseURL}${url}`, {
        params: params
      }).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchQuickSearch (url) {
    return new Promise((resolve, reject) => {
      axios.get(`${baseURL}${url}`).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchPost (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.post(`${baseURL}${url}`, qs.stringify(params)).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
