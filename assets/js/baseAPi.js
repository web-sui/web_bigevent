$.ajaxPrefilter(function (options) {
    options.url = ` http://www.liulongbin.top:3007${options.url}`
    //    每次ajax发送请求时访问这个权限获取对应的权限信息
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: JSON.parse(localStorage.getItem('token')) || ''
        }
    }
    options.complete = function (res) {
        if (res.responseJSON === 1 || res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token');
            location.href = './login.html'
        }
    }

})