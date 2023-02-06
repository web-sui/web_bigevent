//创建的入口中函数 
; (function () {
    getUserInfo()
    // 单击退出按钮退出当前页面
    $('#btnOut').on('click', function () {
        // 第三方插件询问框
        layui.layer.confirm('是否退出当前页面', { icon: 3, title: '提示' }, function (index) {
            // 1.移除当前localStorage缓存中的信息
            localStorage.removeItem('token')
            // 2.跳转页面
            location.href = './login.html'
            layer.close(index);
        });
    })
})()
// 获取用户信息的方法
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 请求头部
        // headers: {
        //     Authorization: JSON.parse(localStorage.getItem('token')) || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data)
        },
        // complete,是否响应成功都会执行次响应结果
        // complete: function (res) {
        //     console.log(res);
        //     // 条件判断响应回来的值
        //     if (res.responseJSON === 1 || res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token');
        //         location.href = './login.html'
        //     }
        // },
    })
}
// 获取用户头像信息并渲染到页面
function renderAvatar(user) {
    // 1.获取用户名称，优先选择用户昵称没有使用名字
    let name = user.nickname || user.username
    // 2.用户名称渲染到页面
    $('#welcome').html(`欢迎&nbsp;&nbsp;:&nbsp;${name}`)
    // 3.当用没有自定义头像时，使用文字头像
    if (user.user_pic !== null) {
        //3.1 当用户有自己的头像时
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 3.2当用户没有头像时使用字体头像
        let fist = name[0].toUpperCase()
        $('.layui-nav-img').hide()
        $('.text-avatar').html(fist).show()
    }

}