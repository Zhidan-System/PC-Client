var axios = require('axios')
var Auth = {
    signin: function(number, password, callback, errCallback) {
        // 输入账户密码登录
        axios.post('/api/v1/session', {
            number: number,
            password: password
        }).then(callback).catch(errCallback)
    },
    signout: function(callback, errCallback) {
        // TODO: 退出登录状态
        axios.delete('api/v1/session').then(callback).catch(errCallback)
    },
    isSignined: function(callback, errCallback) {
        // 判断登录状态
        axios.get('api/v1/session').then(callback).catch(errCallback)
    }
}

module.exports=Auth