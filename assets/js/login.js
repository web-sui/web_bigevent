/* 入口函数 */
; (function () {
    // 单击去注册账号的链接，显示注册界面，登录界面隐藏
    $('#link_login').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 单击去登录链接，显示登录界面，注册界面隐藏
    $('#link_reg').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    /* 表单验证功能 */
    // 从layui中获取from元素，
    let form = layui.form
    // layui中获取layer元素
    let layer = layui.layer
    // 通过 form.verify()这个方法添加自定义校验规则
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位,且不能出现空格'
        ],
        // 密码确认功能
        repass: function (value) {
            let pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次输入的密码不一致'
            }
        },
    })
    /* 表单验证功能 */
    // let url = 'http://www.liulongbin.top:3007'
    /* 调用注册表单接口 */
    $('#from-reg').on('submit', function (e) {
        e.preventDefault()
        let data = {
            username: $('#from-reg [name=username]').val(),
            password: $('#from-reg [name=password]').val()
        }
        $.post(`/api/reguser`, data, function (res) {
            if (res.status != 0) {
                return layer.msg(res.message);
            }
            return layer.msg(res.message, function () {
                $('#link_reg').click();
            });
        })

    })
    /* 调用注册表单接口 */

    /* 调用登录表单接口 */
    $('#form-login').on('submit', function (e) {
        // 阻止默认提交行为
        e.preventDefault();
        // 调用接口
        $.ajax({
            method: 'POST',
            url: `/api/login`,
            // 获取表单中的Input值
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                // 跳转页面
                location.href = 'index.html'
                // 存入到缓存里
                localStorage.setItem('token', JSON.stringify(res.token))
            }
        })
    })
    /* 调用登录表单接口 */
})()
